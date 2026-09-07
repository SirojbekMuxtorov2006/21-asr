import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Menu, Search, LogIn, LayoutDashboard, Phone, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useI18n, localized } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { getCatalog } from "@/lib/public.functions";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/services", key: "nav.services" },
  { to: "/team", key: "nav.team" },
  { to: "/about", key: "nav.about" },
  { to: "/news", key: "nav.news" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function SiteHeader() {
  const { t, lang, setLang } = useI18n();
  const { user, isStaff } = useAuth();
  const navigate = useNavigate();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data } = useQuery({ queryKey: ["catalog"], queryFn: () => getCatalog() });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-transparent transition-all duration-300",
        scrolled
          ? "border-border bg-background/85 shadow-soft backdrop-blur-xl"
          : "bg-background/60 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Logo />

        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "bg-accent text-accent-foreground" }}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("common.search")}
            onClick={() => setOpen(true)}
            className="rounded-full"
          >
            <Search className="size-5" />
          </Button>

          {/* Dark / Light toggle */}
          <Button
            id="theme-toggle"
            variant="ghost"
            size="icon"
            aria-label={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
            onClick={toggle}
            className="rounded-full transition-transform hover:rotate-12"
          >
            {theme === "dark" ? (
              <Sun className="size-5 text-yellow-400" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>

          <div className="hidden items-center rounded-full border border-border bg-card p-0.5 sm:flex">
            {(["uz", "ru"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors",
                  lang === l
                    ? "gradient-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>

          {user ? (
            <Button
              variant="outline"
              className="hidden rounded-full md:inline-flex"
              onClick={() => navigate({ to: isStaff ? "/admin" : "/dashboard" })}
            >
              <LayoutDashboard className="size-4" />
              {t("cta.cabinet")}
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="hidden rounded-full md:inline-flex"
              onClick={() => navigate({ to: "/auth", search: { redirect: undefined } })}
            >
              <LogIn className="size-4" />
              {t("cta.login")}
            </Button>
          )}

          <Button
            className="hidden rounded-full gradient-primary text-primary-foreground shadow-glow hover:opacity-95 lg:inline-flex"
            onClick={() => navigate({ to: "/contact" })}
          >
            {t("cta.contactUs")}
          </Button>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full lg:hidden" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86%] max-w-sm p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="border-b border-border p-5">
                  <Logo />
                </div>
                <nav className="flex flex-1 flex-col gap-1 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                  <Link
                    to="/faq"
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
                  >
                    {t("nav.faq")}
                  </Link>
                </nav>
                <div className="space-y-2 border-t border-border p-4">
                  <div className="flex items-center gap-2">
                    {(["uz", "ru"] as const).map((l) => (
                      <Button
                        key={l}
                        variant={lang === l ? "default" : "outline"}
                        size="sm"
                        className="flex-1 rounded-full uppercase"
                        onClick={() => setLang(l)}
                      >
                        {l}
                      </Button>
                    ))}
                    {/* Theme toggle in mobile menu */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full px-3"
                      onClick={toggle}
                      aria-label={theme === "dark" ? "Kunduzgi rejim" : "Tungi rejim"}
                    >
                      {theme === "dark" ? (
                        <Sun className="size-4 text-yellow-400" />
                      ) : (
                        <Moon className="size-4" />
                      )}
                    </Button>
                  </div>
                  <Button
                    className="w-full rounded-full gradient-primary text-primary-foreground"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate({ to: user ? (isStaff ? "/admin" : "/dashboard") : "/auth" });
                    }}
                  >
                    {user ? t("cta.cabinet") : t("cta.login")}
                  </Button>
                  <a
                    href="tel:+998557012100"
                    className="flex items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-medium"
                  >
                    <Phone className="size-4" /> +998 (55) 701-21-00
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("search.placeholder")} />
        <CommandList>
          <CommandEmpty>{t("search.empty")}</CommandEmpty>
          <CommandGroup heading={t("nav.services")}>
            {(data?.services ?? []).map((s) => (
              <CommandItem
                key={s.id}
                value={`${s.name_uz} ${s.name_ru} ${s.short_description}`}
                onSelect={() => {
                  setOpen(false);
                  navigate({ to: "/services/$slug", params: { slug: s.slug } });
                }}
              >
                <span className="flex-1">{localized(lang, s.name_uz, s.name_ru)}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}
