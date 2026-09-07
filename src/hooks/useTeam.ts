import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase, uploadImage, deleteImage } from "@/lib/supabase";
import type { Database } from "@/integrations/supabase/types";
import { DEFAULT_TEAM_MEMBERS } from "@/data/teamData";
import { toast } from "sonner";

export type TeamMemberRow = Database["public"]["Tables"]["team_members"]["Row"];
export type TeamMemberInsert = Database["public"]["Tables"]["team_members"]["Insert"];
export type TeamMemberUpdate = Database["public"]["Tables"]["team_members"]["Update"];

export function useTeam(onlyActive = false) {
  const queryClient = useQueryClient();

  const queryKey = ["team_members", { onlyActive }];

  const {
    data: team = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: async () => {
      try {
        let q = supabase
          .from("team_members")
          .select("*")
          .order("sort_order", { ascending: true })
          .order("created_at", { ascending: false });

        if (onlyActive) {
          q = q.eq("is_active", true);
        }

        const { data, error } = await q;
        if (!error && data && data.length > 0) {
          return data;
        }
      } catch (err) {
        console.warn("Error fetching team_members, using defaults:", err);
      }
      return DEFAULT_TEAM_MEMBERS;
    },
  });

  // Create member mutation
  const createMutation = useMutation({
    mutationFn: async ({
      data,
      imageFile,
    }: {
      data: Omit<TeamMemberInsert, "image_url">;
      imageFile?: File | null;
    }) => {
      let image_url = null;

      if (imageFile) {
        const uploadRes = await uploadImage("team-images", imageFile, "avatars");
        image_url = uploadRes.url;
      }

      const { data: created, error } = await supabase
        .from("team_members")
        .insert({
          ...data,
          image_url,
        })
        .select()
        .single();

      if (error) throw error;
      return created;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success("Yangi xodim muvaffaqiyatli qo'shildi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Xodimni qo'shishda xatolik yuz berdi");
    },
  });

  // Update member mutation
  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
      newImageFile,
      oldImageUrl,
    }: {
      id: string;
      data: TeamMemberUpdate;
      newImageFile?: File | null;
      oldImageUrl?: string | null;
    }) => {
      let image_url = data.image_url;

      if (newImageFile) {
        const uploadRes = await uploadImage("team-images", newImageFile, "avatars");
        image_url = uploadRes.url;

        // Clean up old image if changed
        if (oldImageUrl && oldImageUrl !== image_url) {
          await deleteImage("team-images", oldImageUrl);
        }
      }

      const { data: updated, error } = await supabase
        .from("team_members")
        .update({
          ...data,
          // `exactOptionalPropertyTypes` yoqilgan — `undefined` ni ochiq
          // uzatib bo'lmaydi, shuning uchun maydonni faqat qiymati bo'lsa qo'shamiz.
          ...(image_url !== undefined ? { image_url } : {}),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi!");
    },
    onError: (err: any) => {
      toast.error(err?.message || "Xodim ma'lumotlarini yangilashda xatolik");
    },
  });

  // Delete member mutation
  const deleteMutation = useMutation({
    mutationFn: async ({ id, imageUrl }: { id: string; imageUrl?: string | null }) => {
      // 1. Delete image from Storage
      if (imageUrl) {
        await deleteImage("team-images", imageUrl);
      }

      // 2. Delete row from Database
      const { error } = await supabase.from("team_members").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      queryClient.invalidateQueries({ queryKey: ["admin_stats"] });
      toast.success("Xodim tizimdan o'chirildi");
    },
    onError: (err: any) => {
      toast.error(err?.message || "O'chirishda xatolik yuz berdi");
    },
  });

  // Toggle active status
  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("team_members")
        .update({ is_active: !currentStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["team_members"] });
      toast.success(!currentStatus ? "Xodim faollashtirildi" : "Xodim nofaol qilindi");
    } catch (err: any) {
      toast.error("Holatni o'zgartirishda xatolik");
    }
  };

  return {
    team,
    isLoading,
    isError,
    error,
    refetch,
    createMember: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    updateMember: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
    deleteMember: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
    toggleActive,
  };
}
