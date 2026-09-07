import { useState, useEffect, useCallback } from "react";
import { usePartners } from "@/hooks/usePartners";
import {
  Building2,
  ExternalLink,
  Loader2,
  Handshake,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface PartnersSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function PartnersSection({
  title = "Bizga ishonch bildirgan kompaniyalar",
  subtitle = "O'zbekiston bo'ylab 100 dan ortiq yirik korxona, mehmonxona, ishlab chiqarish markazlari va xususiy tadbirkorlik subyektlari bizning xizmatlarimizdan samarali foydalanib kelmoqda.",
  className,
}: PartnersSectionProps) {
  const { partners, isLoading } = usePartners(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Update carousel slides count & current index
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Autoplay functionality for continuous revolving carousel
  useEffect(() => {
    if (!api || isPaused || partners.length <= 1) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [api, isPaused, partners.length]);

  return (
    <section className={cn("py-16 sm:py-24 relative overflow-hidden", className)}>
      {/* Background subtle decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold text-primary mb-4 shadow-xs">
            <Handshake className="size-3.5" />
            <span>Biznes Hamkorlarimiz & Mijozlarimiz</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
            {title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Content Area */}
        {isLoading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : partners.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground max-w-md mx-auto">
            <Building2 className="size-12 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium">Hamkor kompaniyalar ro'yxati tez orada joylashtiriladi.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* INTERACTIVE REVOLVING CAROUSEL */}
            <div
              className="relative px-2 sm:px-6"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-3 sm:-ml-4">
                  {partners.map((partner) => (
                    <CarouselItem
                      key={partner.id}
                      className="pl-3 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                    >
                      <div className="h-full group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-5 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:border-primary/50 hover:shadow-elevated">
                        {/* Top Logo Container */}
                        <div className="relative aspect-square w-full rounded-2xl bg-white p-3.5 flex items-center justify-center overflow-hidden border border-black/5 shadow-xs transition-transform duration-300 group-hover:scale-[1.03]">
                          <img
                            src={partner.logo_url}
                            alt={partner.name}
                            loading="lazy"
                            className="max-h-full max-w-full object-contain filter transition-all duration-300 group-hover:contrast-105"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>

                        {/* Partner Details */}
                        <div className="mt-4 flex-1 flex flex-col justify-between text-center">
                          <div>
                            <Badge
                              variant="secondary"
                              className="text-[10px] sm:text-xs font-semibold px-2.5 py-0.5 mb-2 bg-primary/10 text-primary border-primary/20 line-clamp-1 mx-auto max-w-full"
                            >
                              {partner.category}
                            </Badge>
                            <h3 className="font-extrabold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                              {partner.name}
                            </h3>
                          </div>

                          {partner.description && (
                            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                              {partner.description}
                            </p>
                          )}

                          {partner.website_url ? (
                            <div className="mt-3 pt-2 border-t border-border/60">
                              <a
                                href={partner.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                              >
                                <span>Saytga o'tish</span>
                                <ExternalLink className="size-3" />
                              </a>
                            </div>
                          ) : (
                            <div className="mt-3 pt-2 border-t border-border/40 text-[11px] text-muted-foreground font-medium flex items-center justify-center gap-1">
                              <Sparkles className="size-3 text-primary" />
                              <span>21-ASR Doimiy Hamkori</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Carousel Controls */}
                <div className="hidden sm:flex items-center justify-between pointer-events-none absolute inset-0 -mx-4">
                  <CarouselPrevious className="pointer-events-auto size-10 rounded-full border-border/80 bg-background/95 shadow-md hover:bg-primary hover:text-white transition-all -left-3" />
                  <CarouselNext className="pointer-events-auto size-10 rounded-full border-border/80 bg-background/95 shadow-md hover:bg-primary hover:text-white transition-all -right-3" />
                </div>
              </Carousel>

              {/* Carousel Indicator Dots */}
              {count > 1 && (
                <div className="mt-6 flex items-center justify-center gap-1.5">
                  {Array.from({ length: count }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Go to slide ${index + 1}`}
                      onClick={() => api?.scrollTo(index)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300 cursor-pointer",
                        current === index
                          ? "w-8 bg-primary"
                          : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* CONTINUOUS SMOOTH MARQUEE RIBBONS (TINIMSIZ AYLANUVCHI LENTA) */}
            <div className="relative rounded-3xl border border-border/70 bg-card/70 backdrop-blur-md p-6 sm:p-8 overflow-hidden shadow-soft space-y-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-border/60 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                  Doimiy hamkorlik & Katta ishonch
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Samarqand va butun O'zbekiston bo'ylab
                </span>
              </div>

              {/* Track 1: Moving left */}
              <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee flex items-center gap-4 sm:gap-6 whitespace-nowrap py-1">
                  {[...partners, ...partners, ...partners].map((partner, index) => (
                    <div
                      key={`marquee-1-${partner.id}-${index}`}
                      className="flex items-center gap-3.5 bg-background/90 hover:bg-background border border-border/70 rounded-2xl px-4 py-2.5 shadow-2xs transition-all duration-200 hover:scale-105 hover:border-primary/40 shrink-0 cursor-default"
                    >
                      <div className="size-11 rounded-xl bg-white p-1 flex items-center justify-center border border-black/5 shrink-0 overflow-hidden shadow-2xs">
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="size-9 object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-foreground leading-tight">{partner.name}</p>
                        <p className="text-[10px] text-muted-foreground">{partner.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Track 2: Moving right (reverse) */}
              <div className="relative flex overflow-x-hidden">
                <div className="animate-marquee-reverse flex items-center gap-4 sm:gap-6 whitespace-nowrap py-1">
                  {[...partners, ...partners, ...partners].reverse().map((partner, index) => (
                    <div
                      key={`marquee-2-${partner.id}-${index}`}
                      className="flex items-center gap-3 bg-muted/50 hover:bg-background border border-border/60 rounded-2xl px-3.5 py-2 shadow-2xs transition-all duration-200 hover:scale-105 hover:border-primary/40 shrink-0 cursor-default"
                    >
                      <div className="size-9 rounded-xl bg-white p-1 flex items-center justify-center border border-black/5 shrink-0 overflow-hidden">
                        <img
                          src={partner.logo_url}
                          alt={partner.name}
                          className="size-7 object-contain"
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-foreground leading-tight">{partner.name}</p>
                        <p className="text-[10px] text-primary font-medium">{partner.category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
