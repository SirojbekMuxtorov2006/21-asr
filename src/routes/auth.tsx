import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? search["redirect"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kirish va ro'yxatdan o'tish | 21-ASR" },
      {
        name: "description",
        content:
          "21-ASR shaxsiy kabinetiga kiring: buyurtmalaringizni kuzating, hujjatlarni yuklab oling va to'lovlarni boshqaring.",
      },
      { property: "og:title", content: "Kirish — 21-ASR" },
      { property: "og:description", content: "Shaxsiy kabinetga kirish." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Email noto'g'ri").max(255);
const passwordSchema = z.string().min(6, "Parol kamida 6 ta belgi");

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { user, isStaff, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "", phone: "" });

  const targetPath = search.redirect || (isStaff ? "/admin" : "/dashboard");

  useEffect(() => {
    if (!authLoading && user) navigate({ to: targetPath, replace: true });
  }, [user, authLoading, isStaff, navigate, targetPath]);

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    const email = emailSchema.safeParse(form.email);
    const password = passwordSchema.safeParse(form.password);
    if (!email.success || !password.success) {
      toast.error(!email.success ? "Email noto'g'ri" : "Parol kamida 6 ta belgi");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.data,
      password: password.data,
    });
    setLoading(false);
    if (error) {
      toast.error("Email yoki parol noto'g'ri");
      return;
    }
    navigate({ to: targetPath });
  }

  async function signUp(e: React.FormEvent) {
    e.preventDefault();
    const email = emailSchema.safeParse(form.email);
    const password = passwordSchema.safeParse(form.password);
    if (!email.success || !password.success) {
      toast.error(!email.success ? "Email noto'g'ri" : "Parol kamida 6 ta belgi");
      return;
    }
    if (form.name.trim().length < 2) {
      toast.error("Ismingizni kiriting");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email.data,
      password: password.data,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: form.name.trim(), phone: form.phone.trim() },
      },
    });
    setLoading(false);
    if (error) {
      if (
        error.message.toLowerCase().includes("weak") ||
        error.message.toLowerCase().includes("easy to guess") ||
        error.message.toLowerCase().includes("pwned")
      ) {
        toast.error("Parol juda oddiy va zaif. Iltimos, xavfsizroq parol tanlang (masalan: Asr2026!#)");
      } else if (error.message.includes("already registered")) {
        toast.error("Bu email allaqachon ro'yxatdan o'tgan, kirish bo'limidan kiring");
      } else {
        toast.error(error.message || "Ro'yxatdan o'tishda xatolik");
      }
      return;
    }
    toast.success("Hisob yaratildi! Kabinetga o'tyapmiz...");
    navigate({ to: "/dashboard" });
  }

  async function google() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}${targetPath}`,
        },
      });
      if (error) {
        toast.error(error.message || "Google orqali kirishda xatolik");
      }
    } catch (e: any) {
      toast.error(e?.message || "Google orqali kirishda xatolik");
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="gradient-hero relative hidden w-1/2 flex-col justify-between p-12 lg:flex">
        <div className="absolute -right-20 top-20 size-72 rounded-full bg-white/10 blur-3xl" />
        <Logo />
        <div className="relative">
          <h2 className="text-4xl font-extrabold leading-tight text-white">
            Shaxsiy kabinetingiz
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Buyurtmalaringiz holatini kuzating, hujjatlarni yuklab oling, to'lovlar tarixini
            ko'ring va menejer bilan yozishing — bir joyda.
          </p>
        </div>
        <p className="relative text-sm text-white/60">
          © {new Date().getFullYear()} 21-ASR Raqamli Xizmatlar Markazi
        </p>
      </div>

      <div className="flex w-full items-center justify-center bg-background px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Bosh sahifa
          </Link>

          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 rounded-2xl">
              <TabsTrigger value="signin" className="rounded-xl">
                Kirish
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl">
                Ro'yxatdan o'tish
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={signIn} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="si-email">Email</Label>
                  <Input
                    id="si-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="si-password">Parol</Label>
                  <Input
                    id="si-password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-2xl gradient-primary text-base text-primary-foreground hover:opacity-95"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />} Kirish
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signUp} className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="su-name">To'liq ism *</Label>
                  <Input
                    id="su-name"
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-phone">Telefon</Label>
                  <Input
                    id="su-phone"
                    value={form.phone}
                    maxLength={20}
                    placeholder="+998 90 123 45 67"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-email">Email *</Label>
                  <Input
                    id="su-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="su-password">Parol *</Label>
                  <Input
                    id="su-password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="h-11 rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-2xl gradient-primary text-base text-primary-foreground hover:opacity-95"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />} Ro'yxatdan o'tish
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase text-muted-foreground">yoki</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button variant="outline" onClick={google} className="h-12 w-full rounded-2xl">
            <svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.11a6.6 6.6 0 010-4.22V7.05H2.18a11 11 0 000 9.9l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 002.18 7.05l3.66 2.84c.87-2.6 3.3-4.14 6.16-4.14z"
              />
            </svg>
            Google orqali kirish
          </Button>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Davom etish orqali siz foydalanish shartlariga rozilik bildirasiz.
          </p>
        </div>
      </div>
    </div>
  );
}
