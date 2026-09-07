import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Foydalanuvchi tizim sozlamalarida animatsiyani kamaytirishni tanlaganini
 * aniqlaydi. JS bilan boshqariladigan effektlar (spotlight, magnit, tilt,
 * parallax, counter) shu qiymatga qarab o'chiriladi.
 *
 * SSR paytida `false` qaytaradi — CSS'dagi `@media (prefers-reduced-motion)`
 * baribir birinchi bo'yoqdanoq himoya qiladi.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
