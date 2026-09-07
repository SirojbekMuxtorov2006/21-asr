import { Link } from "@tanstack/react-router";
import { ArrowRight, Flame, ShieldCheck } from "lucide-react";
import { DynamicIcon } from "./DynamicIcon";
import { Spotlight, Tilt } from "./Motion";
import { useI18n, localized } from "@/lib/i18n";
import type { Tables } from "@/integrations/supabase/types";

export type ServiceRow = Tables<"services">;

export function ServiceCard({
  service,
  onOrder,
}: {
  service: ServiceRow;
  onOrder?: (s: ServiceRow) => void;
}) {
  const { t, lang } = useI18n();

  return (
    <Tilt max={5}>
      <Spotlight
        as="article"
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-2 hover:border-primary/40 hover:shadow-elevated"
      >
        {/* Hover'da yuqoridan pastga yoyiladigan yumshoq gradient fon */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {/* Yuqori chetdagi gradient chiziq — chapdan o'ngga cho'ziladi */}
        <span
          aria-hidden="true"
          className="gradient-primary absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />

        <div className="relative flex flex-1 flex-col p-6">
          <div className="mb-4 flex items-start justify-between gap-3">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-accent text-primary transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:gradient-primary group-hover:rotate-3 group-hover:scale-110 group-hover:text-primary-foreground group-hover:shadow-glow">
              <DynamicIcon name={service.icon} className="size-7" />
            </span>

            <div className="flex flex-wrap items-center justify-end gap-1.5">
              {service.top53_rank ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Flame className="size-3 text-amber-500" />
                  TOP #{service.top53_rank}
                </span>
              ) : service.is_popular ? (
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-warning">
                  <Flame className="size-3" />
                  Ommabop
                </span>
              ) : null}

              {service.level ? (
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wide border ${
                    service.level === 3
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
                      : service.level === 2
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30"
                      : "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30"
                  }`}
                >
                  {service.level}-Daraja
                </span>
              ) : null}
            </div>
          </div>

          <h3 className="text-balance text-lg font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
            {localized(lang, service.name_uz, service.name_ru)}
          </h3>

          <p className="mt-2 line-clamp-2 flex-1 text-pretty text-sm leading-relaxed text-muted-foreground">
            {service.short_description}
          </p>

          {/* Kafolatli belgisi va Batafsil havolasi */}
          <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
              <ShieldCheck className="size-3.5" />
              Kafolatli
            </span>
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              {t("cta.details")}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Spotlight>
    </Tilt>
  );
}
