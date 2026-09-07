import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { ArticleContent } from "@/components/site/ArticleContent";
import { getNewsBySlug } from "@/lib/public.functions";
import { formatDate } from "@/lib/format";

const newsQuery = (slug: string) =>
  queryOptions({ queryKey: ["news", slug], queryFn: () => getNewsBySlug({ data: { slug } }) });

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(newsQuery(params.slug));
    if (!data.item) throw notFound();
    return { title: data.item.title, excerpt: data.item.excerpt, cover: data.item.cover_url };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Maqola topilmadi — 21-ASR" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.title} | 21-ASR`;
    const description = (loaderData.excerpt || loaderData.title).slice(0, 155);
    const meta = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ];
    if (loaderData.cover?.startsWith("https://")) {
      meta.push(
        { property: "og:image", content: loaderData.cover },
        { name: "twitter:image", content: loaderData.cover },
      );
    }
    return { meta };
  },
  notFoundComponent: () => (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Maqola topilmadi</h1>
        <Button asChild className="mt-6 rounded-full gradient-primary text-primary-foreground">
          <Link to="/news">Yangiliklarga qaytish</Link>
        </Button>
      </div>
    </PublicLayout>
  ),
  component: NewsDetail,
});

function NewsDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(newsQuery(slug));
  const item = data.item!;

  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium transition-colors"
        >
          <ArrowLeft className="size-4" /> Yangiliklar
        </Link>
        <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {item.title}
        </h1>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="size-4" /> {formatDate(item.published_at)}
        </div>
        {item.cover_url && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-border shadow-md">
            <img
              src={item.cover_url}
              alt={item.title}
              loading="lazy"
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
        )}
        <div className="mt-8">
          <ArticleContent content={item.body} />
        </div>
      </article>
    </PublicLayout>
  );
}
