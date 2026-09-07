import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, uploadImage, deleteImage } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";
import { DEFAULT_GALLERY_ITEMS, type GalleryItem } from "@/data/galleryData";
import { toast } from "sonner";

export type GalleryRow = Database["public"]["Tables"]["gallery"]["Row"];
export type GalleryInsert = Database["public"]["Tables"]["gallery"]["Insert"];
export type GalleryUpdate = Database["public"]["Tables"]["gallery"]["Update"];

const LOCAL_STORAGE_KEY = "21asr_gallery_items_v2";
const LOCAL_DELETED_KEY = "21asr_deleted_gallery_v2";
const SETTINGS_KEY = "gallery_data";

function getLocalGallery(): GalleryRow[] {
  if (typeof window === "undefined") return DEFAULT_GALLERY_ITEMS as GalleryRow[];
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed reading gallery from localStorage:", e);
  }
  return DEFAULT_GALLERY_ITEMS as GalleryRow[];
}

function saveLocalGallery(list: GalleryRow[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getDeletedGalleryIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_DELETED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveDeletedGalleryIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(ids));
  } catch (e) {}
}

export function mergeGallery(dbItems: GalleryRow[] = []): GalleryRow[] {
  const localItems = getLocalGallery();
  const deletedIds = new Set(getDeletedGalleryIds());

  const map = new Map<string, GalleryRow>();

  // 1. Defaults
  for (const item of DEFAULT_GALLERY_ITEMS) {
    if (!deletedIds.has(item.id)) {
      map.set(item.id, item as GalleryRow);
    }
  }

  // 2. Database rows
  for (const item of dbItems) {
    if (!deletedIds.has(item.id)) {
      map.set(item.id, item);
    }
  }

  // 3. Local modifications
  for (const item of localItems) {
    if (!deletedIds.has(item.id)) {
      map.set(item.id, item);
    }
  }

  return Array.from(map.values()).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function useGallery(category = "all", onlyActive = false) {
  const queryClient = useQueryClient();
  const queryKey = ["gallery", { category, onlyActive }];

  const {
    data: gallery = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<GalleryRow[]>({
    queryKey,
    queryFn: async () => {
      let dbData: GalleryRow[] = [];
      try {
        let q = supabase
          .from("gallery")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (onlyActive) {
          q = q.eq("is_active", true);
        }

        if (category && category !== "all" && category !== "Barchasi") {
          q = q.eq("category", category);
        }

        const { data, error } = await q;
        if (!error && data) {
          dbData = data;
        }
      } catch (e) {}

      let merged = mergeGallery(dbData);

      if (onlyActive) {
        merged = merged.filter((i) => i.is_active);
      }

      if (category && category !== "all" && category !== "Barchasi") {
        merged = merged.filter((i) => i.category === category);
      }

      return merged;
    },
  });

  // Create single gallery item
  const createMutation = useMutation({
    mutationFn: async ({
      data,
      imageFile,
    }: {
      data: Omit<GalleryInsert, "image_url"> & { image_url?: string };
      imageFile?: File | null;
    }) => {
      let image_url = data.image_url?.trim() || "";

      if (imageFile) {
        try {
          const uploadRes = await uploadImage("gallery-images", imageFile, "photos");
          image_url = uploadRes.url;
        } catch (e) {
          console.warn("Could not upload to supabase storage:", e);
        }
      }

      if (!image_url) {
        image_url = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";
      }

      const newId = `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const newItem: GalleryRow = {
        id: newId,
        title: data.title.trim(),
        description: data.description?.trim() || null,
        category: data.category || "Ofis",
        image_url,
        sort_order: Number(data.sort_order) || 0,
        is_active: data.is_active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      try {
        await supabase.from("gallery").insert(newItem);
      } catch (e) {}

      const current = getLocalGallery();
      saveLocalGallery([...current.filter((i) => i.id !== newId), newItem]);

      const deletedIds = getDeletedGalleryIds().filter((id) => id !== newId);
      saveDeletedGalleryIds(deletedIds);

      return newItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["admin_gallery_items"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success("Rasm galereyaga muvaffaqiyatli qo'shildi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Rasm qo'shishda xatolik yuz berdi");
    },
  });

  // Create multiple gallery items
  const createMultipleMutation = useMutation({
    mutationFn: async ({
      files,
      category,
      defaultTitle,
    }: {
      files: File[];
      category: string;
      defaultTitle?: string;
    }) => {
      const results: GalleryRow[] = [];
      const current = getLocalGallery();
      const newItems: GalleryRow[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file) continue;

        const title =
          defaultTitle ||
          file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]/g, " ")
            .trim();

        let image_url = "";
        try {
          const uploadRes = await uploadImage("gallery-images", file, "photos");
          image_url = uploadRes.url;
        } catch (e) {
          image_url = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";
        }

        const newId = `gallery-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 6)}`;
        const newItem: GalleryRow = {
          id: newId,
          title,
          description: null,
          category: category || "Ofis",
          image_url,
          sort_order: i + 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        try {
          await supabase.from("gallery").insert(newItem);
        } catch (e) {}

        newItems.push(newItem);
        results.push(newItem);
      }

      saveLocalGallery([...current, ...newItems]);
      return results;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["admin_gallery_items"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success(`${data.length} ta rasm muvaffaqiyatli yuklandi!`);
    },
    onError: (err: any) => {
      toast.error(err?.message || "Rasmlarni yuklashda xatolik yuz berdi");
    },
  });

  // Update gallery item
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      newImageFile,
      oldImageUrl,
    }: {
      id: string;
      data: Partial<GalleryRow>;
      newImageFile?: File | null;
      oldImageUrl?: string | null;
    }) => {
      let image_url = data.image_url;

      if (newImageFile) {
        try {
          const uploadRes = await uploadImage("gallery-images", newImageFile, "photos");
          image_url = uploadRes.url;

          if (oldImageUrl && oldImageUrl.includes("supabase") && oldImageUrl !== image_url) {
            await deleteImage("gallery-images", oldImageUrl);
          }
        } catch (e) {
          console.warn("Could not upload replacement image:", e);
        }
      }

      const updatedPayload: Partial<GalleryRow> = {
        ...data,
        ...(image_url ? { image_url } : {}),
      };

      try {
        await supabase.from("gallery").upsert({ id, ...updatedPayload } as any);
      } catch (e) {}

      const local = getLocalGallery();
      const allCurrent = mergeGallery();
      const target = allCurrent.find((i) => i.id === id);

      const mergedItem: GalleryRow = {
        ...(target || ({} as GalleryRow)),
        ...updatedPayload,
        id,
      };

      saveLocalGallery([...local.filter((i) => i.id !== id), mergedItem]);
      return mergedItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["admin_gallery_items"] });
      toast.success("Rasm ma'lumotlari yangilandi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Yangilashda xatolik yuz berdi");
    },
  });

  // Delete gallery item
  const deleteMutation = useMutation({
    mutationFn: async ({ id, imageUrl }: { id: string; imageUrl?: string | null }) => {
      if (imageUrl && imageUrl.includes("supabase")) {
        try {
          await deleteImage("gallery-images", imageUrl);
        } catch (e) {}
      }

      try {
        await supabase.from("gallery").delete().eq("id", id);
      } catch (e) {}

      const local = getLocalGallery().filter((i) => i.id !== id);
      saveLocalGallery(local);

      const deletedIds = getDeletedGalleryIds();
      if (!deletedIds.includes(id)) {
        saveDeletedGalleryIds([...deletedIds, id]);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
      queryClient.invalidateQueries({ queryKey: ["admin_gallery_items"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success("Rasm galereyadan o'chirildi");
    },
    onError: (err: any) => {
      toast.error(err?.message || "O'chirishda xatolik yuz berdi");
    },
  });

  // Toggle active status
  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateMutation.mutateAsync({
        id,
        data: { is_active: !currentStatus },
      });
      toast.success(!currentStatus ? "Rasm faollashtirildi" : "Rasm nofaol qilindi");
    } catch (err: any) {
      toast.error("Holatni o'zgartirishda xatolik");
    }
  };

  return {
    gallery,
    isLoading,
    isError,
    error,
    refetch,
    createItem: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    createMultipleItems: createMultipleMutation.mutateAsync,
    isUploadingMultiple: createMultipleMutation.isPending,
    updateItem: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteItem: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    toggleActive,
  };
}
