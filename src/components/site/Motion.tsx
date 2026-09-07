import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/* ==========================================================================
 * 21-ASR MOTION PRIMITIVLARI
 *
 * Tashqi kutubxonasiz (framer-motion yo'q) — IntersectionObserver,
 * requestAnimationFrame va CSS custom property'lar ustida qurilgan.
 * Har bir effekt `prefers-reduced-motion` ni hurmat qiladi.
 * ========================================================================== */

type RevealVariant = "up" | "down" | "left" | "right" | "scale" | "fade" | "blur";

interface RevealProps {
  children: ReactNode;
  /** Qaysi tomondan kirib kelsin */
  variant?: RevealVariant;
  /** Qo'shimcha kechikish (ms) */
  delay?: number;
  /** Ro'yxatdagi o'rni — stagger effekti uchun */
  index?: number;
  /** Har bir element orasidagi kechikish (ms) */
  step?: number;
  /** Element qanchalik ko'ringanda ishga tushsin (0–1) */
  amount?: number;
  /** Faqat bir marta animatsiya qilinsinmi */
  once?: boolean;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}

/** Stagger kechikishi cheksiz o'smasligi uchun yuqori chegara */
const MAX_STAGGER_INDEX = 12;

/**
 * Scroll bo'yicha kontentni ochib beruvchi asosiy komponent.
 *
 * Server'da `data-reveal` atributi bilan (ya'ni yashirin) render bo'ladi,
 * element ekranga kirganda IntersectionObserver uni `data-reveal="in"` ga
 * o'tkazadi. JS o'chirilgan bo'lsa `.no-js` qoidasi kontentni ko'rsatadi.
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  index = 0,
  step = 80,
  amount = 0.15,
  once = true,
  className,
  as: Tag = "div",
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Brauzer qo'llab-quvvatlamasa kontentni darhol ko'rsatamiz
    if (typeof IntersectionObserver === "undefined") {
      el.setAttribute("data-reveal", "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.setAttribute("data-reveal", "");
          }
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [amount, once]);

  const totalDelay = delay + Math.min(index, MAX_STAGGER_INDEX) * step;

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-reveal-variant={variant}
      className={className}
      style={{ ...style, "--reveal-delay": `${totalDelay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------------------
 * SPOTLIGHT — kursor ortidan yuruvchi yumshoq yorug'lik
 * -------------------------------------------------------------------------- */

/**
 * Istalgan elementga spotlight effektini bog'laydigan hook.
 * Qaytgan ref'ni elementga bering va unga `spotlight` klassini qo'shing —
 * shunda `as` prop bilan polimorf komponent yasashga hojat qolmaydi
 * (masalan `<Link>` ning `to`/`search` proplari yo'qolmaydi).
 */
export function useSpotlight<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
        el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame.current);
    };
  }, [reduced]);

  return ref;
}

/** Qo'shimcha proplar kerak bo'lmagan oddiy holatlar uchun o'ram */
export function Spotlight({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  const ref = useSpotlight();

  return (
    <Tag ref={ref} className={cn("spotlight", className)}>
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------------------
 * MAGNETIC — kursorga biroz tortiladigan element (tugmalar uchun)
 * -------------------------------------------------------------------------- */

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  /** 0–1 oralig'ida; qanchalik kuchli tortilsin */
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    // Sensorli qurilmalarda magnit effekt keraksiz
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
        const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, [strength, reduced]);

  return (
    <div
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      style={{ transition: "transform 420ms var(--ease-out-expo)" }}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * TILT — kartaning yengil 3D egilishi
 * -------------------------------------------------------------------------- */

export function Tilt({
  children,
  max = 7,
  className,
}: {
  children: ReactNode;
  /** Maksimal burilish burchagi (daraja) */
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const frame = useRef(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
      });
    };

    const onLeave = () => {
      cancelAnimationFrame(frame.current);
      el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame.current);
    };
  }, [max, reduced]);

  return (
    <div
      ref={ref}
      className={cn("h-full", className)}
      style={{ transition: "transform 480ms var(--ease-out-expo)", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * SCROLL PROGRESS — sahifa tepasidagi o'qish indikatori
 * -------------------------------------------------------------------------- */

export function ScrollProgress() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const ratio = max > 0 ? doc.scrollTop / max : 0;
        el.style.transform = `scaleX(${ratio})`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        ref={ref}
        className="gradient-primary h-full origin-left"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

/* --------------------------------------------------------------------------
 * PARALLAX — scroll bo'yicha sekinroq siljiydigan qatlam
 * -------------------------------------------------------------------------- */

export function Parallax({
  children,
  speed = 0.12,
  className,
}: {
  children: ReactNode;
  /** Musbat qiymat — scroll'ga teskari, sekinroq harakat */
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, [speed, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* --------------------------------------------------------------------------
 * COUNT UP — ekranga kirganda raqamni sanab chiquvchi hook
 * -------------------------------------------------------------------------- */

/**
 * "300+", "1 200", "24/7" kabi matnlardagi birinchi sonni topib sanaydi,
 * atrofidagi prefiks/suffiksni saqlab qoladi.
 */
export function useCountUp(value: string, duration = 1800) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/[\d\s.,]*\d/);
    if (!match || reduced) {
      setDisplay(value);
      return;
    }

    const raw = match[0];
    const target = Number(raw.replace(/[\s,]/g, ""));
    if (!Number.isFinite(target)) {
      setDisplay(value);
      return;
    }

    const prefix = value.slice(0, match.index);
    const suffix = value.slice((match.index ?? 0) + raw.length);
    const hasSpaces = /\s/.test(raw);

    let frame = 0;
    let start = 0;
    let done = false;

    const run = (now: number) => {
      if (!start) start = now;
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — oxirida yumshoq to'xtaydi
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = Math.round(target * eased);
      const formatted = hasSpaces ? current.toLocaleString("ru-RU").replace(/ /g, " ") : String(current);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(run);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done) {
            done = true;
            frame = requestAnimationFrame(run);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration, reduced]);

  return { ref, display };
}

/** `useCountUp` ning tayyor komponent ko'rinishi */
export function CountUp({
  value,
  duration = 1800,
  className,
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const { ref, display } = useCountUp(value, duration);
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}
