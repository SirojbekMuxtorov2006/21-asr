import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { ServiceCard, type ServiceRow } from "@/components/site/ServiceCard";
import { OrderDialog } from "@/components/site/OrderDialog";
import { Input } from "@/components/ui/input";
import { getCatalog } from "@/lib/public.functions";
import { useI18n, localized } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const catalogQuery = queryOptions({ queryKey: ["catalog"], queryFn: () => getCatalog() });

type SearchParams = { q: string; cat: string };

export const Route = createFileRoute("/services/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"].slice(0, 100) : "",
    cat: typeof search["cat"] === "string" ? search["cat"].slice(0, 60) : "all",
  }),
  head: () => ({
    meta: [
      { title: "Xizmatlar katalogi — 300+ xizmat | 21-ASR" },
      {
        name: "description",
        content:
          "21-ASR xizmatlari katalogi: biznes, hujjatlar, soliq va buxgalteriya, davlat xizmatlari, E-IMZO, patent, baholash, rieltorlik, sug'urta, marketing, print va IT.",
      },
      { property: "og:title", content: "Xizmatlar katalogi — 21-ASR" },
      { property: "og:description", content: "300+ xizmat: muddatlari va batafsil ma'lumotlari bilan." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  component: ServicesPage,
});

function ServicesPage() {
  const { t, lang } = useI18n();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data } = useSuspenseQuery(catalogQuery);
  const [orderService, setOrderService] = useState<ServiceRow | null>(null);

  const filtered = useMemo(() => {
    const q = search.q.trim().toLowerCase();
    const list = data.services.filter((s) => {
      let catMatch = search.cat === "all";
      if (search.cat === "top-53") {
        catMatch = !!s.top53_rank;
      } else if (search.cat === "3-daraja") {
        catMatch = s.level === 3;
      } else if (search.cat === "2-daraja") {
        catMatch = s.level === 2;
      } else if (search.cat === "1-daraja") {
        catMatch = s.level === 1;
      } else {
        catMatch = data.categories.find((c) => c.id === s.category_id)?.slug === search.cat;
      }

      const match =
        !q || `${s.name_uz} ${s.name_ru} ${s.short_description} ${s.slug}`.toLowerCase().includes(q);
      return catMatch && match;
    });

    if (search.cat === "top-53") {
      return [...list].sort((a, b) => (a.top53_rank || 999) - (b.top53_rank || 999));
    }
    return list;
  }, [data, search]);

  const currentCategory = data.categories.find((c) => c.slug === search.cat);

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Katalog"
        title="Barcha xizmatlar va darajalar"
        subtitle="Kerakli xizmatni qidiruv, yo'nalish yoki malaka darajasi (1, 2, 3-Daraja, TOP 53) bo'yicha toping."
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="sticky top-16 z-30 -mx-4 mb-8 bg-background/90 px-4 py-4 backdrop-blur lg:top-20">
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search.q}
              onChange={(e) =>
                navigate({ search: (prev: SearchParams) => ({ ...prev, q: e.target.value }), replace: true })
              }
              placeholder={t("search.placeholder")}
              className="h-12 rounded-2xl pl-11 text-base"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {[{ slug: "all", name_uz: t("filter.all"), name_ru: t("filter.all") }, ...data.categories].map(
              (c) => (
                <button
                  key={c.slug}
                  onClick={() => navigate({ search: (prev: SearchParams) => ({ ...prev, cat: c.slug }) })}
                  className={cn(
                    "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all flex items-center gap-1.5",
                    search.cat === c.slug
                      ? "border-transparent gradient-primary text-primary-foreground shadow-glow"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                  )}
                >
                  {localized(lang, c.name_uz, c.name_ru)}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Level & Progression Info Box */}
        {["top-53", "3-daraja", "2-daraja", "1-daraja"].includes(search.cat) && (
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground backdrop-blur flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <h4 className="font-bold text-primary flex items-center gap-2 text-base">
                📌 {currentCategory?.name_uz || "Daraja Xizmatlari"}
              </h4>
              <p className="mt-1 text-muted-foreground">
                Ushbu ro'yxatdagi xizmatlarni 100% o'rgangan xodimlar bo'lim boshlig'i tavsiyasi bilan keyingi darajaga o'ta olishadi.
              </p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary border border-primary/20">
              {filtered.length} ta xizmat
            </span>
          </div>
        )}

        <p className="mb-5 text-sm text-muted-foreground">{filtered.length} ta xizmat topildi</p>

        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
            <p className="text-lg font-semibold">{t("search.empty")}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Boshqa kalit so'z bilan qidiring yoki biz bilan bog'laning.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((s) => (
              <ServiceCard key={s.id} service={s} onOrder={setOrderService} />
            ))}
          </div>
        )}
      </div>

      <OrderDialog
        service={orderService}
        open={!!orderService}
        onOpenChange={(v) => !v && setOrderService(null)}
      />
    </PublicLayout>
  );
}
