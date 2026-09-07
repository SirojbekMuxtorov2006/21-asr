import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { CalendarDays, ArrowRight } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { getSiteContent } from "@/lib/public.functions";
import { formatDate } from "@/lib/format";

const contentQuery = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent() });

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "Yangiliklar va foydali maqolalar | 21-ASR" },
      {
        name: "description",
        content:
          "Soliq, biznes va davlat xizmatlaridagi o'zgarishlar haqida yangiliklar hamda tadbirkorlar uchun foydali maqolalar.",
      },
      { property: "og:title", content: "Yangiliklar — 21-ASR" },
      { property: "og:description", content: "Qonunchilik va biznes yangiliklari." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  component: NewsPage,
});

function NewsPage() {
  const { data } = useSuspenseQuery(contentQuery);

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Blog"
        title="Yangiliklar"
        subtitle="Qonunchilikdagi o'zgarishlar, foydali maslahatlar va markaz yangiliklari."
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {data.news.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
            Hozircha yangiliklar yo'q.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.news.map((n) => (
              <Link
                key={n.id}
                to="/news/$slug"
                params={{ slug: n.slug }}
                className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                {n.cover_url ? (
                  <img
                    src={n.cover_url}
                    alt={n.title}
                    loading="lazy"
                    className="h-44 w-full object-cover"
                  />
                ) : (
                  <div className="gradient-primary h-44 w-full opacity-90" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="size-3.5" /> {formatDate(n.published_at)}
                  </span>
                  <h2 className="mt-3 text-lg font-bold leading-snug group-hover:text-primary">
                    {n.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {n.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Batafsil <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
