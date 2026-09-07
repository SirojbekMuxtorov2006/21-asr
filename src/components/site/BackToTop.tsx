import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Sahifa yetarlicha pastga aylantirilganda paydo bo'ladigan "tepaga" tugmasi.
 * TelegramFab ustida joylashadi (bottom-5 + 56px + oraliq).
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > 700);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Sahifa tepasiga qaytish"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-5 bottom-[5.25rem] z-40 flex size-11 items-center justify-center rounded-full",
        "border border-border bg-card/90 text-foreground shadow-card backdrop-blur",
        "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-glow active:scale-95",
        visible ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-90 opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
