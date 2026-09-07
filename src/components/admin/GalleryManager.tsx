import { useState, useMemo, useRef } from "react";
import {
  Image as ImageIcon,
  PlusCircle,
  Upload,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  Loader2,
  Eye,
  Filter,
  Layers,
  AlertTriangle,
  FolderOpen,
  X,
  Maximize2,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useGallery, type GalleryRow } from "@/hooks/useGallery";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Barchasi", "Jamoa", "Ofis", "Tadbirlar", "Xizmatlar", "Boshqa"] as const;

export function GalleryManager() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Barchasi");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    gallery,
    isLoading,
    createItem,
    isCreating,
    createMultipleItems,
    isUploadingMultiple,
    updateItem,
    isUpdating,
    deleteItem,
    isDeleting,
    toggleActive,
  } = useGallery("all", false);

  // Single Item Modal State
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryRow | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Ofis",
    sort_order: 0,
    is_active: true,
    image_url: "",
  });
  const [singleFile, setSingleFile] = useState<File | null>(null);
  const [singlePreview, setSinglePreview] = useState<string | null>(null);
  const singleFileRef = useRef<HTMLInputElement>(null);

  // Multi-Upload Modal State
  const [isMultiModalOpen, setIsMultiModalOpen] = useState(false);
  const [multiCategory, setMultiCategory] = useState<string>("Ofis");
  const [multiFiles, setMultiFiles] = useState<File[]>([]);
  const [multiPreviews, setMultiPreviews] = useState<string[]>([]);
  const multiFileRef = useRef<HTMLInputElement>(null);

  // Delete & Preview lightbox
  const [itemToDelete, setItemToDelete] = useState<GalleryRow | null>(null);
  const [lightboxItem, setLightboxItem] = useState<GalleryRow | null>(null);

  // Filtered gallery items
  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchCat =
        selectedCategory === "Barchasi" || item.category === selectedCategory;
      const matchSearch =
        !searchTerm.trim() ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [gallery, selectedCategory, searchTerm]);

  // Open Single Create / Edit Modal
  function openSingleModal(item?: GalleryRow) {
    if (item) {
      setEditingItem(item);
      setForm({
        title: item.title,
        description: item.description || "",
        category: item.category || "Ofis",
        sort_order: item.sort_order || 0,
        is_active: item.is_active,
        image_url: item.image_url || "",
      });
      setSinglePreview(item.image_url);
    } else {
      setEditingItem(null);
      setForm({
        title: "",
        description: "",
        category: "Ofis",
        sort_order: gallery.length + 1,
        is_active: true,
        image_url: "",
      });
      setSinglePreview(null);
    }
    setSingleFile(null);
    setIsSingleModalOpen(true);
  }

  // Handle single file pick
  function handleSingleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      toast.error("Rasm hajmi 25 MB dan oshmasligi kerak");
      return;
    }

    setSingleFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setSinglePreview(url);
    };
    reader.readAsDataURL(file);

    if (!form.title.trim() && !editingItem) {
      const nameWithoutExt = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .trim();
      setForm((prev) => ({ ...prev, title: nameWithoutExt }));
    }
  }

  // Submit Single Form
  async function handleSingleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Rasm nomini kiriting");
      return;
    }

    if (!editingItem && !singleFile && !form.image_url.trim()) {
      toast.error("Iltimos, rasm faylini tanlang yoki rasm URL manzilini kiriting");
      return;
    }

    try {
      if (editingItem) {
        await updateItem({
          id: editingItem.id,
          data: {
            title: form.title.trim(),
            description: form.description.trim() || null,
            category: form.category,
            sort_order: Number(form.sort_order) || 0,
            is_active: form.is_active,
            image_url: form.image_url.trim() || editingItem.image_url,
          },
          newImageFile: singleFile,
          oldImageUrl: editingItem.image_url,
        });
      } else {
        await createItem({
          data: {
            title: form.title.trim(),
            description: form.description.trim() || null,
            category: form.category,
            sort_order: Number(form.sort_order) || 0,
            is_active: form.is_active,
            image_url: form.image_url.trim(),
          },
          imageFile: singleFile,
        });
      }
      setIsSingleModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  // Handle multi-file selection
  function handleMultiFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setMultiFiles((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setMultiPreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  // Remove multi file
  function removeMultiFile(index: number) {
    setMultiFiles((prev) => prev.filter((_, i) => i !== index));
    setMultiPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  // Submit Multi Upload
  async function handleMultiSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (multiFiles.length === 0) {
      toast.error("Kamida 1 ta rasm tanlang");
      return;
    }

    try {
      await createMultipleItems({
        files: multiFiles,
        category: multiCategory,
      });
      setIsMultiModalOpen(false);
      setMultiFiles([]);
      setMultiPreviews([]);
    } catch (err) {
      console.error(err);
    }
  }

  // Delete item
  async function handleDelete() {
    if (!itemToDelete) return;
    try {
      await deleteItem({
        id: itemToDelete.id,
        imageUrl: itemToDelete.image_url,
      });
      setItemToDelete(null);
    } catch (err) {
      console.error(err);
    }
  }

  const activeCount = gallery.filter((i) => i.is_active).length;

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground flex items-center gap-2.5">
            <ImageIcon className="size-6 text-primary" /> Galereya boshqaruvi
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Sayt galereyasi uchun rasmlarni yuklang, toifalarga ajrating va boshqaring.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            onClick={() => {
              setMultiFiles([]);
              setMultiPreviews([]);
              setIsMultiModalOpen(true);
            }}
            className="rounded-2xl border-border bg-card hover:bg-accent cursor-pointer"
          >
            <Upload className="mr-2 size-4" /> Bir nechta rasm yuklash
          </Button>

          <Button
            onClick={() => openSingleModal()}
            className="rounded-2xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 cursor-pointer"
          >
            <PlusCircle className="mr-2 size-4" /> Yangi rasm qo'shish
          </Button>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Jami rasmlar</p>
              <h3 className="text-2xl font-black text-foreground mt-0.5">{gallery.length} ta</h3>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <ImageIcon className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Saytda faol ko'rinayotgan</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-0.5">{activeCount} ta</h3>
            </div>
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Toifalar soni</p>
              <h3 className="text-2xl font-black text-foreground mt-0.5">{CATEGORIES.length - 1} ta</h3>
            </div>
            <div className="size-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
              <Layers className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Categories Tabs */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-5 space-y-4">
          {/* Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === "Barchasi"
                  ? gallery.length
                  : gallery.filter((i) => i.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-2xl px-4 py-2 text-xs font-semibold transition-all shrink-0 cursor-pointer",
                    isSelected
                      ? "gradient-primary text-primary-foreground shadow-xs"
                      : "bg-muted/60 text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.2 text-[10px]",
                      isSelected ? "bg-white/20 text-white" : "bg-background text-muted-foreground"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rasm nomi yoki tavsifi bo'yicha qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 rounded-2xl pl-10 bg-background"
            />
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : filteredGallery.length === 0 ? (
        <Card className="rounded-3xl border-border/80 p-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <ImageIcon className="size-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-foreground">Rasmlar topilmadi</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchTerm || selectedCategory !== "Barchasi"
              ? "Tanlangan filtr yoki qidiruv bo'yicha hech narsa topilmadi."
              : "Hozircha galereyaga rasm yuklanmagan."}
          </p>
          <Button
            onClick={() => openSingleModal()}
            className="mt-5 rounded-2xl gradient-primary text-primary-foreground font-semibold cursor-pointer"
          >
            <PlusCircle className="mr-2 size-4" /> Birinchi rasmni qo'shish
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredGallery.map((item) => (
            <Card
              key={item.id}
              className={cn(
                "group relative rounded-3xl border-border/80 overflow-hidden shadow-xs hover:shadow-elevated transition-all duration-300 bg-card hover:-translate-y-1.5 flex flex-col justify-between",
                !item.is_active && "opacity-60 bg-muted/20"
              )}
            >
              {/* Photo Area */}
              <div
                className="relative aspect-4/3 w-full overflow-hidden bg-muted/40 cursor-pointer"
                onClick={() => setLightboxItem(item)}
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).setAttribute(
                      "src",
                      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                    );
                  }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white/25 backdrop-blur text-white hover:bg-white/40 transition-colors">
                    <Maximize2 className="size-5" />
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-black/60 backdrop-blur-md text-white border-white/20 px-2 py-0.5"
                  >
                    {item.category}
                  </Badge>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] backdrop-blur-md font-semibold px-2 py-0.5 border shadow-xs",
                      item.is_active
                        ? "bg-emerald-500/90 text-white border-emerald-400/50"
                        : "bg-black/60 text-white/80 border-white/20"
                    )}
                  >
                    {item.is_active ? "Faol" : "Nofaol"}
                  </Badge>
                </div>
              </div>

              {/* Card Details */}
              <CardContent className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>

                  {item.description ? (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs text-muted-foreground/60 italic">Tavsif kiritilmagan</p>
                  )}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.is_active}
                      onCheckedChange={() => toggleActive(item.id, item.is_active)}
                      className="cursor-pointer"
                      id={`gal-active-${item.id}`}
                    />
                    <label htmlFor={`gal-active-${item.id}`} className="text-[11px] text-muted-foreground cursor-pointer">
                      {item.is_active ? "Ko'rsatilyapti" : "Yashirin"}
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary"
                      onClick={() => openSingleModal(item)}
                      title="Tahrirlash"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                      onClick={() => setItemToDelete(item)}
                      title="O'chirish"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* SINGLE PHOTO MODAL (ADD / EDIT) */}
      <Dialog open={isSingleModalOpen} onOpenChange={setIsSingleModalOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <ImageIcon className="size-5 text-primary" />
              <span>{editingItem ? "Rasmni tahrirlash" : "Yangi rasm qo'shish"}</span>
            </DialogTitle>
            <DialogDescription>
              Rasm ma'lumotlari, fayli yoki havolasini belgilang.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSingleSubmit} className="space-y-4 pt-2">
            {/* Upload Area */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-muted/40 border-2 border-dashed border-border text-center">
              {singlePreview ? (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border bg-black/5 mb-3 shadow-xs">
                  <img src={singlePreview} alt="Preview" className="h-full w-full object-contain" />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setSingleFile(null);
                      setSinglePreview(null);
                      setForm((prev) => ({ ...prev, image_url: "" }));
                    }}
                    className="absolute top-2 right-2 size-7 rounded-full cursor-pointer"
                  >
                    <X className="size-3.5" />
                  </Button>
                </div>
              ) : (
                <div className="my-2 flex flex-col items-center gap-1.5 text-muted-foreground">
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-1">
                    <Upload className="size-5" />
                  </div>
                  <p className="text-xs font-bold text-foreground">Rasm faylini tanlang</p>
                  <p className="text-[11px] text-muted-foreground">PNG, JPG, WebP (maksimal 25 MB)</p>
                </div>
              )}

              <input
                ref={singleFileRef}
                type="file"
                accept="image/*"
                onChange={handleSingleFileChange}
                className="hidden"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => singleFileRef.current?.click()}
                className="rounded-xl h-8 text-xs cursor-pointer mt-1"
              >
                <Upload className="mr-1.5 size-3.5" />
                {singlePreview ? "Boshqa rasm tanlash" : "Kompyuterdan tanlash"}
              </Button>
            </div>

            {/* Direct Image URL input */}
            <div className="space-y-1">
              <Label htmlFor="gal-url" className="text-[11px] text-muted-foreground">
                yoki to'g'ridan-to'g'ri rasm URL havolasi:
              </Label>
              <Input
                id="gal-url"
                placeholder="https://images.unsplash.com/... yoki /photos/..."
                value={form.image_url}
                onChange={(e) => {
                  setForm({ ...form, image_url: e.target.value });
                  if (!singleFile && e.target.value.trim()) {
                    setSinglePreview(e.target.value.trim());
                  }
                }}
                className="h-9 rounded-xl text-xs"
              />
            </div>

            {/* Title */}
            <div className="space-y-1.5">
              <Label htmlFor="gal-title" className="text-xs font-semibold">
                Rasm nomi / Sarlavhasi *
              </Label>
              <Input
                id="gal-title"
                placeholder="Masalan: Yangi ofisimiz va mijozlar zali"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="rounded-xl"
              />
            </div>

            {/* Category & Sort */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="gal-cat" className="text-xs font-semibold">
                  Toifasi / Kategoriyasi
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger id="gal-cat" className="rounded-xl">
                    <SelectValue placeholder="Kategoriya tanlang" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {CATEGORIES.filter((c) => c !== "Barchasi").map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="gal-sort" className="text-xs font-semibold">
                  Tartib raqami
                </Label>
                <Input
                  id="gal-sort"
                  type="number"
                  placeholder="0"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="gal-desc" className="text-xs font-semibold">
                Qisqacha tavsif (ixtiyoriy)
              </Label>
              <Textarea
                id="gal-desc"
                rows={2}
                placeholder="Rasm haqida qisqacha ma'lumot..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl resize-none text-xs"
              />
            </div>

            {/* Active Switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
              <div>
                <p className="text-xs font-semibold text-foreground">Saytda ko'rsatilsinmi?</p>
                <p className="text-[11px] text-muted-foreground">Agar faol bo'lmasa, galereyada yashiriladi.</p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                className="cursor-pointer"
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSingleModalOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer shadow-glow"
              >
                {isCreating || isUpdating ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 size-4" />
                )}
                {editingItem ? "O'zgarishlarni saqlash" : "Rasmni saqlash"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* MULTIPLE UPLOAD MODAL */}
      <Dialog open={isMultiModalOpen} onOpenChange={setIsMultiModalOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Upload className="size-5 text-primary" /> Bir nechta rasm yuklash
            </DialogTitle>
            <DialogDescription>
              Bir vaqtning o'zida bir nechta rasmni tanlang va toifaga yuklang.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleMultiSubmit} className="space-y-4 pt-2">
            {/* Category selection */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Kategoriya tanlang</Label>
              <Select value={multiCategory} onValueChange={setMultiCategory}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Kategoriya tanlang" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {CATEGORIES.filter((c) => c !== "Barchasi").map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Dropzone area */}
            <div
              onClick={() => multiFileRef.current?.click()}
              className="flex flex-col items-center justify-center p-8 rounded-3xl bg-muted/30 border-2 border-dashed border-primary/30 text-center hover:border-primary transition-colors cursor-pointer"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
                <Upload className="size-7" />
              </div>
              <p className="text-sm font-bold text-foreground">Rasmlarni bu yerga tortib tashlang yoki tanlang</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG, WebP formatlar qo'llab-quvvatlanadi</p>
              <input
                ref={multiFileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultiFileChange}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4 rounded-xl text-xs cursor-pointer"
              >
                Fayllarni tanlash
              </Button>
            </div>

            {/* Selected files preview grid */}
            {multiFiles.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span>Tanlangan rasmlar ({multiFiles.length} ta):</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setMultiFiles([]);
                      setMultiPreviews([]);
                    }}
                    className="h-6 text-[11px] text-destructive hover:bg-destructive/10 cursor-pointer"
                  >
                    Barchasini tozalash
                  </Button>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-52 overflow-y-auto p-1">
                  {multiPreviews.map((preview, i) => (
                    <div
                      key={i}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-border bg-black/5"
                    >
                      <img src={preview} alt="Thumb" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMultiFile(i);
                        }}
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-black/70 text-white hover:bg-destructive transition-colors cursor-pointer"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsMultiModalOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isUploadingMultiple || multiFiles.length === 0}
                className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer shadow-glow"
              >
                {isUploadingMultiple ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Upload className="mr-2 size-4" />
                )}
                {isUploadingMultiple ? "Yuklanmoqda..." : `Hammasini yuklash (${multiFiles.length})`}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* LIGHTBOX MODAL */}
      <Dialog open={!!lightboxItem} onOpenChange={(open) => !open && setLightboxItem(null)}>
        <DialogContent className="max-w-4xl p-1 bg-black/95 text-white border-none rounded-3xl overflow-hidden">
          {lightboxItem && (
            <div className="relative flex flex-col">
              <div className="relative max-h-[75vh] flex items-center justify-center overflow-hidden bg-black">
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
                    <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary">
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
                  <a href={lightboxItem.image_url} target="_blank" rel="noreferrer">
                    <ExternalLink className="size-3.5" /> Asl nusxani ochish
                  </a>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION */}
      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Rasmni o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{itemToDelete?.title}" rasmini galereyadan o'chirishni tasdiqlaysizmi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl cursor-pointer"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
