import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MapPin, Send, Loader2, Instagram, Youtube, Facebook } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { OFFICES_DATA } from "@/data/officesData";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Kontaktlar — Biz bilan bog'laning | 21-ASR" },
      {
        name: "description",
        content:
          "21-ASR Markazi bilan bog'laning: telefon +998 (55) 701-21-00, Telegram @ASRBUX_21, Instagram @21ASR_MARKAZI. Manzil: Urgut tumani, Davlat Xizmatlar Markazi ro'parasida.",
      },
      { property: "og:title", content: "Kontaktlar — 21-ASR" },
      { property: "og:description", content: "Telefon, Telegram, Instagram va manzil." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Ismni kiriting").max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+0-9 ()-]{7,20}$/, "Telefon raqami noto'g'ri"),
  email: z.string().trim().email("Email noto'g'ri").max(255).or(z.literal("")),
  message: z.string().trim().min(5, "Xabar juda qisqa").max(1000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setLoading(true);
    const { error } = await supabase.from("orders").insert({
      order_number: "",
      customer_name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      notes: parsed.data.message,
      service_name: "Konsultatsiya (bog'lanish formasi)",
    });
    setLoading(false);
    if (error) {
      toast.error("Xabar yuborilmadi. Iltimos, qayta urinib ko'ring.");
      return;
    }
    toast.success("Xabaringiz qabul qilindi! Tez orada bog'lanamiz.");
    setForm({ name: "", phone: "", email: "", message: "" });
  }

  return (
    <PublicLayout>
      <PageHero
        eyebrow="Kontaktlar"
        title="Biz bilan bog'laning"
        subtitle="Savolingiz bormi? Qo'ng'iroq qiling, yozing yoki quyidagi formani to'ldiring — 15 daqiqa ichida javob beramiz."
      />

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="space-y-4 lg:col-span-2">
          {[
            {
              icon: Phone,
              title: "Telefon",
              lines: ["+998 (55) 701-21-00", "Qisqa raqam: 1832"],
              href: "tel:+998557012100",
            },
            {
              icon: Send,
              title: "Telegram Kanal & Aloqa",
              lines: ["@asrxizmatlari (Rasmiy kanal)", "@ASRBUX_21 (Mutaxassis)"],
              href: "https://t.me/asrxizmatlari",
            },
            {
              icon: Instagram,
              title: "Instagram",
              lines: ["@21asr_markazi"],
              href: "https://www.instagram.com/21asr_markazi",
            },
            {
              icon: Youtube,
              title: "YouTube Channel",
              lines: ["@21-asr"],
              href: "https://www.youtube.com/@21-asr",
            },
            {
              icon: Facebook,
              title: "Facebook Sahifa",
              lines: ["21asr.urgut"],
              href: "https://www.facebook.com/21asr.urgut?mibextid=ZbWKwL",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="flex gap-4 rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent text-primary">
                <c.icon className="size-5" />
              </span>
              <div>
                <div className="text-sm font-bold">{c.title}</div>
                {c.lines.map((l) => (
                  <div key={l} className="text-sm text-muted-foreground">
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        {l}
                      </a>
                    ) : (
                      l
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-3xl border border-border bg-card p-7 shadow-card lg:col-span-3"
        >
          <h2 className="text-xl font-bold">Xabar qoldiring</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="c-name">Ismingiz *</Label>
              <Input
                id="c-name"
                value={form.name}
                maxLength={100}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="h-11 rounded-xl"
              />
              {errors["name"] && <p className="text-xs text-destructive">{errors["name"]}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="c-phone">Telefon *</Label>
              <Input
                id="c-phone"
                value={form.phone}
                maxLength={20}
                placeholder="+998 90 123 45 67"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="h-11 rounded-xl"
              />
              {errors["phone"] && <p className="text-xs text-destructive">{errors["phone"]}</p>}
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-email">Email</Label>
            <Input
              id="c-email"
              value={form.email}
              maxLength={255}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="h-11 rounded-xl"
            />
            {errors["email"] && <p className="text-xs text-destructive">{errors["email"]}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c-message">Xabar *</Label>
            <Textarea
              id="c-message"
              value={form.message}
              maxLength={1000}
              rows={5}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="rounded-xl"
            />
            {errors["message"] && <p className="text-xs text-destructive">{errors["message"]}</p>}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-2xl gradient-primary text-base text-primary-foreground hover:opacity-95"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            Yuborish
          </Button>
        </form>
      </div>

      {/* ======================= OFISLAR VA FILIALLAR ======================= */}
      <section className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
            Filiallarimiz
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Bizning Ofislar va Filiallar
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            O'zingizga eng qulay bo'lgan 21-ASR Raqamli Xizmatlar Markazi filialiga tashrif buyuring.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {OFFICES_DATA.map((office) => (
            <div
              key={office.id}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${
                office.isMain
                  ? "border-primary/50 bg-gradient-to-b from-primary/5 via-card to-card ring-1 ring-primary/20"
                  : "border-border bg-card"
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="size-6" />
                  </span>
                  {office.isMain ? (
                    <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                      Bosh Ofis
                    </span>
                  ) : (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                      Filial
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold">{office.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {office.landmark}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 flex flex-col gap-2.5">
                <a
                  href={office.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-95"
                >
                  <MapPin className="size-4" />
                  Google Maps'da ko'rish
                </a>

                {office.telegramUrl && (
                  <a
                    href={office.telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border bg-background text-xs font-semibold text-foreground transition-all hover:bg-accent hover:text-primary"
                  >
                    <Send className="size-3.5 text-sky-500" />
                    Telegram kanal: @asrxizmatlari
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PublicLayout>
  );
}
