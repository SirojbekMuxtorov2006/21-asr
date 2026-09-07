import { useState, useMemo, useRef } from "react";
import {
  Building2,
  PlusCircle,
  Edit2,
  Trash2,
  Search,
  Upload,
  Image as ImageIcon,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
  Sparkles,
  RotateCcw,
  Globe,
  Layers,
  Handshake,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePartners } from "@/hooks/usePartners";
import type { PartnerItem } from "@/data/partnersData";
import { validateImageFile } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const COMMON_CATEGORIES = [
  "Qandolat & Oziq-ovqat",
  "Muzqaymoq & Sut mahsulotlari",
  "Xalqaro savdo & Eksport",
  "Biznes & Elektron savdo",
  "Ishlab chiqarish & Investitsiya",
  "Qurilish & Materiallar",
  "Tekstil & Yengil sanoat",
  "Avtomobil & Logistika",
  "Tibbiyot & Farmatsevtika",
  "Boshqa soha",
];

export function PartnersManager() {
  const {
    partners,
    isLoading,
    createPartner,
    isCreating,
    updatePartner,
    isUpdating,
    deletePartner,
    isDeleting,
    toggleActive,
    resetToDefaults,
  } = usePartners(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);
  const [partnerToDelete, setPartnerToDelete] = useState<PartnerItem | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Form states
  const [form, setForm] = useState({
    name: "",
    category: "",
    website_url: "",
    description: "",
    sort_order: 1,
    is_active: true,
    logo_url: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered partners list
  const filteredPartners = useMemo(() => {
    return partners.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

      if (!matchSearch) return false;

      if (statusFilter === "active") return p.is_active;
      if (statusFilter === "inactive") return !p.is_active;
      return true;
    });
  }, [partners, searchTerm, statusFilter]);

  // Open modal for Create
  function handleOpenCreate() {
    setEditingPartner(null);
    setForm({
      name: "",
      category: "Qandolat & Oziq-ovqat",
      website_url: "",
      description: "",
      sort_order: partners.length + 1,
      is_active: true,
      logo_url: "",
    });
    setSelectedFile(null);
    setLogoPreview(null);
    setIsModalOpen(true);
  }

  // Open modal for Edit
  function handleOpenEdit(partner: PartnerItem) {
    setEditingPartner(partner);
    setForm({
      name: partner.name,
      category: partner.category || "",
      website_url: partner.website_url || "",
      description: partner.description || "",
      sort_order: partner.sort_order || 1,
      is_active: partner.is_active,
      logo_url: partner.logo_url || "",
    });
    setSelectedFile(null);
    setLogoPreview(partner.logo_url || null);
    setIsModalOpen(true);
  }

  // File selection handler
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.ok) {
      toast.error(validation.error);
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Form Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Kompaniya nomini kiritish majburiy");
      return;
    }

    try {
      if (editingPartner) {
        await updatePartner({
          id: editingPartner.id,
          data: {
            name: form.name.trim(),
            category: form.category.trim() || "Boshqa soha",
            website_url: form.website_url.trim(),
            description: form.description.trim(),
            sort_order: Number(form.sort_order) || 1,
            is_active: form.is_active,
            logo_url: form.logo_url.trim() || editingPartner.logo_url,
          },
          newLogoFile: selectedFile,
          oldLogoUrl: editingPartner.logo_url,
        });
      } else {
        await createPartner({
          data: {
            name: form.name.trim(),
            category: form.category.trim() || "Boshqa soha",
            website_url: form.website_url.trim(),
            description: form.description.trim(),
            sort_order: Number(form.sort_order) || 1,
            is_active: form.is_active,
            logo_url: form.logo_url.trim(),
          },
          logoFile: selectedFile,
        });
      }
      setIsModalOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  }

  // Delete Action
  async function handleDelete() {
    if (!partnerToDelete) return;
    try {
      await deletePartner({
        id: partnerToDelete.id,
        logoUrl: partnerToDelete.logo_url,
      });
      setPartnerToDelete(null);
    } catch (err) {
      console.error(err);
    }
  }

  const activeCount = partners.filter((p) => p.is_active).length;
  const inactiveCount = partners.length - activeCount;

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2.5">
            <Building2 className="size-6 text-primary" />
            <span>Ishonch bildirgan kompaniyalar</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Saytda ko'rsatiladigan brendlar, logotiplar va hamkor kompaniyalarni boshqarish
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            className="rounded-xl border-dashed hover:bg-muted text-xs cursor-pointer"
            title="Boshlang'ich 5 ta logotipni qayta tiklash"
          >
            <RotateCcw className="size-3.5 mr-1.5" /> Boshlang'ich holat
          </Button>

          <Button
            onClick={handleOpenCreate}
            className="rounded-xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 cursor-pointer"
          >
            <PlusCircle className="size-4 mr-2" /> Yangi hamkor qo'shish
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Jami kompaniyalar</p>
              <h3 className="text-2xl font-black text-foreground mt-0.5">{partners.length}</h3>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Handshake className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Faol (Saytda ko'rinadi)</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-0.5">{activeCount}</h3>
            </div>
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Yashiringan / Nofaol</p>
              <h3 className="text-2xl font-black text-muted-foreground mt-0.5">{inactiveCount}</h3>
            </div>
            <div className="size-10 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
              <XCircle className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & View Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Kompaniya nomi yoki soha bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs rounded-xl bg-background"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-muted/60 p-0.5 rounded-xl text-xs font-medium border border-border">
            <button
              onClick={() => setStatusFilter("all")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                statusFilter === "all" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              )}
            >
              Barchasi ({partners.length})
            </button>
            <button
              onClick={() => setStatusFilter("active")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                statusFilter === "active" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              )}
            >
              Faol ({activeCount})
            </button>
            <button
              onClick={() => setStatusFilter("inactive")}
              className={cn(
                "px-3 py-1.5 rounded-lg transition-all cursor-pointer",
                statusFilter === "inactive" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              )}
            >
              Nofaol ({inactiveCount})
            </button>
          </div>

          <div className="flex items-center bg-muted/60 p-0.5 rounded-xl border border-border">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                viewMode === "grid" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
              )}
            >
              Karta
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                viewMode === "table" ? "bg-background text-foreground shadow-xs" : "text-muted-foreground"
              )}
            >
              Jadval
            </button>
          </div>
        </div>
      </div>

      {/* Main Listing */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : filteredPartners.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <Building2 className="mx-auto size-12 text-muted-foreground/40" />
          <h3 className="mt-4 text-base font-bold text-foreground">Kompaniyalar topilmadi</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchTerm ? "Qidiruv bo'yicha hech qanday natija chiqmadi" : "Hozircha hech qanday hamkor qo'shilmagan"}
          </p>
          <Button onClick={handleOpenCreate} size="sm" className="mt-4 rounded-xl gradient-primary">
            <PlusCircle className="size-3.5 mr-1.5" /> Birinchi hamkorni qo'shish
          </Button>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPartners.map((partner) => (
            <Card
              key={partner.id}
              className={cn(
                "rounded-3xl border-border bg-card shadow-soft overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-elevated",
                !partner.is_active && "opacity-70 bg-muted/20"
              )}
            >
              <CardContent className="p-5 flex-1 flex flex-col">
                {/* Logo Banner Container */}
                <div className="relative aspect-16/10 w-full rounded-2xl bg-white p-4 flex items-center justify-center overflow-hidden border border-black/5 shadow-2xs">
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge
                      variant={partner.is_active ? "default" : "secondary"}
                      className={cn(
                        "text-[10px] font-semibold px-2 py-0.5",
                        partner.is_active ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {partner.is_active ? "Faol" : "Nofaol"}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <Badge variant="outline" className="text-[10px] bg-white/90 text-foreground font-mono">
                      #{partner.sort_order}
                    </Badge>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    <Badge variant="secondary" className="text-[10px] font-medium mb-1.5 bg-primary/10 text-primary">
                      {partner.category}
                    </Badge>
                    <h3 className="text-base font-extrabold text-foreground line-clamp-1">
                      {partner.name}
                    </h3>
                    {partner.description && (
                      <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {partner.description}
                      </p>
                    )}
                  </div>

                  {partner.website_url && (
                    <div className="mt-3">
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
                      >
                        <Globe className="size-3" /> Saytga havola
                        <ExternalLink className="size-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={partner.is_active}
                      onCheckedChange={() => toggleActive({ id: partner.id, currentActive: partner.is_active })}
                      id={`switch-${partner.id}`}
                    />
                    <label htmlFor={`switch-${partner.id}`} className="text-[11px] text-muted-foreground cursor-pointer">
                      {partner.is_active ? "Ko'rsatilyapti" : "Yashirilgan"}
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenEdit(partner)}
                      className="size-8 rounded-lg hover:bg-primary/10 hover:text-primary cursor-pointer"
                      title="Tahrirlash"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPartnerToDelete(partner)}
                      className="size-8 rounded-lg hover:bg-red-500/10 hover:text-red-600 text-muted-foreground cursor-pointer"
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
      ) : (
        <Card className="rounded-3xl border-border bg-card overflow-hidden shadow-soft">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="w-16">Tartib</TableHead>
                <TableHead className="w-20">Logotip</TableHead>
                <TableHead>Kompaniya nomi</TableHead>
                <TableHead>Soha / Kategoriya</TableHead>
                <TableHead>Veb-sayt</TableHead>
                <TableHead className="w-28 text-center">Holat</TableHead>
                <TableHead className="w-24 text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id} className="hover:bg-muted/20">
                  <TableCell className="font-mono text-xs font-bold text-muted-foreground">
                    #{partner.sort_order}
                  </TableCell>
                  <TableCell>
                    <div className="size-12 rounded-xl bg-white p-1 flex items-center justify-center border border-black/10 overflow-hidden shadow-2xs">
                      <img src={partner.logo_url} alt={partner.name} className="size-10 object-contain" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-foreground">{partner.name}</div>
                    {partner.description && (
                      <div className="text-xs text-muted-foreground line-clamp-1">{partner.description}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      {partner.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {partner.website_url ? (
                      <a
                        href={partner.website_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <Globe className="size-3" /> Sayt <ExternalLink className="size-2.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Switch
                      checked={partner.is_active}
                      onCheckedChange={() => toggleActive({ id: partner.id, currentActive: partner.is_active })}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(partner)}
                        className="size-8 rounded-lg hover:bg-primary/10 hover:text-primary cursor-pointer"
                      >
                        <Edit2 className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setPartnerToDelete(partner)}
                        className="size-8 rounded-lg hover:bg-red-500/10 hover:text-red-600 text-muted-foreground cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Building2 className="size-5 text-primary" />
              <span>{editingPartner ? "Hamkor ma'lumotlarini tahrirlash" : "Yangi hamkor kompaniya qo'shish"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs">
              Kompaniya nomi, faoliyat sohasi, logotipi va veb-sayt havolasini kiriting
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {/* Logo Upload & Preview */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">Kompaniya logotipi</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Upload Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all bg-card"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/svg+xml"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-2">
                    <Upload className="size-5" />
                  </div>
                  <p className="text-xs font-bold text-foreground">Logotip faylini yuklash</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">PNG, JPG, WebP yoki SVG (Maks: 10MB)</p>
                </div>

                {/* Preview Box */}
                <div className="rounded-2xl border border-border bg-white p-3 flex flex-col items-center justify-center text-center min-h-[110px] relative">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-h-20 max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-muted-foreground flex flex-col items-center text-xs">
                      <ImageIcon className="size-8 opacity-30 mb-1 text-black" />
                      <span className="text-black/60">Logotip ko'rinishi</span>
                    </div>
                  )}
                  {logoPreview && (
                    <span className="absolute bottom-1.5 right-2 text-[9px] font-mono text-black/50">
                      Jonli ko'rinish
                    </span>
                  )}
                </div>
              </div>

              {/* Or Direct Image URL */}
              <div className="pt-1">
                <Label htmlFor="partner-logo-url" className="text-[11px] text-muted-foreground">
                  yoki logotip URL havolasi:
                </Label>
                <Input
                  id="partner-logo-url"
                  placeholder="https://example.com/logo.png yoki /partners/jahon-bobo.png"
                  value={form.logo_url}
                  onChange={(e) => {
                    setForm({ ...form, logo_url: e.target.value });
                    if (!selectedFile && e.target.value) {
                      setLogoPreview(e.target.value);
                    }
                  }}
                  className="h-9 rounded-xl text-xs mt-1"
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="space-y-1.5">
              <Label htmlFor="partner-name" className="text-xs font-semibold">
                Kompaniya / Brend nomi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="partner-name"
                placeholder="Masalan: Jahon Bobo Qandolatlari OK"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-10 rounded-xl"
              />
            </div>

            {/* Category / Industry */}
            <div className="space-y-1.5">
              <Label htmlFor="partner-category" className="text-xs font-semibold">
                Faoliyat sohasi / Kategoriya
              </Label>
              <Input
                id="partner-category"
                placeholder="Masalan: Oziq-ovqat va qandolatchilik"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="h-10 rounded-xl"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {COMMON_CATEGORIES.slice(0, 6).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setForm({ ...form, category: cat })}
                    className="text-[10px] rounded-lg px-2 py-0.5 bg-muted hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-muted-foreground"
                  >
                    + {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Website URL */}
            <div className="space-y-1.5">
              <Label htmlFor="partner-website" className="text-xs font-semibold">
                Veb-sayt yoki ijtimoiy tarmoq havolasi (ixtiyoriy)
              </Label>
              <Input
                id="partner-website"
                placeholder="https://example.uz"
                value={form.website_url}
                onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                className="h-10 rounded-xl"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label htmlFor="partner-description" className="text-xs font-semibold">
                Qisqacha tavsif (ixtiyoriy)
              </Label>
              <Textarea
                id="partner-description"
                placeholder="Ushbu kompaniya haqida qisqacha ma'lumot..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="rounded-xl text-xs resize-none"
              />
            </div>

            {/* Sort order & Active switch */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="partner-sort" className="text-xs font-semibold">
                  Tartib raqami
                </Label>
                <Input
                  id="partner-sort"
                  type="number"
                  min="1"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: parseInt(e.target.value, 10) || 1 })}
                  className="h-10 rounded-xl"
                />
              </div>

              <div className="flex flex-col justify-center space-y-1.5">
                <Label htmlFor="partner-active" className="text-xs font-semibold">
                  Saytda ko'rsatish
                </Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch
                    id="partner-active"
                    checked={form.is_active}
                    onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                  />
                  <span className="text-xs text-muted-foreground">
                    {form.is_active ? "Faol (ko'rinadi)" : "Nofaol (yashirin)"}
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer"
              >
                {isCreating || isUpdating ? (
                  <Loader2 className="size-4 animate-spin mr-2" />
                ) : (
                  <CheckCircle2 className="size-4 mr-2" />
                )}
                {editingPartner ? "O'zgarishlarni saqlash" : "Hamkorni qo'shish"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={!!partnerToDelete} onOpenChange={(open) => !open && setPartnerToDelete(null)}>
        <AlertDialogContent className="rounded-3xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-red-600 flex items-center gap-2">
              <Trash2 className="size-5" />
              <span>Hamkorni o'chirish</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Haqiqatan ham <strong className="text-foreground">{partnerToDelete?.name}</strong> kompaniyasini
              hamkorlar ro'yxatidan o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold cursor-pointer"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset to Defaults Alert */}
      <AlertDialog open={isResetConfirmOpen} onOpenChange={setIsResetConfirmOpen}>
        <AlertDialogContent className="rounded-3xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold flex items-center gap-2">
              <RotateCcw className="size-5 text-primary" />
              <span>Boshlang'ich holatga qaytarish</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Hamkorlar ro'yxatini yuklangan 5 ta asosiy brend (Jahon Bobo, Muzqaymoq-2, URG ISPANZA, UE, AT Group)
              holatiga qaytarsinmi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Yo'q, bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await resetToDefaults();
                setIsResetConfirmOpen(false);
              }}
              className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer"
            >
              Ha, qaytarish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
