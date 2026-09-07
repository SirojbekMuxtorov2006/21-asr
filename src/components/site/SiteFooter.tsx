import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Send, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            21-ASR — tadbirkorlar va fuqarolar uchun 300+ raqamli va davlat xizmatlari bir joyda.
          </p>
          <div className="flex gap-2">
            <a
              href="buxgalter2121"
              target="_blank"
              rel="noreferrer"
              className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Telegram"
            >
              <Send className="size-4" />
            </a>
            <a
              href="tel: +998(55)701-21-00"
              className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Telefon"
            >
              <Phone className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t("nav.services")}
          </h3>
          <ul className="space-y-2.5 text-sm">
            {(
              [
                ["yatt-ochish", "YATT ochish"],
                ["mchj-ochish", "MCHJ ochish"],
                ["e-imzo", "E-IMZO olish"],
                ["soliq-hisoboti", "Soliq hisoboti"],
                ["buxgalteriya", "Buxgalteriya"],
              ] as [string, string][]
            ).map(([slug, name]) => (
              <li key={slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug }}
                  className="text-muted-foreground transition-colors hover:text-primary"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Kompaniya
          </h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/team" className="text-muted-foreground hover:text-primary">
                {t("nav.team")}
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-muted-foreground hover:text-primary">
                {t("nav.about")}
              </Link>
            </li>
            <li>
              <Link to="/news" className="text-muted-foreground hover:text-primary">
                {t("nav.news")}
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-muted-foreground hover:text-primary">
                {t("nav.faq")}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-primary">
                {t("nav.contact")}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Ofislar va Aloqa
          </h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
              <a href="tel:+998557012100" className="hover:text-primary font-medium">
                +998 (55) 701-21-00 (Qisqa: 1832)
              </a>
            </li>
            <li className="flex gap-2.5">
              <Send className="mt-0.5 size-4 shrink-0 text-sky-500" />
              <a href="https://t.me/asrxizmatlari" target="_blank" rel="noreferrer" className="hover:text-primary font-medium">
                Telegram: @asrxizmatlari
              </a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <span className="font-semibold text-foreground">Bosh ofis (Urgut):</span>{" "}
                <a href="https://maps.google.com/maps?q=39.662412,66.939374&ll=39.662412,66.939374&z=16" target="_blank" rel="noreferrer" className="hover:underline hover:text-primary">
                  DXM ro'parasida
                </a>
              </div>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <span className="font-semibold text-foreground">Samarqand ofis:</span>{" "}
                <a href="https://maps.app.goo.gl/GqA1crWiuazoQC6fA" target="_blank" rel="noreferrer" className="hover:underline hover:text-primary">
                  DXM pastki qismida
                </a>
              </div>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <span className="font-semibold text-foreground">Pastdarg'om ofis:</span>{" "}
                <a href="https://www.google.com/maps/place/39%C2%B042'40.4%22N+66%C2%B040'09.7%22E/@39.711227,66.669349,1740m" target="_blank" rel="noreferrer" className="hover:underline hover:text-primary">
                  DXM ro'parasida
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} 21-ASR Raqamli Xizmatlar Markazi. {t("footer.rights")}.
      </div>
    </footer>
  );
}
