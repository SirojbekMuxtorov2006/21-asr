import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import {
  ArrowRight,
  Search,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Star,
  CheckCircle2,
  Quote,
} from "lucide-react";
import heroImage from "@/assets/hero-illustration.png";
import { PublicLayout } from "@/components/site/PublicLayout";
import { ServiceCard, type ServiceRow } from "@/components/site/ServiceCard";
import { OrderDialog } from "@/components/site/OrderDialog";
import { PartnersSection } from "@/components/site/PartnersSection";
import { DynamicIcon } from "@/components/site/DynamicIcon";
import {
  Reveal,
  Spotlight,
  Magnetic,
  Parallax,
  CountUp,
  useSpotlight,
} from "@/components/site/Motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCatalog, getSiteContent } from "@/lib/public.functions";
import { useI18n, localized } from "@/lib/i18n";

const catalogQuery = queryOptions({ queryKey: ["catalog"], queryFn: () => getCatalog() });
const contentQuery = queryOptions({ queryKey: ["site-content"], queryFn: () => getSiteContent() });

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "21-ASR — Barcha raqamli xizmatlar bir joyda | samarqand urgut" },
      {
        name: "description",
        content:
          "YATT va MCHJ ochish, E-IMZO, soliq hisoboti, buxgalteriya, patent va 300+ xizmat. 21-ASR Raqamli Xizmatlar Markazi — tez, ishonchli va qulay.",
      },
      { property: "og:title", content: "21-ASR — Barcha xizmatlar bir joyda" },
      {
        property: "og:description",
        content: "Biznes, davlat xizmatlari, hujjatlar, soliq va buxgalteriya — 300+ xizmat onlayn.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(catalogQuery),
      context.queryClient.ensureQueryData(contentQuery),
    ]);
  },
  component: Home,
});

/** Sahifa bo'ylab bir xil ko'rinadigan sektsiya sarlavhasi */
function SectionHeading({
  title,
  subtitle,
  align = "center",
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  eyebrow?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <Reveal variant="fade">
          <span className="mb-3 inline-block rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            {eyebrow}
          </span>
        </Reveal>
      ) : null}
      <Reveal variant="up" delay={60}>
        <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      </Reveal>
      {subtitle ? (
        <Reveal variant="up" delay={140}>
          <p
            className={
              align === "center"
                ? "mx-auto mt-3 text-pretty text-muted-foreground"
                : "mt-3 text-pretty text-muted-foreground"
            }
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

/** Yo'nalish kartasi — kursor ortidan yuruvchi yorug'lik bilan */
function CategoryCard({
  slug,
  icon,
  label,
}: {
  slug: string;
  icon: string | null;
  label: string;
}) {
  const ref = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      ref={ref}
      to="/services"
      search={{ q: "", cat: slug }}
      className="spotlight group flex h-full flex-col items-start gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-elevated"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-primary transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:gradient-primary group-hover:rotate-6 group-hover:scale-110 group-hover:text-primary-foreground group-hover:shadow-glow">
        <DynamicIcon name={icon} className="size-6 transition-transform duration-500 group-hover:scale-110" />
      </span>
      <span className="text-balance text-sm font-semibold leading-snug transition-colors duration-300 group-hover:text-primary">
        {label}
      </span>
    </Link>
  );
}

function Home() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { data: catalog } = useSuspenseQuery(catalogQuery);
  const { data: content } = useSuspenseQuery(contentQuery);
  const [query, setQuery] = useState("");
  const [orderService, setOrderService] = useState<ServiceRow | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return catalog.services
      .filter((s) =>
        `${s.name_uz} ${s.name_ru} ${s.short_description} ${s.slug}`.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query, catalog.services]);

  const popular = catalog.services.filter((s) => s.is_popular).slice(0, 8);
  const stats = (content.settings["stats"] ?? {}) as Record<string, string>;

  return (
    <PublicLayout>
      {/* ================================ HERO ================================ */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0" />

        {/* Aurora — sekin suzuvchi yorug'lik qatlamlari */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="animate-aurora absolute -left-32 top-4 size-[30rem] rounded-full bg-primary-glow/25 blur-3xl" />
          <div className="animate-aurora-slow absolute -right-24 bottom-0 size-96 rounded-full bg-white/12 blur-3xl" />
          <div className="animate-float absolute left-1/3 top-1/2 size-72 rounded-full bg-white/[0.07] blur-3xl" />
        </div>

        {/* Nozik to'r naqshi */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.13]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 75% 55% at 30% 10%, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 75% 55% at 30% 10%, black, transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:pb-24 lg:pt-20">
          <div>
            <Reveal variant="down">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-1.5 text-xs font-semibold text-white shadow-glow backdrop-blur">
                <span className="relative flex size-2">
                  <span className="animate-ring-expand absolute inline-flex size-full rounded-full bg-emerald-300" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
                </span>
                <ShieldCheck className="size-3.5" /> Ishonchli raqamli xizmatlar markazi
              </span>
            </Reveal>

            <Reveal variant="up" delay={90}>
              <h1 className="mt-5 text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
            </Reveal>

            <Reveal variant="up" delay={170}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
                {t("hero.subtitle")}
              </p>
            </Reveal>

            {/* Qidiruv paneli */}
            <Reveal variant="scale" delay={250}>
              <div className="mt-8 rounded-3xl bg-card/95 p-4 shadow-elevated backdrop-blur transition-shadow duration-500 hover:shadow-glow sm:p-5">
                <label
                  htmlFor="hero-search"
                  className="mb-2 block text-sm font-semibold text-foreground"
                >
                  {t("search.title")}
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="group/search relative flex-1">
                    <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-colors duration-300 group-focus-within/search:text-primary" />
                    <Input
                      id="hero-search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder={t("search.placeholder")}
                      className="h-12 rounded-2xl border-border pl-11 text-base transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary"
                    />
                  </div>
                  <Button
                    className="shine gradient-primary h-12 rounded-2xl px-6 text-base font-semibold text-white shadow-glow transition-transform duration-300 hover:scale-[1.03] active:scale-95"
                    onClick={() => navigate({ to: "/services", search: { q: query, cat: "all" } })}
                  >
                    {t("cta.findService")}
                  </Button>
                </div>

                {results.length > 0 && (
                  <ul className="mt-3 space-y-1 border-t border-border pt-3">
                    {results.map((s, i) => (
                      <li
                        key={s.id}
                        className="animate-tick-up"
                        style={{ animationDelay: `${i * 45}ms` }}
                      >
                        <Link
                          to="/services/$slug"
                          params={{ slug: s.slug }}
                          className="group/item flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-300 hover:translate-x-1 hover:bg-accent"
                        >
                          <DynamicIcon
                            name={s.icon}
                            className="size-4 text-primary transition-transform duration-300 group-hover/item:scale-110"
                          />
                          <span className="flex-1 font-medium text-foreground">
                            {localized(lang, s.name_uz, s.name_ru)}
                          </span>
                          <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover/item:translate-x-1 group-hover/item:text-primary" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}

                {query && results.length === 0 && (
                  <p className="mt-3 border-t border-border pt-3 text-sm text-muted-foreground">
                    {t("search.empty")}
                  </p>
                )}
              </div>
            </Reveal>

            <Reveal variant="up" delay={330}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Magnetic strength={0.22}>
                  <Button
                    asChild
                    size="lg"
                    className="shine rounded-full bg-white px-7 font-bold text-emerald-950 shadow-elevated transition-transform duration-300 hover:scale-105 active:scale-95"
                  >
                    <Link to="/services" search={{ q: "", cat: "all" }}>
                      {t("cta.findService")}
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={0.22}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="rounded-full border-white/40 bg-transparent px-7 text-white backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-white/10 hover:text-white active:scale-95"
                  >
                    <Link to="/contact">{t("cta.contactUs")}</Link>
                  </Button>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Hero rasmi — scroll bo'yicha yengil parallax */}
          <div className="relative hidden lg:block">
            <Parallax speed={0.09}>
              <Reveal variant="scale" delay={200}>
                <img
                  src={heroImage}
                  alt="21-ASR raqamli xizmatlar: noutbuk, smartfon, hujjatlar va E-IMZO"
                  width={1280}
                  height={1024}
                  className="animate-float w-full drop-shadow-2xl"
                />
              </Reveal>
            </Parallax>
          </div>
        </div>

        {/* ================================ STATS ================================ */}
        <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
          <Reveal variant="scale">
            <div className="grid grid-cols-2 gap-3 rounded-3xl border border-border/60 bg-card p-5 shadow-elevated backdrop-blur sm:gap-6 lg:grid-cols-4 lg:p-8">
              {(
                [
                  ["300+", t("stats.services")],
                  ["30 000+", t("stats.clients")],
                  ["10+", t("stats.years")],
                  [stats["support"] ?? "24/7", t("stats.support")],
                ] as [string, string][]
              ).map(([value, label], i) => (
                <Reveal key={label} variant="up" index={i} step={90}>
                  <div className="group cursor-default rounded-2xl p-4 text-center transition-all duration-500 hover:-translate-y-1.5 hover:bg-accent/40 hover:shadow-soft">
                    <div className="text-gradient text-3xl font-extrabold transition-transform duration-500 group-hover:scale-110 lg:text-4xl">
                      <CountUp value={value} />
                    </div>
                    <div className="mt-1 text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                      {label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== CATEGORIES ============================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10">
          <SectionHeading
            eyebrow="Yo'nalishlar"
            title={t("cat.title")}
            subtitle="Yo'nalishni tanlang — kerakli xizmatni bir necha soniyada topasiz."
          />
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {catalog.categories.map((c, i) => (
            <Reveal key={c.id} variant="up" index={i} step={55}>
              <CategoryCard
                slug={c.slug}
                icon={c.icon}
                label={localized(lang, c.name_uz, c.name_ru)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* =============================== POPULAR =============================== */}
      <section className="gradient-soft py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Eng ko'p buyurtma qilinadi"
              title={t("popular.title")}
              subtitle="Mijozlarimiz eng ko'p murojaat qiladigan xizmatlar."
            />
            <Reveal variant="left" delay={120}>
              <Button
                asChild
                variant="outline"
                className="group rounded-full transition-all duration-300 hover:scale-105 hover:border-primary/50 active:scale-95"
              >
                <Link to="/services" search={{ q: "", cat: "all" }}>
                  Barcha xizmatlar
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </Reveal>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((s, i) => (
              <Reveal key={s.id} variant="up" index={i} step={70}>
                <ServiceCard service={s} onOrder={setOrderService} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================= WHY ================================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-10">
          <SectionHeading
            eyebrow="Nega 21-ASR"
            title="Ishonch — bizning asosiy mahsulotimiz"
            subtitle="Har bir murojaat ortida aniq muddat, sifatli xizmat va javobgar mutaxassis turadi."
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Zap,
              title: "Tez va aniq",
              text: "Xizmatlar tez va aniq bajariladi. Har bir bosqichdan xabardor bo'lasiz.",
            },
            {
              icon: ShieldCheck,
              title: "Ishonchli",
              text: "10 yillik tajriba, 30 000+ mijoz. Hujjatlaringiz xavfsiz saqlanadi.",
            },
            {
              icon: HeartHandshake,
              title: "Qulay va shaffof",
              text: "Yashirin to'lovlar yo'q. Menejer barcha tafsilotlarni oldindan tushuntiradi.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} variant="up" index={i} step={110}>
              <Spotlight className="group h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-elevated">
                <span className="gradient-primary flex size-12 items-center justify-center rounded-2xl text-primary-foreground shadow-glow transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-6 group-hover:scale-110">
                  <item.icon className="size-6 transition-transform duration-500 group-hover:scale-110" />
                </span>
                <h3 className="mt-5 text-lg font-bold transition-colors duration-300 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {item.text}
                </p>
              </Spotlight>
            </Reveal>
          ))}
        </div>
      </section>

      {/* =============================== PARTNERS =============================== */}
      <PartnersSection className="bg-muted/15" />

      {/* ============================= HOW IT WORKS ============================= */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 shadow-soft lg:p-12">
            <div
              aria-hidden="true"
              className="animate-aurora-slow pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/50 blur-3xl"
            />

            <div className="relative">
              <SectionHeading
                eyebrow="Jarayon"
                title="Qanday ishlaydi?"
                subtitle="To'rt qadam — murojaatdan tayyor hujjatgacha."
              />

              <div className="relative mt-12 grid gap-8 md:grid-cols-4">
                {/* Qadamlarni bog'lovchi chiziq — faqat keng ekranlarda */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-[12%] top-5 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
                />

                {(
                  [
                    ["Xizmatni tanlang", "Katalogdan yoki qidiruv orqali toping."],
                    ["Mutaxassis bilan bog'laning", "Telefon yoki Telegram orqali murojaat qiling."],
                    ["Menejer bog'lanadi", "15 daqiqa ichida siz bilan bog'lanamiz."],
                    ["Natijani oling", "Tayyor hujjatlarni kabinetdan yuklab oling."],
                  ] as [string, string][]
                ).map(([title, text], i) => (
                  <Reveal key={title} variant="up" index={i} step={130}>
                    <div className="group relative rounded-2xl p-3 transition-all duration-500 hover:-translate-y-1 hover:bg-accent/20">
                      <span className="gradient-primary relative z-10 flex size-10 items-center justify-center rounded-full text-sm font-bold text-primary-foreground shadow-glow transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-6 group-hover:scale-110">
                        {i + 1}
                      </span>
                      <h3 className="mt-4 font-bold transition-colors duration-300 group-hover:text-primary">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-pretty text-sm text-muted-foreground">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =============================== REVIEWS =============================== */}
      {content.reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8">
            <SectionHeading eyebrow="Fikrlar" title="Mijozlarimiz fikri" />
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {content.reviews.slice(0, 3).map((r, i) => (
              <Reveal key={r.id} variant="up" index={i} step={110}>
                <Spotlight
                  as="figure"
                  className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-2 hover:border-primary/40 hover:shadow-elevated"
                >
                  <Quote
                    aria-hidden="true"
                    className="absolute -right-2 -top-2 size-20 text-accent transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:rotate-6"
                  />
                  <div className="relative flex gap-0.5 text-primary transition-transform duration-500 group-hover:scale-105">
                    {Array.from({ length: r.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="size-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="relative mt-4 text-pretty text-sm leading-relaxed text-foreground">
                    “{r.body}”
                  </blockquote>
                  <figcaption className="relative mt-4 text-sm font-semibold text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                    {r.author_name}
                  </figcaption>
                </Spotlight>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ================================= CTA ================================= */}
      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <Reveal variant="scale">
          <div className="gradient-hero relative overflow-hidden rounded-[2rem] px-6 py-14 text-center shadow-elevated lg:px-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="animate-aurora absolute -right-16 -top-16 size-72 rounded-full bg-white/12 blur-3xl" />
              <div className="animate-aurora-slow absolute -bottom-20 -left-10 size-64 rounded-full bg-primary-glow/25 blur-3xl" />
            </div>

            <h2 className="relative text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Savollaringiz bormi? Hoziroq bog'laning
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-pretty text-white/80">
              Menejerimiz 15 daqiqa ichida bog'lanadi va barcha savollaringizga javob beradi.
            </p>

            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Magnetic strength={0.22}>
                <Button
                  asChild
                  size="lg"
                  className="shine rounded-full bg-white px-8 font-bold text-emerald-950 transition-transform duration-300 hover:scale-105 active:scale-95"
                >
                  <Link to="/contact">{t("cta.contactUs")}</Link>
                </Button>
              </Magnetic>
              <Magnetic strength={0.22}>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/40 bg-transparent px-8 text-white transition-all duration-300 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <a href="tel:+998557012100">+998 (55) 701-21-00</a>
                </Button>
              </Magnetic>
            </div>

            <div className="relative mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/80">
              {["Bepul konsultatsiya", "Hujjatlar biz zimmamizda", "Onlayn kuzatuv"].map((x, i) => (
                <Reveal key={x} variant="fade" index={i} step={90}>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" /> {x}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <OrderDialog
        service={orderService}
        open={!!orderService}
        onOpenChange={(v) => !v && setOrderService(null)}
      />
    </PublicLayout>
  );
}
