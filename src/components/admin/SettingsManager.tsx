import { useState } from "react";
import {
  Settings,
  Phone,
  Send,
  Mail,
  MapPin,
  Clock,
  Globe,
  Instagram,
  Facebook,
  Youtube,
  Save,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";
import type { Database } from "@/integrations/supabase/types";

type SettingRow = Database["public"]["Tables"]["settings"]["Row"];

interface SettingsManagerProps {
  settings: Record<string, Record<string, any>>;
  onRefresh: () => void;
}

export function SettingsManager({ settings, onRefresh }: SettingsManagerProps) {
  const [isSaving, setIsSaving] = useState(false);

  // Form state initialized from settings props
  const [contacts, setContacts] = useState({
    phone: settings["contacts"]?.["phone"] || "+998 (55) 701-21-00",
    phone_secondary: settings["contacts"]?.["phone_secondary"] || "+998 (90) 123-45-67",
    telegram: settings["contacts"]?.["telegram"] || "asrxizmatlari",
    telegram_bot: settings["contacts"]?.["telegram_bot"] || "asr21_bot",
    email: settings["contacts"]?.["email"] || "info@21-asr.uz",
    address_uz: settings["contacts"]?.["address_uz"] || "samarqand urgut shahri, Yunusobod tumani, A.Temur shoh ko'chasi 107B",
    work_hours_uz: settings["contacts"]?.["work_hours_uz"] || "Dushanba - Shanba: 09:00 - 18:00",
    map_url: settings["contacts"]?.["map_url"] || "",
  });

  const [socials, setSocials] = useState({
    telegram: settings["socials"]?.["telegram"] || "https://t.me/asrxizmatlari",
    instagram: settings["socials"]?.["instagram"] || "https://instagram.com/21asr.uz",
    facebook: settings["socials"]?.["facebook"] || "https://facebook.com/21asruz",
    youtube: settings["socials"]?.["youtube"] || "https://youtube.com/@21asruz",
  });

  const [seo, setSeo] = useState({
    site_name: settings["general"]?.["site_name"] || "21-ASR Raqamli Xizmatlar Markazi",
    meta_title: settings["general"]?.["meta_title"] || "21-ASR — Davlat va Biznes Xizmatlari Markazi",
    meta_description:
      settings["general"]?.["meta_description"] ||
      "Biznes ochish, soliq hisobotlari, litsenziyalar va 100+ onlayn davlat xizmatlari.",
  });

  async function handleSaveSettings(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      // Upsert settings in supabase
      const now = new Date().toISOString();
      const updates = [
        { key: "contacts", value: contacts as unknown as Json, updated_at: now },
        { key: "socials", value: socials as unknown as Json, updated_at: now },
        { key: "general", value: seo as unknown as Json, updated_at: now },
      ];

      for (const row of updates) {
        const { error } = await supabase.from("settings").upsert(row, { onConflict: "key" });
        if (error) throw error;
      }

      toast.success("Barcha sozlamalar muvaffaqiyatli saqlandi");
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Sozlamalarni saqlashda xatolik yuz berdi");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSaveSettings} className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Tizim va Sayt Sozlamalari</h2>
          <p className="text-xs text-muted-foreground">
            Kompaniya kontaktlari, ish vaqti, ijtimoiy tarmoqlar va SEO parametrlari
          </p>
        </div>
        <Button
          type="submit"
          disabled={isSaving}
          className="rounded-2xl gradient-primary text-primary-foreground shadow-sm cursor-pointer"
        >
          {isSaving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
          Sozlamalarni saqlash
        </Button>
      </div>

      {/* Contacts Settings */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Phone className="size-4.5 text-primary" /> Aloqa va Ish vaqti
          </CardTitle>
          <CardDescription>
            Sayt sarlavhasi (Header) va quyi qismida (Footer) chiqadigan ma'lumotlar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="c-phone">Asosiy telefon raqami</Label>
              <Input
                id="c-phone"
                value={contacts.phone}
                onChange={(e) => setContacts({ ...contacts, phone: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-phone-sec">Qo'shimcha telefon</Label>
              <Input
                id="c-phone-sec"
                value={contacts.phone_secondary}
                onChange={(e) => setContacts({ ...contacts, phone_secondary: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="c-tg">Telegram username (Guruh/Admin)</Label>
              <Input
                id="c-tg"
                value={contacts.telegram}
                onChange={(e) => setContacts({ ...contacts, telegram: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-tg-bot">Telegram Bot</Label>
              <Input
                id="c-tg-bot"
                value={contacts.telegram_bot}
                onChange={(e) => setContacts({ ...contacts, telegram_bot: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-email">Email pochta</Label>
              <Input
                id="c-email"
                value={contacts.email}
                onChange={(e) => setContacts({ ...contacts, email: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="c-address">Ofis manzili</Label>
              <Input
                id="c-address"
                value={contacts.address_uz}
                onChange={(e) => setContacts({ ...contacts, address_uz: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="c-hours">Ish vaqti</Label>
              <Input
                id="c-hours"
                value={contacts.work_hours_uz}
                onChange={(e) => setContacts({ ...contacts, work_hours_uz: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Media Links */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Globe className="size-4.5 text-primary" /> Ijtimoiy tarmoqlar havolalari
          </CardTitle>
          <CardDescription>
            Mijozlar to'g'ridan-to'g'ri o'tishi mumkin bo'lgan rasmiy sahifalar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="s-tg" className="flex items-center gap-1.5">
                <Send className="size-3.5 text-sky-500" /> Telegram kanal URL
              </Label>
              <Input
                id="s-tg"
                value={socials.telegram}
                onChange={(e) => setSocials({ ...socials, telegram: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="s-ig" className="flex items-center gap-1.5">
                <Instagram className="size-3.5 text-pink-500" /> Instagram sahifa URL
              </Label>
              <Input
                id="s-ig"
                value={socials.instagram}
                onChange={(e) => setSocials({ ...socials, instagram: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="s-fb" className="flex items-center gap-1.5">
                <Facebook className="size-3.5 text-blue-600" /> Facebook sahifa URL
              </Label>
              <Input
                id="s-fb"
                value={socials.facebook}
                onChange={(e) => setSocials({ ...socials, facebook: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="s-yt" className="flex items-center gap-1.5">
                <Youtube className="size-3.5 text-red-600" /> YouTube kanal URL
              </Label>
              <Input
                id="s-yt"
                value={socials.youtube}
                onChange={(e) => setSocials({ ...socials, youtube: e.target.value })}
                className="rounded-xl"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO and Site Identity */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardHeader>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <Settings className="size-4.5 text-primary" /> SEO va Sayt tavsifi
          </CardTitle>
          <CardDescription>
            Qidiruv tizimlari (Google, Yandex) uchun sarlavha va tavsif
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="seo-site-name">Sayt nomi</Label>
            <Input
              id="seo-site-name"
              value={seo.site_name}
              onChange={(e) => setSeo({ ...seo, site_name: e.target.value })}
              className="rounded-xl font-bold"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo-title">Meta Title</Label>
            <Input
              id="seo-title"
              value={seo.meta_title}
              onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })}
              className="rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="seo-desc">Meta Description</Label>
            <Textarea
              id="seo-desc"
              rows={2}
              value={seo.meta_description}
              onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })}
              className="rounded-xl"
            />
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
