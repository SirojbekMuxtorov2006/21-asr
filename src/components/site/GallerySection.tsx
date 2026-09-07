import { useState } from "react";
import { useGallery, type GalleryRow } from "@/hooks/useGallery";
import { Image as ImageIcon, Sparkles, Maximize2, Loader2, X, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Barchasi", "Jamoa", "Ofis", "Tadbirlar", "Xizmatlar", "Boshqa"] as const;

interface GallerySectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function GallerySection({
  title = "Foto Lavhalar & Galereya",
  subtitle = "Markazimiz hayoti, zamonaviy ofislarimiz va xizmat ko'rsatish jarayonidan fotolavhalar.",
  className,
}: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [lightboxItem, setLightboxItem] = useState<GalleryRow | null>(null);

  const { gallery, isLoading } = useGallery(
    selectedCategory === "Barchasi" ? "all" : selectedCategory,
    true
  );

  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3">
            <Sparkles className="size-3.5" /> Galereya
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {subtitle}
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                    isSelected
                      ? "gradient-primary text-primary-foreground shadow-sm"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        {isLoading ? (
          <div className="flex min-h-[260px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : gallery.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
            <p className="text-sm">Ushbu toifada rasmlar tez orada qo'shiladi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="group relative aspect-4/3 rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Category tag */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-black/50 backdrop-blur text-white border-white/20 px-2 py-0.5"
                  >
                    {item.category}
                  </Badge>
                </div>

                {/* Zoom icon on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex size-8 items-center justify-center rounded-full bg-white/25 backdrop-blur text-white">
                    <Maximize2 className="size-4" />
                  </span>
                </div>

                {/* Caption bottom */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-primary-foreground transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-0.5 text-xs text-white/80 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxItem} onOpenChange={(open) => !open && setLightboxItem(null)}>
        <DialogContent className="max-w-4xl p-1 bg-black/95 text-white border-none rounded-3xl overflow-hidden">
          {lightboxItem && (
            <div className="relative flex flex-col">
              <div className="relative max-h-[75vh] flex items-center justify-center overflow-hidden">
                <img
                  src={lightboxItem.image_url}
                  alt={lightboxItem.title}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>
              <div className="p-5 bg-card text-foreground border-t border-border flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base">{lightboxItem.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-[10px]">
                      {lightboxItem.category}
                    </Badge>
                    {lightboxItem.description && (
                      <p className="text-xs text-muted-foreground">{lightboxItem.description}</p>
                    )}
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl text-xs gap-1.5 shrink-0"
                >
                  <a href={lightboxItem.image_url} target="_blank" rel="noreferrer" download>
                    <Download className="size-3.5" /> Asl nusxani ko'rish
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
