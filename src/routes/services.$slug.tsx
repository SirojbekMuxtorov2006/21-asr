import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle2, FileText, Phone } from "lucide-react";
import { PublicLayout } from "@/components/site/PublicLayout";
import { ServiceCard, type ServiceRow } from "@/components/site/ServiceCard";
import { OrderDialog } from "@/components/site/OrderDialog";
import { DynamicIcon } from "@/components/site/DynamicIcon";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getServiceBySlug } from "@/lib/public.functions";
import { useI18n, localized } from "@/lib/i18n";

const serviceQuery = (slug: string) =>
  queryOptions({
    queryKey: ["service", slug],
    queryFn: () => getServiceBySlug({ data: { slug } }),
  });

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(serviceQuery(params.slug));
    if (!data.service) throw notFound();
    return { name: data.service.name_uz, description: data.service.short_description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Xizmat topilmadi — 21-ASR" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.name} | 21-ASR`;
    const description = (loaderData.description ?? "").slice(0, 155) || loaderData.name;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ServiceNotFound,
  component: ServiceDetail,
});

function ServiceNotFound() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Bunday xizmat topilmadi</h1>
        <p className="mt-3 text-muted-foreground">
          Xizmat o'chirilgan yoki manzil noto'g'ri bo'lishi mumkin.
        </p>
        <Button asChild className="mt-6 rounded-full gradient-primary text-primary-foreground">
          <Link to="/services" search={{ q: "", cat: "all" }}>Katalogga qaytish</Link>
        </Button>
      </div>
    </PublicLayout>
  );
}

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { lang, t } = useI18n();
  const { data } = useSuspenseQuery(serviceQuery(slug));
  const [orderService, setOrderService] = useState<ServiceRow | null>(null);
  const service = data.service!;
  const docs = (service.required_documents ?? []) as string[];

  return (
    <PublicLayout>
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute -right-24 -top-24 size-72 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Link
            to="/services"
            search={{ q: "", cat: "all" }}
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground"
          >
            <ArrowLeft className="size-4" /> Katalog
          </Link>
          <div className="mt-6 flex items-start gap-5">
            <span className="hidden size-16 shrink-0 items-center justify-center rounded-3xl bg-primary-foreground/15 text-primary-foreground sm:flex">
              <DynamicIcon name={service.icon} className="size-8" />
            </span>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-4xl">
                {localized(lang, service.name_uz, service.name_ru)}
              </h1>
              <p className="mt-3 max-w-2xl text-primary-foreground/80">
                {service.short_description}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="space-y-8 lg:col-span-2">
          {service.description && (
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="text-xl font-bold">Xizmat haqida</h2>
              <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          )}

          {docs.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="flex items-center gap-2 text-xl font-bold">
                <FileText className="size-5 text-primary" /> {t("service.documents")}
              </h2>
              <ul className="mt-4 space-y-3">
                {docs.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {data.faq.length > 0 && (
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft">
              <h2 className="text-xl font-bold">Ko'p so'raladigan savollar</h2>
              <Accordion type="single" collapsible className="mt-2">
                {data.faq.map((f) => (
                  <AccordionItem key={f.id} value={f.id}>
                    <AccordionTrigger className="text-left text-sm font-semibold">
                      {f.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground">
                      {f.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-3xl border border-border bg-card p-7 shadow-card">
            <Button asChild className="h-12 w-full rounded-2xl gradient-primary text-base text-primary-foreground shadow-glow hover:opacity-95">
              <a href="tel:+998557012100">
                <Phone className="mr-2 size-4" /> +998 (55) 701-21-00
              </a>
            </Button>
            <Button asChild variant="outline" className="mt-3 h-12 w-full rounded-2xl">
              <Link to="/contact">
                {t("cta.contactUs")}
              </Link>
            </Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Savollaringiz bo'lsa, mutaxassislarimiz bilan bog'laning.
            </p>
          </div>
        </aside>
      </div>

      {data.related.length > 0 && (
        <section className="gradient-soft py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-2xl font-extrabold">{t("service.related")}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.related.map((s) => (
                <ServiceCard key={s.id} service={s} onOrder={setOrderService} />
              ))}
            </div>
          </div>
        </section>
      )}

      <OrderDialog
        service={orderService}
        open={!!orderService}
        onOpenChange={(v) => !v && setOrderService(null)}
      />
    </PublicLayout>
  );
}
