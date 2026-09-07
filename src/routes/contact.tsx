import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MapPin, Send, Loader2, Instagram } from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

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
              icon: Instagram,
              title: "Instagram",
              lines: ["@21ASR_MARKAZI"],
              href: "https://instagram.com/21ASR_MARKAZI",
            },
            {
              icon: Send,
              title: "Telegram",
              lines: ["@ASRBUX_21"],
              href: "https://t.me/ASRBUX_21",
            },
            {
              icon: MapPin,
              title: "Manzil",
              lines: ["Urgut tumani,", "Davlat Xizmatlar Markazi (Yagona Darcha) ro'parasida"],
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
    </PublicLayout>
  );
}
