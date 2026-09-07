import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, uploadImage, deleteImage } from "@/lib/supabase";
import { DEFAULT_PARTNERS, type PartnerItem } from "@/data/partnersData";
import type { Json } from "@/integrations/supabase/types";
import { toast } from "sonner";

const LOCAL_STORAGE_KEY = "21asr_partners_data_v2";
const SETTINGS_KEY = "partners_data";

// Helper to get local stored partners
function getLocalPartners(): PartnerItem[] {
  if (typeof window === "undefined") return DEFAULT_PARTNERS;
  try {
    const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load partners from localStorage:", e);
  }
  return DEFAULT_PARTNERS;
}

// Helper to save to local storage
function saveLocalPartners(data: PartnerItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to save partners to localStorage:", e);
  }
}

export function usePartners(onlyActive = false) {
  const queryClient = useQueryClient();
  const queryKey = ["partners", { onlyActive }];

  const {
    data: partners = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PartnerItem[]>({
    queryKey,
    queryFn: async () => {
      // 1. Fetch from 'settings' table (key: 'partners_data').
      // Eslatma: bazada alohida 'partners' jadvali yo'q, shuning uchun uni
      // so'ramaymiz - aks holda har safar konsolda 404 xatosi chiqadi.
      try {
        const { data: settingRow, error } = await supabase
          .from("settings")
          .select("value")
          .eq("key", SETTINGS_KEY)
          .maybeSingle();

        if (!error && settingRow?.value && Array.isArray(settingRow.value) && settingRow.value.length > 0) {
          const list = settingRow.value as unknown as PartnerItem[];
          saveLocalPartners(list);
          const filtered = onlyActive ? list.filter((p) => p.is_active) : list;
          return filtered.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
        }
      } catch (e) {
        // Fallback to local
      }

      // 2. Fallback to localStorage or default seed data
      const local = getLocalPartners();
      const result = onlyActive ? local.filter((p) => p.is_active) : local;
      return result.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0));
    },
  });

  // Sync to backend settings and storage helper
  async function persistPartners(nextList: PartnerItem[]) {
    saveLocalPartners(nextList);

    // 'settings' jadvalida faqat key/value/updated_at ustunlari bor.
    try {
      await supabase.from("settings").upsert(
        {
          key: SETTINGS_KEY,
          value: nextList as unknown as Json,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" },
      );
    } catch (e) {
      console.warn("Could not sync partners to supabase settings:", e);
    }
  }

  // Create Partner Mutation
  const createPartner = useMutation({
    mutationFn: async ({
      data,
      logoFile,
    }: {
      data: Omit<PartnerItem, "id" | "created_at" | "updated_at" | "logo_url"> & { logo_url?: string };
      logoFile?: File | null;
    }) => {
      let logo_url = data.logo_url?.trim() || "";

      if (logoFile) {
        const uploadRes = await uploadImage("gallery-images", logoFile, "partners");
        logo_url = uploadRes.url;
      }

      if (!logo_url) {
        logo_url = "/partners/jahon-bobo.png";
      }

      const newPartner: PartnerItem = {
        id: `partner-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: data.name.trim(),
        logo_url,
        category: data.category.trim() || "Boshqa soha",
        website_url: data.website_url?.trim() || "",
        description: data.description?.trim() || "",
        sort_order: Number(data.sort_order) || 1,
        is_active: data.is_active ?? true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const current = getLocalPartners();
      const updated = [...current, newPartner].sort((a, b) => a.sort_order - b.sort_order);

      await persistPartners(updated);
      return newPartner;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Yangi hamkor muvaffaqiyatli qo'shildi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Hamkor qo'shishda xatolik yuz berdi");
    },
  });

  // Update Partner Mutation
  const updatePartner = useMutation({
    mutationFn: async ({
      id,
      data,
      newLogoFile,
      oldLogoUrl,
    }: {
      id: string;
      data: Partial<PartnerItem>;
      newLogoFile?: File | null;
      oldLogoUrl?: string | null;
    }) => {
      let logo_url = data.logo_url;

      if (newLogoFile) {
        const uploadRes = await uploadImage("gallery-images", newLogoFile, "partners");
        logo_url = uploadRes.url;

        // Clean up old uploaded image if it was hosted on supabase
        if (oldLogoUrl && oldLogoUrl.includes("supabase") && oldLogoUrl !== logo_url) {
          await deleteImage("gallery-images", oldLogoUrl);
        }
      }

      const current = getLocalPartners();
      const updated = current.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            ...data,
            ...(logo_url ? { logo_url } : {}),
            updated_at: new Date().toISOString(),
          };
        }
        return p;
      }).sort((a, b) => a.sort_order - b.sort_order);

      await persistPartners(updated);
      return updated.find((p) => p.id === id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Hamkor ma'lumotlari muvaffaqiyatli yangilandi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Hamkorni yangilashda xatolik yuz berdi");
    },
  });

  // Delete Partner Mutation
  const deletePartner = useMutation({
    mutationFn: async ({ id, logoUrl }: { id: string; logoUrl?: string | null }) => {
      if (logoUrl && logoUrl.includes("supabase")) {
        await deleteImage("gallery-images", logoUrl);
      }

      const current = getLocalPartners();
      const updated = current.filter((p) => p.id !== id);

      await persistPartners(updated);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Hamkor tizimdan o'chirildi");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Hamkorni o'chirishda xatolik yuz berdi");
    },
  });

  // Quick Toggle Active State
  const toggleActive = useMutation({
    mutationFn: async ({ id, currentActive }: { id: string; currentActive: boolean }) => {
      const current = getLocalPartners();
      const updated = current.map((p) => (p.id === id ? { ...p, is_active: !currentActive } : p));
      await persistPartners(updated);
      return !currentActive;
    },
    onSuccess: (newStatus) => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success(newStatus ? "Hamkor saytda faollashtirildi" : "Hamkor saytdan yashirildi");
    },
    onError: () => {
      toast.error("Holatni o'zgartirishda xatolik yuz berdi");
    },
  });

  // Reset to Defaults
  const resetToDefaults = useMutation({
    mutationFn: async () => {
      await persistPartners(DEFAULT_PARTNERS);
      return DEFAULT_PARTNERS;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      toast.success("Hamkorlar ro'yxati boshlang'ich holatga qaytarildi");
    },
  });

  return {
    partners,
    isLoading,
    isError,
    error,
    refetch,
    createPartner: createPartner.mutateAsync,
    isCreating: createPartner.isPending,
    updatePartner: updatePartner.mutateAsync,
    isUpdating: updatePartner.isPending,
    deletePartner: deletePartner.mutateAsync,
    isDeleting: deletePartner.isPending,
    toggleActive: toggleActive.mutateAsync,
    resetToDefaults: resetToDefaults.mutateAsync,
  };
}
