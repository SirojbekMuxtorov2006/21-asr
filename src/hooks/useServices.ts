import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, uploadImage, deleteImage } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { ALL_SERVICES_DATA, ALL_CATEGORIES_DATA } from "@/data/allServices";

export type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
export type ServiceInsert = Database["public"]["Tables"]["services"]["Insert"];
export type ServiceUpdate = Database["public"]["Tables"]["services"]["Update"];
export type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
export type CategoryInsert = Database["public"]["Tables"]["categories"]["Insert"];
export type CategoryUpdate = Database["public"]["Tables"]["categories"]["Update"];

const LOCAL_SERVICES_KEY = "21asr_custom_services_v2";
const LOCAL_DELETED_KEY = "21asr_deleted_services_v2";
const LOCAL_CATEGORIES_KEY = "21asr_custom_categories_v2";
const LOCAL_DELETED_CATS_KEY = "21asr_deleted_categories_v2";

// Local storage helper functions
function getLocalServices(): ServiceRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_SERVICES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Failed reading custom services from localStorage:", e);
  }
  return [];
}

function saveLocalServices(list: ServiceRow[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_SERVICES_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getDeletedServiceIds(): string[] {
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

function saveDeletedServiceIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_DELETED_KEY, JSON.stringify(ids));
  } catch (e) {}
}

function getLocalCategories(): CategoryRow[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_CATEGORIES_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveLocalCategories(list: CategoryRow[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_CATEGORIES_KEY, JSON.stringify(list));
  } catch (e) {}
}

function getDeletedCategoryIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_DELETED_CATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [];
}

function saveDeletedCategoryIds(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_DELETED_CATS_KEY, JSON.stringify(ids));
  } catch (e) {}
}

// Master merger helper for services
export function mergeServices(dbServices: ServiceRow[] = []): ServiceRow[] {
  const localCustom = getLocalServices();
  const deletedIds = new Set(getDeletedServiceIds());

  // Start with fallback dataset
  const map = new Map<string, ServiceRow>();

  for (const s of ALL_SERVICES_DATA) {
    if (!deletedIds.has(s.id)) {
      map.set(s.id, s);
    }
  }

  // Overlay database services if present
  for (const s of dbServices) {
    if (!deletedIds.has(s.id)) {
      map.set(s.id, s);
    }
  }

  // Overlay local custom/edited services
  for (const s of localCustom) {
    if (!deletedIds.has(s.id)) {
      map.set(s.id, s);
    }
  }

  return Array.from(map.values()).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

// Master merger helper for categories
export function mergeCategories(dbCategories: CategoryRow[] = []): CategoryRow[] {
  const localCustom = getLocalCategories();
  const deletedIds = new Set(getDeletedCategoryIds());

  const map = new Map<string, CategoryRow>();

  for (const c of ALL_CATEGORIES_DATA) {
    if (!deletedIds.has(c.id)) {
      map.set(c.id, c);
    }
  }

  for (const c of dbCategories) {
    if (!deletedIds.has(c.id)) {
      map.set(c.id, c);
    }
  }

  for (const c of localCustom) {
    if (!deletedIds.has(c.id)) {
      map.set(c.id, c);
    }
  }

  return Array.from(map.values()).sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
}

export function useServices(categoryId = "all", onlyActive = false) {
  const queryClient = useQueryClient();
  const queryKey = ["services", { categoryId, onlyActive }];

  const {
    data: services = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ServiceRow[]>({
    queryKey,
    queryFn: async () => {
      let dbData: ServiceRow[] = [];
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && data) {
          dbData = data;
        }
      } catch (e) {}

      let merged = mergeServices(dbData);

      if (onlyActive) {
        merged = merged.filter((s) => s.is_active);
      }

      if (categoryId && categoryId !== "all") {
        merged = merged.filter((s) => s.category_id === categoryId);
      }

      return merged;
    },
  });

  // Categories query
  const { data: categories = [], refetch: refetchCategories } = useQuery<CategoryRow[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      let dbData: CategoryRow[] = [];
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });

        if (!error && data) {
          dbData = data;
        }
      } catch (e) {}

      return mergeCategories(dbData);
    },
  });

  // Create Service
  const createServiceMutation = useMutation({
    mutationFn: async ({
      data,
      imageFile,
    }: {
      data: Omit<ServiceInsert, "image_url" | "id"> & { id?: string; image_url?: string | null };
      imageFile?: File | null;
    }) => {
      let image_url = data.image_url || null;

      if (imageFile) {
        try {
          const uploadRes = await uploadImage("service-images", imageFile, "covers");
          image_url = uploadRes.url;
        } catch (e) {
          console.warn("Could not upload service image to storage:", e);
        }
      }

      const newId = data.id || `service-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const safeSlug =
        data.slug?.trim() ||
        data.name_uz
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") ||
        `xizmat-${Date.now()}`;

      const newService: ServiceRow = {
        id: newId,
        name_uz: data.name_uz.trim(),
        name_ru: data.name_ru?.trim() || "",
        slug: safeSlug,
        category_id: data.category_id && data.category_id !== "all" ? data.category_id : null,
        price: Number(data.price) || 0,
        price_note: data.price_note || "",
        duration: data.duration || "1-3 ish kuni",
        short_description: data.short_description || "",
        description: data.description || "",
        how_it_works: data.how_it_works || "",
        required_documents: data.required_documents || [],
        icon: data.icon || "FileText",
        image_url,
        is_active: data.is_active ?? true,
        is_popular: data.is_popular ?? false,
        sort_order: Number(data.sort_order) || 0,
        seo_title: data.seo_title || "",
        seo_description: data.seo_description || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // 1. Try Supabase insert
      try {
        await supabase.from("services").insert(newService);
      } catch (e) {
        console.warn("Supabase insert failed, saving locally:", e);
      }

      // 2. Always persist to localStorage
      const local = getLocalServices();
      saveLocalServices([...local.filter((s) => s.id !== newId), newService]);

      // Remove from deleted if it was re-added
      const deletedIds = getDeletedServiceIds().filter((id) => id !== newId);
      saveDeletedServiceIds(deletedIds);

      return newService;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["admin_services"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success("Yangi xizmat muvaffaqiyatli qo'shildi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Xizmatni qo'shishda xatolik yuz berdi");
    },
  });

  // Update Service
  const updateServiceMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      newImageFile,
      oldImageUrl,
    }: {
      id: string;
      data: Partial<ServiceRow>;
      newImageFile?: File | null;
      oldImageUrl?: string | null;
    }) => {
      let image_url = data.image_url;

      if (newImageFile) {
        try {
          const uploadRes = await uploadImage("service-images", newImageFile, "covers");
          image_url = uploadRes.url;

          if (oldImageUrl && oldImageUrl.includes("supabase") && oldImageUrl !== image_url) {
            await deleteImage("service-images", oldImageUrl);
          }
        } catch (e) {
          console.warn("Could not upload new service image:", e);
        }
      }

      const updatedPayload: Partial<ServiceRow> = {
        ...data,
        ...(image_url !== undefined ? { image_url } : {}),
        updated_at: new Date().toISOString(),
      };

      // 1. Try Supabase update
      try {
        await supabase.from("services").upsert({ id, ...updatedPayload } as any);
      } catch (e) {
        console.warn("Supabase update failed, saving locally:", e);
      }

      // 2. Update local custom services list
      const local = getLocalServices();
      const allCurrent = mergeServices();
      const target = allCurrent.find((s) => s.id === id);

      const mergedItem: ServiceRow = {
        ...(target || ({} as ServiceRow)),
        ...updatedPayload,
        id,
      };

      const updatedLocalList = [...local.filter((s) => s.id !== id), mergedItem];
      saveLocalServices(updatedLocalList);

      return mergedItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["admin_services"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Xizmat ma'lumotlari muvaffaqiyatli yangilandi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Xizmatni yangilashda xatolik yuz berdi");
    },
  });

  // Delete Service
  const deleteServiceMutation = useMutation({
    mutationFn: async ({ id, imageUrl }: { id: string; imageUrl?: string | null }) => {
      if (imageUrl && imageUrl.includes("supabase")) {
        try {
          await deleteImage("service-images", imageUrl);
        } catch (e) {}
      }

      // 1. Try Supabase delete
      try {
        await supabase.from("services").delete().eq("id", id);
      } catch (e) {}

      // 2. Remove from local list
      const local = getLocalServices().filter((s) => s.id !== id);
      saveLocalServices(local);

      // 3. Mark in deleted list
      const deletedIds = getDeletedServiceIds();
      if (!deletedIds.includes(id)) {
        saveDeletedServiceIds([...deletedIds, id]);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["admin_services"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success("Xizmat tizimdan o'chirildi");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Xizmatni o'chirishda xatolik yuz berdi");
    },
  });

  // Toggle Active
  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      await updateServiceMutation.mutateAsync({
        id,
        data: { is_active: !currentStatus },
      });
      toast.success(!currentStatus ? "Xizmat faollashtirildi" : "Xizmat nofaol qilindi");
    } catch (err: any) {
      toast.error("Holatni o'zgartirishda xatolik");
    }
  };

  // Toggle Popular
  const togglePopular = async (id: string, currentStatus: boolean) => {
    try {
      await updateServiceMutation.mutateAsync({
        id,
        data: { is_popular: !currentStatus },
      });
      toast.success("Ommaboplik holati yangilandi");
    } catch (err: any) {
      toast.error("Yangilashda xatolik");
    }
  };

  // Category Mutations
  const createCategoryMutation = useMutation({
    mutationFn: async (data: Omit<CategoryInsert, "id"> & { id?: string }) => {
      const newId = data.id || `cat-${Date.now()}`;
      const safeSlug =
        data.slug?.trim() ||
        data.name_uz
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      const newCategory: CategoryRow = {
        id: newId,
        name_uz: data.name_uz.trim(),
        name_ru: data.name_ru?.trim() || "",
        slug: safeSlug,
        icon: data.icon || "Folder",
        description_uz: data.description_uz || "",
        is_active: data.is_active ?? true,
        sort_order: Number(data.sort_order) || 0,
        created_at: new Date().toISOString(),
      };

      try {
        await supabase.from("categories").insert(newCategory);
      } catch (e) {}

      const local = getLocalCategories();
      saveLocalCategories([...local.filter((c) => c.id !== newId), newCategory]);

      const deletedIds = getDeletedCategoryIds().filter((id) => id !== newId);
      saveDeletedCategoryIds(deletedIds);

      return newCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Yangi kategoriya qo'shildi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Kategoriyani qo'shishda xatolik");
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CategoryRow> }) => {
      try {
        await supabase.from("categories").upsert({ id, ...data } as any);
      } catch (e) {}

      const local = getLocalCategories();
      const allCurrent = mergeCategories();
      const target = allCurrent.find((c) => c.id === id);

      const mergedCategory: CategoryRow = {
        ...(target || ({} as CategoryRow)),
        ...data,
        id,
      };

      saveLocalCategories([...local.filter((c) => c.id !== id), mergedCategory]);
      return mergedCategory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Kategoriya tahrirlandi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Kategoriyani yangilashda xatolik");
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        await supabase.from("categories").delete().eq("id", id);
      } catch (e) {}

      const local = getLocalCategories().filter((c) => c.id !== id);
      saveLocalCategories(local);

      const deletedIds = getDeletedCategoryIds();
      if (!deletedIds.includes(id)) {
        saveDeletedCategoryIds([...deletedIds, id]);
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
      queryClient.invalidateQueries({ queryKey: ["catalog"] });
      toast.success("Kategoriya o'chirildi");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Kategoriyani o'chirishda xatolik");
    },
  });

  return {
    services,
    categories,
    isLoading,
    isError,
    error,
    refetch,
    refetchCategories,
    createService: createServiceMutation.mutateAsync,
    isCreating: createServiceMutation.isPending,
    updateService: updateServiceMutation.mutateAsync,
    isUpdating: updateServiceMutation.isPending,
    deleteService: deleteServiceMutation.mutateAsync,
    isDeleting: deleteServiceMutation.isPending,
    toggleActive,
    togglePopular,
    createCategory: createCategoryMutation.mutateAsync,
    updateCategory: updateCategoryMutation.mutateAsync,
    deleteCategory: deleteCategoryMutation.mutateAsync,
  };
}
