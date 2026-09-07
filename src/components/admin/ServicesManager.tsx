import { useState, useMemo } from "react";
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  Eye,
  Save,
  Loader2,
  AlertTriangle,
  FolderPlus,
  FolderEdit,
  Tag,
  Star,
  Globe,
  DollarSign,
  Clock,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useServices, type ServiceRow, type CategoryRow } from "@/hooks/useServices";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ServicesManagerProps {
  services?: ServiceRow[];
  categories?: CategoryRow[];
  onRefresh?: () => void;
  isCreateOpen?: boolean;
  setIsCreateOpen?: (open: boolean) => void;
}

export function ServicesManager({
  services: propServices,
  categories: propCategories,
  onRefresh: propOnRefresh,
  isCreateOpen: propIsCreateOpen,
  setIsCreateOpen: propSetIsCreateOpen,
}: ServicesManagerProps) {
  const {
    services: hookServices,
    categories: hookCategories,
    isLoading,
    refetch,
    refetchCategories,
    createService,
    isCreating,
    updateService,
    isUpdating,
    deleteService,
    isDeleting,
    toggleActive,
    togglePopular,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useServices();

  const services = propServices && propServices.length > 0 ? propServices : hookServices;
  const categories = propCategories && propCategories.length > 0 ? propCategories : hookCategories;

  const [activeSubTab, setActiveSubTab] = useState<"services" | "categories">("services");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("all");

  // Internal create open state fallback
  const [internalCreateOpen, setInternalCreateOpen] = useState(false);
  const isCreateOpen = propIsCreateOpen !== undefined ? propIsCreateOpen : internalCreateOpen;
  const setIsCreateOpen = propSetIsCreateOpen || setInternalCreateOpen;

  // Service Edit / Create Modal State
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const [selectedServiceFile, setSelectedServiceFile] = useState<File | null>(null);
  const [serviceImagePreview, setServiceImagePreview] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    name_uz: "",
    name_ru: "",
    slug: "",
    category_id: "",
    price: 0,
    price_note: "",
    duration: "1-3 ish kuni",
    short_description: "",
    description: "",
    how_it_works: "",
    required_documents: [] as string[],
    icon: "FileText",
    image_url: "",
    is_active: true,
    is_popular: false,
    sort_order: 0,
    seo_title: "",
    seo_description: "",
  });
  const [docInput, setDocInput] = useState("");
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<ServiceRow | null>(null);

  // Category Edit / Create Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name_uz: "",
    name_ru: "",
    slug: "",
    icon: "Folder",
    description_uz: "",
    is_active: true,
    sort_order: 0,
  });
  const [isSavingCategory, setIsSavingCategory] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryRow | null>(null);

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchSearch =
        !searchTerm.trim() ||
        s.name_uz.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.name_ru && s.name_ru.toLowerCase().includes(searchTerm.toLowerCase())) ||
        s.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.short_description && s.short_description.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategoryFilter === "all" || s.category_id === selectedCategoryFilter;

      return matchSearch && matchCategory;
    });
  }, [services, searchTerm, selectedCategoryFilter]);

  // Open Service Modal for creation or edit
  function openServiceModal(service?: ServiceRow) {
    if (service) {
      setEditingService(service);
      setServiceForm({
        name_uz: service.name_uz,
        name_ru: service.name_ru || "",
        slug: service.slug,
        category_id: service.category_id || (categories[0]?.id ?? ""),
        price: service.price,
        price_note: service.price_note || "",
        duration: service.duration || "1-3 ish kuni",
        short_description: service.short_description || "",
        description: service.description || "",
        how_it_works: service.how_it_works || "",
        required_documents: service.required_documents || [],
        icon: service.icon || "FileText",
        image_url: service.image_url || "",
        is_active: service.is_active,
        is_popular: service.is_popular,
        sort_order: service.sort_order || 0,
        seo_title: service.seo_title || "",
        seo_description: service.seo_description || "",
      });
      setServiceImagePreview(service.image_url || null);
    } else {
      setEditingService(null);
      setServiceForm({
        name_uz: "",
        name_ru: "",
        slug: "",
        category_id: categories[0]?.id || "",
        price: 50000,
        price_note: "",
        duration: "1-3 ish kuni",
        short_description: "",
        description: "",
        how_it_works: "",
        required_documents: [],
        icon: "FileText",
        image_url: "",
        is_active: true,
        is_popular: false,
        sort_order: services.length + 1,
        seo_title: "",
        seo_description: "",
      });
      setServiceImagePreview(null);
    }
    setSelectedServiceFile(null);
    setDocInput("");
    setIsCreateOpen(true);
  }

  // Auto-generate slug from name_uz
  function handleNameUzChange(name: string) {
    setServiceForm((prev) => ({
      ...prev,
      name_uz: name,
      slug: prev.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));
  }

  // Add document tag
  function addDocTag() {
    if (!docInput.trim()) return;
    if (!serviceForm.required_documents.includes(docInput.trim())) {
      setServiceForm((prev) => ({
        ...prev,
        required_documents: [...prev.required_documents, docInput.trim()],
      }));
    }
    setDocInput("");
  }

  function removeDocTag(tag: string) {
    setServiceForm((prev) => ({
      ...prev,
      required_documents: prev.required_documents.filter((d) => d !== tag),
    }));
  }

  // Save Service handler
  async function handleSaveService(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceForm.name_uz.trim()) {
      toast.error("Xizmat nomini kiritish shart");
      return;
    }

    setIsSavingService(true);
    try {
      const safeSlug =
        serviceForm.slug.trim() ||
        serviceForm.name_uz
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") ||
        `xizmat-${Date.now()}`;

      const selectedCatId =
        serviceForm.category_id && serviceForm.category_id !== "all"
          ? serviceForm.category_id
          : categories[0]?.id || null;

      if (editingService) {
        await updateService({
          id: editingService.id,
          data: {
            name_uz: serviceForm.name_uz.trim(),
            name_ru: serviceForm.name_ru.trim() || "",
            slug: safeSlug,
            category_id: selectedCatId,
            price: Number(serviceForm.price) || 0,
            price_note: serviceForm.price_note.trim() || "",
            duration: serviceForm.duration.trim() || "1-3 ish kuni",
            short_description: serviceForm.short_description.trim() || "",
            description: serviceForm.description.trim() || "",
            how_it_works: serviceForm.how_it_works.trim() || "",
            required_documents: serviceForm.required_documents,
            icon: serviceForm.icon || "FileText",
            image_url: serviceForm.image_url || null,
            is_active: serviceForm.is_active,
            is_popular: serviceForm.is_popular,
            sort_order: Number(serviceForm.sort_order) || 0,
            seo_title: serviceForm.seo_title.trim() || "",
            seo_description: serviceForm.seo_description.trim() || "",
          },
          newImageFile: selectedServiceFile,
          oldImageUrl: editingService.image_url,
        });
      } else {
        await createService({
          data: {
            name_uz: serviceForm.name_uz.trim(),
            name_ru: serviceForm.name_ru.trim() || "",
            slug: safeSlug,
            category_id: selectedCatId,
            price: Number(serviceForm.price) || 0,
            price_note: serviceForm.price_note.trim() || "",
            duration: serviceForm.duration.trim() || "1-3 ish kuni",
            short_description: serviceForm.short_description.trim() || "",
            description: serviceForm.description.trim() || "",
            how_it_works: serviceForm.how_it_works.trim() || "",
            required_documents: serviceForm.required_documents,
            icon: serviceForm.icon || "FileText",
            image_url: serviceForm.image_url || null,
            is_active: serviceForm.is_active,
            is_popular: serviceForm.is_popular,
            sort_order: Number(serviceForm.sort_order) || 0,
            seo_title: serviceForm.seo_title.trim() || "",
            seo_description: serviceForm.seo_description.trim() || "",
          },
          imageFile: selectedServiceFile,
        });
      }

      setIsCreateOpen(false);
      if (propOnRefresh) propOnRefresh();
      refetch();
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSavingService(false);
    }
  }

  // Delete Service handler
  async function handleDeleteService() {
    if (!serviceToDelete) return;
    try {
      await deleteService({
        id: serviceToDelete.id,
        imageUrl: serviceToDelete.image_url,
      });
      setServiceToDelete(null);
      if (propOnRefresh) propOnRefresh();
      refetch();
    } catch (err) {
      console.error(err);
    }
  }

  // Open Category Modal
  function openCategoryModal(cat?: CategoryRow) {
    if (cat) {
      setEditingCategory(cat);
      setCategoryForm({
        name_uz: cat.name_uz,
        name_ru: cat.name_ru || "",
        slug: cat.slug,
        icon: cat.icon || "Folder",
        description_uz: cat.description_uz || "",
        is_active: cat.is_active,
        sort_order: cat.sort_order || 0,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name_uz: "",
        name_ru: "",
        slug: "",
        icon: "Folder",
        description_uz: "",
        is_active: true,
        sort_order: categories.length + 1,
      });
    }
    setIsCategoryModalOpen(true);
  }

  // Save Category handler
  async function handleSaveCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!categoryForm.name_uz.trim()) {
      toast.error("Kategoriya nomini kiritish shart");
      return;
    }

    setIsSavingCategory(true);
    try {
      const safeSlug =
        categoryForm.slug.trim() ||
        categoryForm.name_uz
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      if (editingCategory) {
        await updateCategory({
          id: editingCategory.id,
          data: {
            name_uz: categoryForm.name_uz.trim(),
            name_ru: categoryForm.name_ru.trim() || "",
            slug: safeSlug,
            icon: categoryForm.icon || "Folder",
            description_uz: categoryForm.description_uz.trim() || "",
            is_active: categoryForm.is_active,
            sort_order: Number(categoryForm.sort_order) || 0,
          },
        });
      } else {
        await createCategory({
          name_uz: categoryForm.name_uz.trim(),
          name_ru: categoryForm.name_ru.trim() || "",
          slug: safeSlug,
          icon: categoryForm.icon || "Folder",
          description_uz: categoryForm.description_uz.trim() || "",
          is_active: categoryForm.is_active,
          sort_order: Number(categoryForm.sort_order) || 0,
        });
      }

      setIsCategoryModalOpen(false);
      if (propOnRefresh) propOnRefresh();
      refetchCategories();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingCategory(false);
    }
  }

  // Delete Category handler
  async function handleDeleteCategory() {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryToDelete(null);
      if (propOnRefresh) propOnRefresh();
      refetchCategories();
    } catch (err) {
      console.error(err);
    }
  }

  const activeServicesCount = services.filter((s) => s.is_active).length;
  const popularServicesCount = services.filter((s) => s.is_popular).length;

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Jami xizmatlar</p>
              <h3 className="text-2xl font-black text-foreground mt-0.5">{services.length} ta</h3>
            </div>
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Saytda faol ko'rsatilayotgan</p>
              <h3 className="text-2xl font-black text-emerald-600 mt-0.5">{activeServicesCount} ta</h3>
            </div>
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border bg-card shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Ommabop xizmatlar (Top)</p>
              <h3 className="text-2xl font-black text-amber-500 mt-0.5">{popularServicesCount} ta</h3>
            </div>
            <div className="size-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Star className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sub tabs: Services / Categories */}
      <Tabs
        value={activeSubTab}
        onValueChange={(v) => setActiveSubTab(v as "services" | "categories")}
        className="w-full"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="rounded-2xl p-1 bg-muted/60">
            <TabsTrigger value="services" className="rounded-xl px-5 py-2">
              <Layers className="size-4 mr-2" /> Xizmatlar ({services.length})
            </TabsTrigger>
            <TabsTrigger value="categories" className="rounded-xl px-5 py-2">
              <FolderPlus className="size-4 mr-2" /> Bo'limlar & Kategoriyalar ({categories.length})
            </TabsTrigger>
          </TabsList>

          {activeSubTab === "services" ? (
            <Button
              onClick={() => openServiceModal()}
              className="rounded-2xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 cursor-pointer"
            >
              <PlusCircle className="mr-2 size-4" /> Yangi xizmat qo'shish
            </Button>
          ) : (
            <Button
              onClick={() => openCategoryModal()}
              className="rounded-2xl gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-95 cursor-pointer"
            >
              <FolderPlus className="mr-2 size-4" /> Yangi kategoriya
            </Button>
          )}
        </div>

        {/* SERVICES TAB */}
        <TabsContent value="services" className="mt-6 space-y-6">
          {/* Filter Bar */}
          <Card className="rounded-3xl border-border/80 shadow-xs">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Xizmat nomi yoki slug bo'yicha qidiruv..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-11 rounded-2xl pl-10 bg-background"
                  />
                </div>

                <Select
                  value={selectedCategoryFilter}
                  onValueChange={setSelectedCategoryFilter}
                >
                  <SelectTrigger className="h-11 w-full sm:w-[260px] rounded-2xl bg-background">
                    <SelectValue placeholder="Kategoriya bo'yicha" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl max-h-60">
                    <SelectItem value="all">Barcha kategoriyalar ({services.length})</SelectItem>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name_uz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Services Table */}
          <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
            <CardContent className="p-0">
              {filteredServices.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  <Layers className="size-12 mx-auto opacity-30 mb-3" />
                  <p className="text-base font-semibold">Xizmatlar topilmadi</p>
                  <p className="text-xs mt-1">Yangi xizmat qo'shishingiz yoki qidiruvni tozalashingiz mumkin.</p>
                  <Button onClick={() => openServiceModal()} size="sm" className="mt-4 rounded-xl gradient-primary">
                    <PlusCircle className="size-3.5 mr-1.5" /> Birinchi xizmatni qo'shish
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow>
                        <TableHead className="font-bold">Xizmat nomi</TableHead>
                        <TableHead className="font-bold">Kategoriya</TableHead>
                        <TableHead className="font-bold">Muddati</TableHead>
                        <TableHead className="font-bold text-center">Ommabop</TableHead>
                        <TableHead className="font-bold text-center">Faol</TableHead>
                        <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredServices.map((service) => {
                        const cat = categories.find((c) => c.id === service.category_id);
                        return (
                          <TableRow key={service.id} className="hover:bg-muted/40 transition-colors">
                            <TableCell>
                              <div>
                                <p className="font-bold text-foreground">{service.name_uz}</p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  {service.name_ru ? `${service.name_ru} • ` : ""}/{service.slug}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                {cat ? cat.name_uz : "Umumiy"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                              {service.duration || "1-3 ish kuni"}
                            </TableCell>
                            <TableCell className="text-center">
                              <button
                                onClick={() => togglePopular(service.id, service.is_popular)}
                                className="cursor-pointer p-1 rounded-lg hover:bg-amber-500/10 transition-colors"
                                title="Ommaboplikni almashtirish"
                              >
                                <Star
                                  className={cn(
                                    "size-5 mx-auto transition-colors",
                                    service.is_popular
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-muted-foreground/40 hover:text-amber-400"
                                  )}
                                />
                              </button>
                            </TableCell>
                            <TableCell className="text-center">
                              <Switch
                                checked={service.is_active}
                                onCheckedChange={() => toggleActive(service.id, service.is_active)}
                                className="cursor-pointer"
                              />
                            </TableCell>
                            <TableCell className="text-right pr-6">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary"
                                  onClick={() => openServiceModal(service)}
                                  title="Tahrirlash"
                                >
                                  <Edit2 className="size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                  onClick={() => setServiceToDelete(service)}
                                  title="O'chirish"
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* CATEGORIES TAB */}
        <TabsContent value="categories" className="mt-6 space-y-6">
          <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold">Xizmatlar kategoriyalari</CardTitle>
                <CardDescription>Saytdagi bo'limlar va katalog guruhlari</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="font-bold">Kategoriya nomi (UZ / RU)</TableHead>
                    <TableHead className="font-bold">Slug</TableHead>
                    <TableHead className="font-bold">Icon</TableHead>
                    <TableHead className="font-bold text-center">Xizmatlar soni</TableHead>
                    <TableHead className="font-bold text-center">Faol</TableHead>
                    <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((cat) => {
                    const servicesInCat = services.filter((s) => s.category_id === cat.id).length;
                    return (
                      <TableRow key={cat.id} className="hover:bg-muted/40 transition-colors">
                        <TableCell>
                          <p className="font-bold text-foreground">{cat.name_uz}</p>
                          {cat.name_ru && <p className="text-xs text-muted-foreground">{cat.name_ru}</p>}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground font-mono">
                          {cat.slug}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          <Badge variant="outline">{cat.icon || "Folder"}</Badge>
                        </TableCell>
                        <TableCell className="text-center font-bold text-primary">
                          {servicesInCat} ta
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              cat.is_active
                                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                : "bg-muted text-muted-foreground"
                            )}
                          >
                            {cat.is_active ? "Faol" : "Nofaol"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary"
                              onClick={() => openCategoryModal(cat)}
                              title="Tahrirlash"
                            >
                              <Edit2 className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                              onClick={() => setCategoryToDelete(cat)}
                              title="O'chirish"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CREATE / EDIT SERVICE DIALOG */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-black flex items-center gap-2">
              <Layers className="size-5 text-primary" />
              <span>{editingService ? "Xizmatni tahrirlash" : "Yangi xizmat qo'shish"}</span>
            </DialogTitle>
            <DialogDescription>
              Sayt katalogida ko'rinadigan barcha tafsilotlarni to'ldiring.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveService} className="space-y-4 pt-2">
            {/* Service Cover Image Upload */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-muted/40 border border-border">
              <div className="relative size-20 shrink-0 rounded-2xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-xs">
                {serviceImagePreview ? (
                  <img
                    src={serviceImagePreview}
                    alt="Service Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Layers className="size-8 text-muted-foreground/40" />
                )}
              </div>

              <div className="flex-1 space-y-1.5 text-center sm:text-left">
                <Label className="text-xs font-bold block">
                  Xizmat rasmi (Ixtiyoriy)
                </Label>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, WebP formatida rasm yuklang yoki bo'sh qoldiring.
                </p>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setSelectedServiceFile(file);
                      const reader = new FileReader();
                      reader.onload = () => setServiceImagePreview(reader.result as string);
                      reader.readAsDataURL(file);
                    }}
                    className="h-8 text-xs max-w-[220px] rounded-xl file:mr-2 file:py-0 file:px-2 file:rounded-lg file:border-0 file:text-xs file:bg-primary/10 file:text-primary cursor-pointer"
                  />
                  {serviceImagePreview && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedServiceFile(null);
                        setServiceImagePreview(null);
                        setServiceForm((prev) => ({ ...prev, image_url: "" }));
                      }}
                      className="h-8 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
                    >
                      O'chirish
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="srv-name-uz">Xizmat nomi (O'zbekcha) *</Label>
                <Input
                  id="srv-name-uz"
                  placeholder="Masalan: MCHJ ochish va ro'yxatdan o'tkazish"
                  value={serviceForm.name_uz}
                  onChange={(e) => handleNameUzChange(e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="srv-name-ru">Xizmat nomi (Ruscha)</Label>
                <Input
                  id="srv-name-ru"
                  placeholder="Masalan: Открытие и регистрация ООО"
                  value={serviceForm.name_ru}
                  onChange={(e) => setServiceForm({ ...serviceForm, name_ru: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="srv-slug">Slug (Havola) *</Label>
                <Input
                  id="srv-slug"
                  placeholder="mchj-ochish"
                  value={serviceForm.slug}
                  onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value })}
                  required
                  className="rounded-xl font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="srv-category">Kategoriya *</Label>
                <Select
                  value={serviceForm.category_id || categories[0]?.id || ""}
                  onValueChange={(v) => setServiceForm({ ...serviceForm, category_id: v })}
                >
                  <SelectTrigger id="srv-category" className="rounded-xl">
                    <SelectValue placeholder="Kategoriya tanlang" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl max-h-60">
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name_uz}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="srv-duration">Muddati</Label>
                <Input
                  id="srv-duration"
                  placeholder="1-3 ish kuni"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="srv-short-desc">Qisqa tavsif (Katalog kartochkasida chiqadi)</Label>
              <Textarea
                id="srv-short-desc"
                rows={2}
                placeholder="Xizmat haqida 1-2 jumlali umumiy ma'lumot..."
                value={serviceForm.short_description}
                onChange={(e) => setServiceForm({ ...serviceForm, short_description: e.target.value })}
                className="rounded-xl resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="srv-full-desc">To'liq tavsif (Sahifasida chiqadi)</Label>
              <Textarea
                id="srv-full-desc"
                rows={3}
                placeholder="Xizmatning batafsil jarayoni, afzalliklari..."
                value={serviceForm.description}
                onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                className="rounded-xl resize-none"
              />
            </div>

            {/* Required Documents Tag Editor */}
            <div className="space-y-2 rounded-2xl border border-border p-3.5 bg-muted/20">
              <Label className="text-xs font-bold">Talab qilinadigan hujjatlar ro'yxati</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Masalan: Pasport nusxasi"
                  value={docInput}
                  onChange={(e) => setDocInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addDocTag();
                    }
                  }}
                  className="rounded-xl"
                />
                <Button type="button" onClick={addDocTag} variant="outline" className="rounded-xl cursor-pointer">
                  Qo'shish
                </Button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {serviceForm.required_documents.map((doc) => (
                  <Badge key={doc} variant="secondary" className="rounded-lg pl-2.5 pr-1.5 py-1 gap-1.5">
                    <span>{doc}</span>
                    <button
                      type="button"
                      onClick={() => removeDocTag(doc)}
                      className="size-4 hover:bg-destructive/20 hover:text-destructive rounded-full flex items-center justify-center cursor-pointer font-bold"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Switches: Active & Popular */}
            <div className="flex items-center justify-between rounded-2xl border border-border p-4 bg-muted/10">
              <div className="flex items-center gap-3">
                <Switch
                  id="srv-active"
                  checked={serviceForm.is_active}
                  onCheckedChange={(v) => setServiceForm({ ...serviceForm, is_active: v })}
                  className="cursor-pointer"
                />
                <Label htmlFor="srv-active" className="cursor-pointer font-semibold text-xs sm:text-sm">
                  Saytda faol ko'rsatish
                </Label>
              </div>

              <div className="flex items-center gap-3">
                <Switch
                  id="srv-popular"
                  checked={serviceForm.is_popular}
                  onCheckedChange={(v) => setServiceForm({ ...serviceForm, is_popular: v })}
                  className="cursor-pointer"
                />
                <Label htmlFor="srv-popular" className="cursor-pointer font-semibold text-xs sm:text-sm">
                  Ommabop xizmatlar (Top)
                </Label>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isSavingService || isCreating || isUpdating}
                className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer shadow-glow"
              >
                {isSavingService || isCreating || isUpdating ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Save className="mr-2 size-4" />
                )}
                {editingService ? "O'zgarishlarni saqlash" : "Xizmatni saqlash"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CREATE / EDIT CATEGORY DIALOG */}
      <Dialog open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <FolderPlus className="size-5 text-primary" />
              <span>{editingCategory ? "Kategoriyani tahrirlash" : "Yangi kategoriya qo'shish"}</span>
            </DialogTitle>
            <DialogDescription>
              Xizmatlar guruhini shakllantiring.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveCategory} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="cat-name-uz">Kategoriya nomi (O'zbekcha) *</Label>
              <Input
                id="cat-name-uz"
                placeholder="Masalan: Biznes va Kompaniyalar"
                value={categoryForm.name_uz}
                onChange={(e) =>
                  setCategoryForm({
                    ...categoryForm,
                    name_uz: e.target.value,
                    slug: categoryForm.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                  })
                }
                required
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cat-name-ru">Kategoriya nomi (Ruscha)</Label>
              <Input
                id="cat-name-ru"
                placeholder="Masalan: Бизнес и Компании"
                value={categoryForm.name_ru}
                onChange={(e) => setCategoryForm({ ...categoryForm, name_ru: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="cat-slug">Slug *</Label>
                <Input
                  id="cat-slug"
                  placeholder="biznes"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                  required
                  className="rounded-xl font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="cat-icon">Icon nomi</Label>
                <Input
                  id="cat-icon"
                  placeholder="Briefcase / Building"
                  value={categoryForm.icon}
                  onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="cat-desc">Kategoriya tavsifi</Label>
              <Textarea
                id="cat-desc"
                rows={2}
                placeholder="Bo'lim haqida qisqa ma'lumot..."
                value={categoryForm.description_uz}
                onChange={(e) => setCategoryForm({ ...categoryForm, description_uz: e.target.value })}
                className="rounded-xl resize-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Switch
                id="cat-active"
                checked={categoryForm.is_active}
                onCheckedChange={(v) => setCategoryForm({ ...categoryForm, is_active: v })}
                className="cursor-pointer"
              />
              <Label htmlFor="cat-active" className="cursor-pointer text-xs font-semibold">
                Sayt menyusida faol ko'rsatish
              </Label>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCategoryModalOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isSavingCategory}
                className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer shadow-glow"
              >
                {isSavingCategory ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Saqlash
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Service Confirmation */}
      <AlertDialog open={!!serviceToDelete} onOpenChange={(open) => !open && setServiceToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Xizmatni o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{serviceToDelete?.name_uz}" xizmatini o'chirishni tasdiqlaysizmi? Ushbu amal xizmatni katalogdan olib tashlaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteService}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl cursor-pointer"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Category Confirmation */}
      <AlertDialog open={!!categoryToDelete} onOpenChange={(open) => !open && setCategoryToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Kategoriyani o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{categoryToDelete?.name_uz}" kategoriyasini o'chirmoqchimisiz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteCategory}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl cursor-pointer"
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
