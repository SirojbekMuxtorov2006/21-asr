import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const url =
    process.env["SUPABASE_URL"] ||
    process.env["VITE_SUPABASE_URL"] ||
    "https://placeholder-project.supabase.co";

  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ||
    process.env["VITE_SUPABASE_ANON_KEY"] ||
    process.env["VITE_SUPABASE_PUBLISHABLE_KEY"] ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder_anon_key";

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

import { ALL_CATEGORIES_DATA, ALL_SERVICES_DATA } from "@/data/allServices";

export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = publicClient();
    const [cats, servs] = await Promise.all([
      db.from("categories").select("*").eq("is_active", true).order("sort_order"),
      db.from("services").select("*").eq("is_active", true).order("sort_order"),
    ]);

    const dbCategories = cats.data ?? [];
    const dbServices = servs.data ?? [];

    // MUHIM: kategoriyalar va xizmatlar doim BITTA manbadan olinishi shart.
    // Agar biri bazadan, ikkinchisi fallback'dan olinsa, xizmatlarning
    // category_id si kategoriyalarning id siga mos kelmaydi va natijada
    // "Barchasi" dan boshqa har bir kategoriya bo'sh ko'rinadi.
    const dbCategoryIds = new Set(dbCategories.map((c) => c.id));
    const dbIsConsistent =
      dbCategories.length > 0 &&
      dbServices.length > 0 &&
      dbServices.some((s) => s.category_id && dbCategoryIds.has(s.category_id));

    if (dbIsConsistent) {
      return { categories: dbCategories, services: dbServices };
    }

    return { categories: ALL_CATEGORIES_DATA, services: ALL_SERVICES_DATA };
  } catch (e) {
    console.warn("getCatalog DB query failed, using 300 services fallback:", e);
    return { categories: ALL_CATEGORIES_DATA, services: ALL_SERVICES_DATA };
  }
});

export const getServiceBySlug = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().max(120) }).parse(input))
  .handler(async ({ data }) => {
    try {
      const db = publicClient();
      const { data: service } = await db
        .from("services")
        .select("*, categories(*)")
        .eq("slug", data.slug)
        .eq("is_active", true)
        .maybeSingle();

      if (service) {
        const [related, faq] = await Promise.all([
          db
            .from("services")
            .select("*")
            .eq("is_active", true)
            .eq("category_id", service.category_id ?? "")
            .neq("id", service.id)
            .limit(3),
          db.from("faq").select("*").eq("is_active", true).order("sort_order").limit(6),
        ]);
        return { service, related: related.data ?? [], faq: faq.data ?? [] };
      }
    } catch (e) {}

    // Fallback to local 300 services dataset
    const fallbackService = ALL_SERVICES_DATA.find((s) => s.slug === data.slug) || null;
    const fallbackCategory = fallbackService
      ? ALL_CATEGORIES_DATA.find((c) => c.id === fallbackService.category_id)
      : null;
    const serviceWithCat = fallbackService
      ? { ...fallbackService, categories: fallbackCategory }
      : null;
    const related = fallbackService
      ? ALL_SERVICES_DATA.filter(
          (s) => s.category_id === fallbackService.category_id && s.id !== fallbackService.id
        ).slice(0, 3)
      : [];

    return { service: serviceWithCat as any, related, faq: [] };
  });

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  const db = publicClient();
  const [news, faq, reviews, settings] = await Promise.all([
    db.from("news").select("*").eq("is_published", true).order("published_at", { ascending: false }),
    db.from("faq").select("*").eq("is_active", true).order("sort_order"),
    db.from("reviews").select("*").eq("is_approved", true).order("created_at", { ascending: false }),
    db.from("settings").select("*"),
  ]);
  const settingsMap: Record<string, Record<string, string>> = {};
  for (const row of settings.data ?? []) {
    settingsMap[row.key] = (row.value ?? {}) as Record<string, string>;
  }
  return {
    news: news.data ?? [],
    faq: faq.data ?? [],
    reviews: reviews.data ?? [],
    settings: settingsMap,
  };
});

export const getNewsBySlug = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ slug: z.string().max(160) }).parse(input))
  .handler(async ({ data }) => {
    const db = publicClient();
    const { data: item } = await db
      .from("news")
      .select("*")
      .eq("slug", data.slug)
      .eq("is_published", true)
      .maybeSingle();
    return { item };
  });

import { DEFAULT_TEAM_MEMBERS } from "@/data/teamData";

export const getTeam = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const db = publicClient();
    const { data: team, error } = await db
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (!error && team && team.length > 0) {
      return { team };
    }
  } catch (e) {
    console.warn("getTeam DB query failed, using fallback team data:", e);
  }
  return { team: DEFAULT_TEAM_MEMBERS };
});

import { DEFAULT_GALLERY_ITEMS } from "@/data/galleryData";

export const getGallery = createServerFn({ method: "GET" })
  .validator((input: unknown) => z.object({ category: z.string().optional() }).optional().parse(input))
  .handler(async ({ data }) => {
    try {
      const db = publicClient();
      let q = db.from("gallery").select("*").eq("is_active", true).order("sort_order", { ascending: true });
      if (data?.category && data.category !== "all" && data.category !== "Barchasi") {
        q = q.eq("category", data.category);
      }
      const { data: gallery, error } = await q;
      if (!error && gallery && gallery.length > 0) {
        return { gallery };
      }
    } catch (e) {}

    let res = DEFAULT_GALLERY_ITEMS.filter((i) => i.is_active);
    if (data?.category && data.category !== "all" && data.category !== "Barchasi") {
      res = res.filter((i) => i.category === data.category);
    }
    return { gallery: res };
  });

