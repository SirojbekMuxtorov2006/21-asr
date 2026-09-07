import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export function useStats() {
  return useQuery({
    queryKey: ["admin_stats"],
    queryFn: async () => {
      const [
        { count: teamCount, error: teamErr },
        { count: servicesCount, error: servErr },
        { count: galleryCount, error: galErr },
        { count: ordersCount, error: ordErr },
        { count: usersCount, error: userErr },
      ] = await Promise.all([
        supabase.from("team_members").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact", head: true }),
        supabase.from("gallery").select("*", { count: "exact", head: true }),
        supabase.from("orders").select("*", { count: "exact", head: true }),
        supabase.from("profiles").select("*", { count: "exact", head: true }),
      ]);

      if (teamErr) console.warn("team stats err:", teamErr);
      if (servErr) console.warn("services stats err:", servErr);
      if (galErr) console.warn("gallery stats err:", galErr);
      if (ordErr) console.warn("orders stats err:", ordErr);
      if (userErr) console.warn("users stats err:", userErr);

      return {
        teamCount: teamCount || 0,
        servicesCount: servicesCount || 0,
        galleryCount: galleryCount || 0,
        ordersCount: ordersCount || 0,
        usersCount: usersCount || 0,
      };
    },
    staleTime: 1000 * 30, // 30 seconds
  });
}
