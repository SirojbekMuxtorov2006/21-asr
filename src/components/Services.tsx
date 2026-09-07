import { useState } from "react";
import { useServices, type ServiceRow } from "@/hooks/useServices";
import { ServiceCard } from "@/components/site/ServiceCard";
import { OrderDialog } from "@/components/site/OrderDialog";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  categoryId?: string;
  limit?: number;
  className?: string;
}

export function ServicesSection({
  title = "Barcha Raqamli Xizmatlar",
  subtitle = "Tadbirkorlik, soliq, buxgalteriya va davlat xizmatlari bir joyda.",
  categoryId = "all",
  limit,
  className,
}: ServicesSectionProps) {
  const { services, isLoading } = useServices(categoryId, true);
  const [orderService, setOrderService] = useState<ServiceRow | null>(null);

  const displayedServices = limit ? services.slice(0, limit) : services;

  return (
    <section className={cn("py-16", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className="mb-10 text-center max-w-2xl mx-auto">
            {title && <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>}
            {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : displayedServices.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-8 text-center text-muted-foreground">
            Hozircha xizmatlar mavjud emas.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {displayedServices.map((s) => (
              <ServiceCard key={s.id} service={s} onOrder={setOrderService} />
            ))}
          </div>
        )}
      </div>

      <OrderDialog
        service={orderService}
        open={!!orderService}
        onOpenChange={(v) => !v && setOrderService(null)}
      />
    </section>
  );
}

export default ServicesSection;
