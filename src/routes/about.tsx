import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Users, Target, Building2 } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { TeamSection } from "@/components/site/TeamSection";
import { GallerySection } from "@/components/site/GallerySection";
import { PartnersSection } from "@/components/site/PartnersSection";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Biz haqimizda — 21-ASR Raqamli Xizmatlar Markazi" },
      {
        name: "description",
        content:
          "21-ASR Raqamli Xizmatlar Markazi — samarqand urgutda tadbirkorlar va fuqarolar uchun 100+ raqamli xizmat ko'rsatuvchi jamoa.",
      },
      { property: "og:title", content: "Biz haqimizda — 21-ASR" },
      { property: "og:description", content: "Jamoamiz, qadriyatlarimiz va tajribamiz haqida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Biz haqimizda"
        title="Raqamli xizmatlarni oddiy qilamiz"
        subtitle="21-ASR Raqamli Xizmatlar Markazi tadbirkorlar va fuqarolarga byurokratiyasiz, tez va shaffof xizmat ko'rsatadi."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">Missiyamiz</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Biz har bir tadbirkor va fuqaro davlat va biznes xizmatlarini navbatsiz, ortiqcha
              qog'ozbozliksiz olishi kerak deb hisoblaymiz. Shuning uchun 300 dan ortiq xizmatni bir
              platformada jamladik: ro'yxatdan o'tkazishdan tortib buxgalteriya va marketinggacha.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Har bir buyurtma shaxsiy menejer nazoratida bo'ladi. Siz jarayonni onlayn kuzatib
              borasiz, tayyor hujjatlarni shaxsiy kabinetdan yuklab olasiz.
            </p>
            <Button asChild className="mt-7 rounded-full gradient-primary px-7 text-primary-foreground">
              <Link to="/services" search={{ q: "", cat: "all" }}>Xizmatlarni ko'rish</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Award, value: "10+", label: "yillik tajriba" },
              { icon: Users, value: "30 000+", label: "mamnun mijoz" },
              { icon: Target, value: "300+", label: "xizmat turi" },
              { icon: Building2, value: "3", label: "ofis va filial" },
            ].map((s) => (
              <div key={s.label} className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <s.icon className="size-6 text-primary" />
                <div className="mt-4 text-3xl font-extrabold text-gradient">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gradient-soft py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">Qadriyatlarimiz</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              ["Shaffoflik", "Muddatlar va jarayon oldindan ma'lum. Yashirin to'lovlar yo'q."],
              ["Mas'uliyat", "Xatolik bo'lsa — o'z hisobimizdan tuzatamiz."],
              ["Tezkorlik", "Xizmatlar tezkor va sifatli bajariladi."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-border bg-card p-7 shadow-soft">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <PartnersSection />

      {/* TEAM SECTION */}
      <TeamSection />

      {/* GALLERY SECTION */}
      <GallerySection className="bg-muted/20" />
    </PublicLayout>
  );
}
