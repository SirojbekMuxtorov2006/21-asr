import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { getCatalog } from "@/lib/public.functions";
import { useI18n, localized } from "@/lib/i18n";

const catalogQuery = queryOptions({ queryKey: ["catalog"], queryFn: () => getCatalog() });

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Xizmatlar ro'yxati | 21-ASR" },
      {
        name: "description",
        content:
          "21-ASR xizmatlari: YATT va MCHJ ochish, E-IMZO, soliq hisoboti, buxgalteriya va boshqalar. Menejer bilan bog'laning.",
      },
      { property: "og:title", content: "Xizmatlar — 21-ASR" },
      { property: "og:description", content: "Barcha xizmatlar bitta jadvalda." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(catalogQuery),
  component: PricingPage,
});

function PricingPage() {
  const { lang, t } = useI18n();
  const { data } = useSuspenseQuery(catalogQuery);

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Xizmatlar"
        title="Barcha xizmatlar ro'yxati"
        subtitle="Kerakli xizmatni toping va menejerimiz siz bilan bog'lanadi."
      />

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-14 sm:px-6 lg:px-8">
        {data.categories.map((cat) => {
          const items = data.services.filter((s) => s.category_id === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id}>
              <h2 className="mb-5 text-2xl font-extrabold tracking-tight">
                {localized(lang, cat.name_uz, cat.name_ru)}
              </h2>
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
                <table className="w-full text-left text-sm">
                  <thead className="bg-accent/60 text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Xizmat</th>
                      <th className="px-5 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((s) => (
                      <tr key={s.id} className="border-t border-border/70 hover:bg-accent/40">
                        <td className="px-5 py-4 font-medium">
                          <Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-primary">
                            {localized(lang, s.name_uz, s.name_ru)}
                          </Link>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Button asChild size="sm" variant="ghost" className="rounded-full text-primary">
                            <Link to="/services/$slug" params={{ slug: s.slug }}>
                              {t("cta.details")}
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}

        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-xl font-bold">Xizmatga nima kiradi?</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Bepul dastlabki konsultatsiya",
              "Hujjatlarni tayyorlash va tekshirish",
              "Davlat organlariga topshirish",
              "Shaxsiy menejer va onlayn kuzatuv",
            ].map((x) => (
              <li key={x} className="flex items-center gap-2 text-sm">
                <Check className="size-4 text-primary" /> {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PublicLayout>
  );
}
