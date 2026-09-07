import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getSiteContent } from "@/lib/public.functions";

const contentQuery = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent() });

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Savol-javob (FAQ) — 21-ASR Raqamli Xizmatlar Markazi" },
      {
        name: "description",
        content:
          "Buyurtma, to'lov, hujjatlar va muddatlar bo'yicha ko'p so'raladigan savollarga javoblar.",
      },
      { property: "og:title", content: "Savol-javob — 21-ASR" },
      { property: "og:description", content: "Eng ko'p so'raladigan savollarga javoblar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(contentQuery),
  component: FaqPage,
});

function FaqPage() {
  const { data } = useSuspenseQuery(contentQuery);
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data.faq;
    return data.faq.filter((f) => `${f.question} ${f.answer}`.toLowerCase().includes(s));
  }, [q, data.faq]);

  return (
    <PublicLayout>
      <PageHero
        eyebrow="FAQ"
        title="Savol-javob"
        subtitle="Eng ko'p beriladigan savollarga javoblarni shu yerdan topasiz."
      />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="relative mb-8">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Savolni qidirish..."
            className="h-12 rounded-2xl pl-11"
          />
        </div>

        {items.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Savol topilmadi. Biz bilan bog'laning — javob beramiz.
          </p>
        ) : (
          <div className="rounded-3xl border border-border bg-card px-6 shadow-soft">
            <Accordion type="single" collapsible>
              {items.map((f) => (
                <AccordionItem key={f.id} value={f.id}>
                  <AccordionTrigger className="text-left font-semibold">{f.question}</AccordionTrigger>
                  <AccordionContent className="whitespace-pre-line text-muted-foreground">
                    {f.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        <div className="mt-10 rounded-3xl gradient-hero p-8 text-center shadow-elevated">
          <h2 className="text-xl font-bold text-primary-foreground">Javob topa olmadingizmi?</h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            Menejerlarimiz har kuni 09:00 dan 18:00 gacha xizmatingizda.
          </p>
          <Button asChild className="mt-5 rounded-full bg-card px-7 text-primary hover:bg-card/90">
            <Link to="/contact">Bog'lanish</Link>
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
