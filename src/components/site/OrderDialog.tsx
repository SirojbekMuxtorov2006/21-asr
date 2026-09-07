import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  BadgeCheck,
  CheckCircle2,
  Clock,
  Copy,
  FileText,
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
  Upload,
  User,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DynamicIcon } from "./DynamicIcon";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useI18n, localized } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ServiceRow } from "./ServiceCard";

const schema = z.object({
  customer_name: z.string().trim().min(2, "Ism-familiyani to'liq kiriting").max(100),
  phone: z
    .string()
    .trim()
    .min(9, "Telefon raqamni to'liq kiriting")
    .max(20)
    .regex(/^[\d\s+()-]+$/, "Telefon raqam faqat raqamlardan iborat bo'lsin"),
  email: z.string().trim().email("Email manzil noto'g'ri").max(255).or(z.literal("")),
  notes: z.string().trim().max(1000).optional().default(""),
});

const ALLOWED = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Katalog bazadan emas, statik fallback'dan kelganda `service.id` "serv-001"
 * ko'rinishida bo'ladi — bu uuid emas. Shunday qiymatni `service_id` ustuniga
 * yozishga urinish Postgres'da 22P02 xatosini beradi va buyurtma umuman
 * saqlanmaydi. Shuning uchun faqat haqiqiy uuid'ni yuboramiz.
 */
const asUuid = (value: string | null | undefined) => (value && UUID_RE.test(value) ? value : null);

/** Trigger bo'lmasa ishlatiladigan zaxira buyurtma raqami. */
function fallbackOrderNumber() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `21ASR-${new Date().getFullYear()}-${random}`;
}

/** +998 90 123 45 67 ko'rinishida yozib boradi. */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^998/, "").slice(0, 9);
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 7), digits.slice(7, 9)];
  return `+998 ${parts.filter(Boolean).join(" ")}`.trimEnd();
}

const STEPS = [
  "Arizangiz qabul qilindi va navbatga qo'yildi",
  "Menejer 15 daqiqa ichida telefon orqali bog'lanadi",
  "Hujjatlar tayyorlanadi va sizga topshiriladi",
];

export function OrderDialog({
  service,
  open,
  onOpenChange,
}: {
  service: ServiceRow | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [phone, setPhone] = useState("+998 ");
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Yangi xizmat tanlanganda forma holatini tozalab yuboramiz.
  useEffect(() => {
    if (open) {
      setOrderNumber(null);
      setErrors({});
      setFile(null);
      setCopied(false);
    }
  }, [open, service?.id]);

  function close(v: boolean) {
    onOpenChange(v);
  }

  async function copyNumber() {
    if (!orderNumber) return;
    try {
      await navigator.clipboard.writeText(orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Nusxalab bo'lmadi");
    }
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!service) return;

    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      customer_name: String(form.get("customer_name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      email: String(form.get("email") ?? ""),
      notes: String(form.get("notes") ?? ""),
    });

    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      toast.error("Formani to'g'ri to'ldiring");
      return;
    }

    setErrors({});
    setLoading(true);

    const payload = {
      user_id: asUuid(user?.id),
      service_id: asUuid(service.id),
      service_name: localized(lang, service.name_uz, service.name_ru),
      customer_name: parsed.data.customer_name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      notes: parsed.data.notes ?? "",
      price: service.price ?? 0,
    };

    try {
      // 1-urinish: order_number ni bazadagi `assign_order_number` trigger'i
      // qo'yadi. Trigger o'rnatilmagan bazada bo'sh qiymat unique cheklovga
      // urilib ketadi — o'shanda o'zimiz raqam generatsiya qilamiz.
      let { data, error } = await supabase
        .from("orders")
        .insert({ ...payload, order_number: "" })
        .select("id, order_number")
        .single();

      if (error) {
        const retry = await supabase
          .from("orders")
          .insert({ ...payload, order_number: fallbackOrderNumber() })
          .select("id, order_number")
          .single();
        data = retry.data;
        error = retry.error;
      }

      if (error || !data) throw error ?? new Error("Buyurtma saqlanmadi");

      await supabase.from("order_events").insert({
        order_id: data.id,
        status: "yangi",
        note: "Buyurtma sayt orqali yaratildi",
        created_by: asUuid(user?.id),
      });

      if (file && user) {
        const path = `${user.id}/${data.id}-${Date.now()}-${file.name.replace(/[^\w.-]/g, "_")}`;
        const up = await supabase.storage.from("documents").upload(path, file);
        if (!up.error) {
          await supabase.from("documents").insert({
            user_id: asUuid(user.id),
            order_id: data.id,
            name: file.name,
            file_path: path,
            mime_type: file.type,
            size_bytes: file.size,
            uploaded_by: asUuid(user.id),
          });
        } else {
          toast.warning("Buyurtma yuborildi, lekin faylni yuklab bo'lmadi");
        }
      }

      setOrderNumber(data.order_number || fallbackOrderNumber());
      toast.success(t("order.success"));
    } catch (err) {
      console.error("Buyurtma xatosi:", err);
      const message =
        typeof err === "object" && err && "message" in err ? String((err as Error).message) : "";
      toast.error(
        message.includes("Failed to fetch")
          ? "Internet aloqasi yo'q. Iltimos, qayta urinib ko'ring."
          : "Buyurtmani yuborishda xatolik yuz berdi. Telefon orqali bog'laning: +998 55 701 21 00",
      );
    } finally {
      setLoading(false);
    }
  }

  const serviceName = service ? localized(lang, service.name_uz, service.name_ru) : "";

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[94vh] gap-0 overflow-hidden rounded-[1.75rem] border-border/60 p-0 shadow-elevated sm:max-w-[34rem]"
      >
        {/* ── Sarlavha: gradient fon + xizmat kartasi ─────────────────────── */}
        <div className="gradient-primary relative overflow-hidden px-6 pb-14 pt-6 text-primary-foreground">
          <span
            aria-hidden="true"
            className="absolute -right-10 -top-16 size-44 rounded-full bg-white/15 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-20 -left-12 size-40 rounded-full bg-white/10 blur-2xl"
          />

          <button
            type="button"
            onClick={() => close(false)}
            aria-label="Yopish"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/15 p-2 text-primary-foreground transition-colors hover:bg-white/25"
          >
            <X className="size-4" />
          </button>

          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="size-3" />
              21-ASR xizmati
            </span>
            <DialogTitle className="mt-3 text-balance text-xl font-bold leading-snug sm:text-2xl">
              {orderNumber ? t("order.success") : t("order.title")}
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-primary-foreground/80">
              {orderNumber
                ? "Menejerimiz tez orada siz bilan bog'lanadi."
                : "Formani to'ldiring — 15 daqiqa ichida bog'lanamiz."}
            </DialogDescription>
          </div>
        </div>

        {/* Xizmat kartasi — gradient bilan kontent orasida "suzib" turadi */}
        {service ? (
          <div className="-mt-10 px-4 sm:px-6">
            <div className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-soft">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <DynamicIcon name={service.icon} className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-foreground">{serviceName}</p>
                {service.duration ? (
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="size-3" />
                      {service.duration}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}

        <div className="max-h-[calc(94vh-14rem)] overflow-y-auto px-4 pb-6 pt-5 sm:px-6">
          {orderNumber ? (
            /* ── Muvaffaqiyat holati ─────────────────────────────────────── */
            <div className="text-center">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckCircle2 className="size-9" />
              </div>

              <p className="mt-4 text-sm text-muted-foreground">Buyurtma raqamingiz</p>
              <button
                type="button"
                onClick={copyNumber}
                className="group mx-auto mt-2 flex items-center gap-2 rounded-2xl border border-dashed border-primary/40 bg-accent px-5 py-3 text-lg font-bold tracking-wide text-accent-foreground transition-colors hover:border-primary"
              >
                {orderNumber}
                {copied ? (
                  <BadgeCheck className="size-4 text-success" />
                ) : (
                  <Copy className="size-4 opacity-50 transition-opacity group-hover:opacity-100" />
                )}
              </button>
              <p className="mt-2 text-xs text-muted-foreground">
                {copied ? "Nusxalandi" : "Raqamni nusxalash uchun bosing"}
              </p>

              <ol className="mt-6 space-y-3 text-left">
                {STEPS.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                        index === 0
                          ? "bg-success text-success-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full"
                  onClick={() => close(false)}
                >
                  Yopish
                </Button>
                <Button
                  asChild
                  className="gradient-primary flex-1 rounded-full text-primary-foreground"
                >
                  {user ? (
                    <Link to="/dashboard">Buyurtmalarim</Link>
                  ) : (
                    <Link to="/auth" search={{ redirect: "/dashboard" }}>
                      Kabinet ochish
                    </Link>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            /* ── Forma ───────────────────────────────────────────────────── */
            <form onSubmit={submit} className="space-y-4">
              <Field
                id="customer_name"
                label={t("order.name")}
                icon={User}
                error={errors["customer_name"]}
                required
              >
                <Input
                  id="customer_name"
                  name="customer_name"
                  maxLength={100}
                  required
                  placeholder="Ism Familiya"
                  defaultValue={String(user?.user_metadata?.["full_name"] ?? "")}
                  className="h-11 rounded-xl pl-10"
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="phone"
                  label={t("order.phone")}
                  icon={Phone}
                  error={errors["phone"]}
                  required
                >
                  <Input
                    id="phone"
                    name="phone"
                    inputMode="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder="+998 90 123 45 67"
                    className="h-11 rounded-xl pl-10"
                  />
                </Field>

                <Field id="email" label={t("order.email")} icon={Mail} error={errors["email"]}>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={user?.email ?? ""}
                    placeholder="pochta@mail.uz"
                    className="h-11 rounded-xl pl-10"
                  />
                </Field>
              </div>

              <Field id="notes" label={t("order.notes")} icon={MessageSquare}>
                <Textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  maxLength={1000}
                  placeholder="Qo'shimcha izoh yoki savolingiz..."
                  className="rounded-xl pl-10 pt-2.5"
                />
              </Field>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {t("order.file")}
                </Label>
                {user ? (
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 text-sm transition-colors",
                      file
                        ? "border-primary/50 bg-accent text-accent-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50 hover:bg-accent/40",
                    )}
                  >
                    {file ? (
                      <FileText className="size-4 shrink-0" />
                    ) : (
                      <Upload className="size-4 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate">
                      {file ? file.name : "PDF, JPG, PNG, DOCX, XLSX — 10 MB gacha"}
                    </span>
                    {file ? (
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => {
                          e.preventDefault();
                          setFile(null);
                        }}
                        className="rounded-full p-1 hover:bg-background/70"
                      >
                        <X className="size-3.5" />
                      </span>
                    ) : null}
                    <input
                      id="file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png,.docx,.xlsx"
                      onChange={(e) => {
                        const f = e.target.files?.[0] ?? null;
                        if (f && !ALLOWED.includes(f.type)) {
                          toast.error("Fayl formati qo'llab-quvvatlanmaydi");
                          return;
                        }
                        if (f && f.size > 10 * 1024 * 1024) {
                          toast.error("Fayl hajmi 10 MB dan oshmasligi kerak");
                          return;
                        }
                        setFile(f);
                      }}
                    />
                  </label>
                ) : (
                  <p className="rounded-xl bg-muted px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                    Fayl yuklash uchun tizimga kiring. Buyurtmani hozir ham yuborishingiz mumkin.
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="shine gradient-primary h-12 w-full rounded-full text-base font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.01] active:scale-95"
              >
                {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                {loading ? "Yuborilmoqda..." : t("order.submit")}
              </Button>

              <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5 text-success" />
                Ma'lumotlaringiz uchinchi shaxslarga berilmaydi
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Ikonkali, xatoni ko'rsatuvchi forma maydoni. */
function Field({
  id,
  label,
  icon: Icon,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string | undefined;
  required?: boolean | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {label} {required ? <span className="text-destructive">*</span> : null}
      </Label>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
        {children}
      </div>
      {error ? <p className="text-xs font-medium text-destructive">{error}</p> : null}
    </div>
  );
}
