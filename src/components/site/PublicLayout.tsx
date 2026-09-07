import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { TelegramFab } from "./TelegramFab";
import { BackToTop } from "./BackToTop";
import { Reveal, ScrollProgress, Parallax } from "./Motion";

export function PublicLayout({ children }: { children: ReactNode }) {
  // Har bir marshrut o'zgarganda `key` yangilanadi va sahifa
  // yumshoq kirish animatsiyasi bilan qayta chiziladi.
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScrollProgress />
      <SiteHeader />
      <main key={pathname} className="animate-page-enter flex-1">
        {children}
      </main>
      <SiteFooter />
      <TelegramFab />
      <BackToTop />
    </div>
  );
}

export function PageHero({
  title,
  subtitle,
  eyebrow,
  children,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children?: ReactNode;
}) {
  return (
    <section className="gradient-hero relative overflow-hidden">
      {/* Jonli aurora qatlamlari — sekin suzuvchi yorug'lik dog'lari */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-aurora absolute -right-24 -top-32 size-96 rounded-full bg-white/12 blur-3xl" />
        <div className="animate-aurora-slow absolute -bottom-40 -left-20 size-[28rem] rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="animate-float absolute left-1/2 top-1/4 size-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Nozik to'r naqshi — chuqurlik hissi beradi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent 75%)",
        }}
      />

      <Parallax speed={0.06}>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          {eyebrow ? (
            <Reveal variant="down" as="div">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
                <span className="relative flex size-1.5">
                  <span className="animate-ring-expand absolute inline-flex size-full rounded-full bg-white" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                {eyebrow}
              </span>
            </Reveal>
          ) : null}

          <Reveal variant="up" delay={80}>
            <h1 className="max-w-3xl text-balance text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
          </Reveal>

          {subtitle ? (
            <Reveal variant="up" delay={170}>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
                {subtitle}
              </p>
            </Reveal>
          ) : null}

          {children ? (
            <Reveal variant="up" delay={260}>
              <div className="mt-8">{children}</div>
            </Reveal>
          ) : null}
        </div>
      </Parallax>

      {/* Pastki yumshoq o'tish — hero kontentga silliq ulanadi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
      />
    </section>
  );
}
