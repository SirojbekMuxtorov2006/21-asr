import { useState } from "react";
import {
  Image as ImageIcon,
  PlusCircle,
  Edit2,
  Trash2,
  ExternalLink,
  Save,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type BannerRow = Database["public"]["Tables"]["banners"]["Row"];

interface BannersManagerProps {
  banners: BannerRow[];
  onRefresh: () => void;
}

export function BannersManager({ banners, onRefresh }: BannersManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerRow | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image_url: "",
    link: "",
    sort_order: 0,
    is_active: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState<BannerRow | null>(null);

  function openBannerModal(banner?: BannerRow) {
    if (banner) {
      setEditingBanner(banner);
      setBannerForm({
        title: banner.title,
        subtitle: banner.subtitle || "",
        image_url: banner.image_url || "",
        link: banner.link || "",
        sort_order: banner.sort_order || 0,
        is_active: banner.is_active,
      });
    } else {
      setEditingBanner(null);
      setBannerForm({
        title: "",
        subtitle: "",
        image_url: "",
        link: "",
        sort_order: banners.length + 1,
        is_active: true,
      });
    }
    setIsModalOpen(true);
  }

  async function handleSaveBanner(e: React.FormEvent) {
    e.preventDefault();
    if (!bannerForm.title) {
      toast.error("Banner sarlavhasi to'ldirilishi shart");
      return;
    }

    setIsSaving(true);
    try {
      if (editingBanner) {
        const { error } = await supabase
          .from("banners")
          .update({
            title: bannerForm.title,
            subtitle: bannerForm.subtitle,
            image_url: bannerForm.image_url || null,
            link: bannerForm.link || null,
            sort_order: bannerForm.sort_order,
            is_active: bannerForm.is_active,
          })
          .eq("id", editingBanner.id);
        if (error) throw error;
        toast.success("Banner tahrirlandi");
      } else {
        const { error } = await supabase.from("banners").insert({
          title: bannerForm.title,
          subtitle: bannerForm.subtitle,
          image_url: bannerForm.image_url || null,
          link: bannerForm.link || null,
          sort_order: bannerForm.sort_order,
          is_active: bannerForm.is_active,
        });
        if (error) throw error;
        toast.success("Yangi banner qo'shildi");
      }

      setIsModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Bannerni saqlashda xatolik");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDeleteBanner() {
    if (!bannerToDelete) return;
    try {
      const { error } = await supabase.from("banners").delete().eq("id", bannerToDelete.id);
      if (error) throw error;
      toast.success("Banner o'chirildi");
      setBannerToDelete(null);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Bosh sahifa bannerlari</h2>
          <p className="text-xs text-muted-foreground">
            Bosh sahifadagi aksiyalar, reklama va e'lonlar slayderi
          </p>
        </div>
        <Button
          onClick={() => openBannerModal()}
          className="rounded-2xl gradient-primary text-primary-foreground shadow-sm cursor-pointer"
        >
          <PlusCircle className="mr-2 size-4" /> Yangi banner
        </Button>
      </div>

      <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {banners.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-base font-semibold">Bannerlar mavjud emas</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="font-bold">Rasm & Sarlavha</TableHead>
                    <TableHead className="font-bold">Taglavha (Subtitle)</TableHead>
                    <TableHead className="font-bold">Havola (Link)</TableHead>
                    <TableHead className="font-bold text-center">Tartib</TableHead>
                    <TableHead className="font-bold text-center">Holat</TableHead>
                    <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners.map((b) => (
                    <TableRow key={b.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {b.image_url ? (
                            <img
                              src={b.image_url}
                              alt={b.title}
                              className="size-12 rounded-xl object-cover border border-border"
                            />
                          ) : (
                            <div className="size-12 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                              <ImageIcon className="size-5" />
                            </div>
                          )}
                          <span className="font-bold text-foreground">{b.title}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                        {b.subtitle}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {b.link ? (
                          <a
                            href={b.link}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-primary hover:underline"
                          >
                            <ExternalLink className="size-3" /> Ko'rish
                          </a>
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="text-center font-mono text-xs">
                        {b.sort_order}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            b.is_active
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {b.is_active ? "Faol" : "Nofaol"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                            onClick={() => openBannerModal(b)}
                          >
                            <Edit2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                            onClick={() => setBannerToDelete(b)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CREATE / EDIT BANNER MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingBanner ? "Bannerni tahrirlash" : "Yangi banner qo'shish"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveBanner} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="b-title">Sarlavha *</Label>
              <Input
                id="b-title"
                placeholder="Masalan: Yillik soliq hisoboti uchun 30% chegirma!"
                value={bannerForm.title}
                onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                required
                className="rounded-xl font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="b-sub">Taglavha (Subtitle)</Label>
              <Input
                id="b-sub"
                placeholder="Qisqacha izoh yoki da'vat"
                value={bannerForm.subtitle}
                onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="b-img">Rasm URL</Label>
              <Input
                id="b-img"
                placeholder="https://images.unsplash.com/..."
                value={bannerForm.image_url}
                onChange={(e) => setBannerForm({ ...bannerForm, image_url: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="b-link">Havola (Link)</Label>
                <Input
                  id="b-link"
                  placeholder="/services/soliq"
                  value={bannerForm.link}
                  onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="b-sort">Tartib raqami</Label>
                <Input
                  id="b-sort"
                  type="number"
                  value={bannerForm.sort_order}
                  onChange={(e) => setBannerForm({ ...bannerForm, sort_order: Number(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                id="b-active"
                checked={bannerForm.is_active}
                onCheckedChange={(v) => setBannerForm({ ...bannerForm, is_active: v })}
              />
              <Label htmlFor="b-active" className="cursor-pointer font-medium">
                Bosh sahifada faol ko'rsatish
              </Label>
            </div>

            <DialogFooter className="pt-4">
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
                disabled={isSaving}
                className="rounded-xl gradient-primary text-primary-foreground cursor-pointer"
              >
                {isSaving ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                Saqlash
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!bannerToDelete} onOpenChange={(open) => !open && setBannerToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Bannerni o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{bannerToDelete?.title}" bannerini o'chirishni tasdiqlaysizmi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteBanner}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
