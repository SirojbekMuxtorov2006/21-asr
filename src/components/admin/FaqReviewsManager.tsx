import { useState, useMemo } from "react";
import {
  HelpCircle,
  MessageSquare,
  Star,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Save,
  Loader2,
  AlertTriangle,
  Eye,
  Filter,
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
import { formatDate } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type FaqRow = Database["public"]["Tables"]["faq"]["Row"];
type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];

interface FaqReviewsManagerProps {
  faqList: FaqRow[];
  reviewsList: ReviewRow[];
  services: ServiceRow[];
  onRefresh: () => void;
}

export function FaqReviewsManager({
  faqList,
  reviewsList,
  services,
  onRefresh,
}: FaqReviewsManagerProps) {
  const [activeTab, setActiveTab] = useState<"faq" | "reviews">("faq");

  // FAQ state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqRow | null>(null);
  const [faqForm, setFaqForm] = useState({
    question: "",
    answer: "",
    category: "Umumiy",
    service_id: "",
    sort_order: 0,
    is_active: true,
  });
  const [isSavingFaq, setIsSavingFaq] = useState(false);
  const [faqToDelete, setFaqToDelete] = useState<FaqRow | null>(null);

  // Reviews state
  const [reviewFilter, setReviewFilter] = useState<string>("all");
  const [reviewToDelete, setReviewToDelete] = useState<ReviewRow | null>(null);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviewsList.filter((r) => {
      if (reviewFilter === "approved") return r.is_approved;
      if (reviewFilter === "pending") return !r.is_approved;
      return true;
    });
  }, [reviewsList, reviewFilter]);

  // Open FAQ Modal
  function openFaqModal(faq?: FaqRow) {
    if (faq) {
      setEditingFaq(faq);
      setFaqForm({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || "Umumiy",
        service_id: faq.service_id || "",
        sort_order: faq.sort_order || 0,
        is_active: faq.is_active,
      });
    } else {
      setEditingFaq(null);
      setFaqForm({
        question: "",
        answer: "",
        category: "Umumiy",
        service_id: "",
        sort_order: faqList.length + 1,
        is_active: true,
      });
    }
    setIsFaqModalOpen(true);
  }

  // Save FAQ
  async function handleSaveFaq(e: React.FormEvent) {
    e.preventDefault();
    if (!faqForm.question || !faqForm.answer) {
      toast.error("Savol va javob to'ldirilishi shart");
      return;
    }

    setIsSavingFaq(true);
    try {
      if (editingFaq) {
        const { error } = await supabase
          .from("faq")
          .update({
            question: faqForm.question,
            answer: faqForm.answer,
            category: faqForm.category,
            service_id: faqForm.service_id || null,
            sort_order: faqForm.sort_order,
            is_active: faqForm.is_active,
          })
          .eq("id", editingFaq.id);
        if (error) throw error;
        toast.success("Savol-javob tahrirlandi");
      } else {
        const { error } = await supabase.from("faq").insert({
          question: faqForm.question,
          answer: faqForm.answer,
          category: faqForm.category,
          service_id: faqForm.service_id || null,
          sort_order: faqForm.sort_order,
          is_active: faqForm.is_active,
        });
        if (error) throw error;
        toast.success("Yangi savol-javob qo'shildi");
      }

      setIsFaqModalOpen(false);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("FAQ saqlashda xatolik");
    } finally {
      setIsSavingFaq(false);
    }
  }

  // Delete FAQ
  async function handleDeleteFaq() {
    if (!faqToDelete) return;
    try {
      const { error } = await supabase.from("faq").delete().eq("id", faqToDelete.id);
      if (error) throw error;
      toast.success("FAQ o'chirildi");
      setFaqToDelete(null);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik");
    }
  }

  // Toggle review approval
  async function toggleReviewApproval(review: ReviewRow) {
    try {
      const nextVal = !review.is_approved;
      const { error } = await supabase
        .from("reviews")
        .update({ is_approved: nextVal })
        .eq("id", review.id);
      if (error) throw error;

      toast.success(nextVal ? "Sharh tasdiqlandi va saytda chiqadi" : "Sharh bekor qilindi");
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Sharhni yangilashda xatolik");
    }
  }

  // Delete review
  async function handleDeleteReview() {
    if (!reviewToDelete) return;
    try {
      const { error } = await supabase.from("reviews").delete().eq("id", reviewToDelete.id);
      if (error) throw error;
      toast.success("Sharh o'chirildi");
      setReviewToDelete(null);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik");
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "faq" | "reviews")}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <TabsList className="rounded-2xl p-1 bg-muted/60">
            <TabsTrigger value="faq" className="rounded-xl px-5 py-2">
              <HelpCircle className="size-4 mr-2" /> Ko'p beriladigan savollar ({faqList.length})
            </TabsTrigger>
            <TabsTrigger value="reviews" className="rounded-xl px-5 py-2">
              <MessageSquare className="size-4 mr-2" /> Mijozlar fikrlari ({reviewsList.length})
            </TabsTrigger>
          </TabsList>

          {activeTab === "faq" && (
            <Button
              onClick={() => openFaqModal()}
              className="rounded-2xl gradient-primary text-primary-foreground shadow-sm cursor-pointer"
            >
              <PlusCircle className="mr-2 size-4" /> Yangi savol-javob
            </Button>
          )}
        </div>

        {/* FAQ TAB */}
        <TabsContent value="faq" className="mt-6 space-y-6">
          <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
            <CardContent className="p-0">
              {faqList.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  <p className="text-base font-semibold">FAQ savollari mavjud emas</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow>
                        <TableHead className="font-bold">Savol & Javob</TableHead>
                        <TableHead className="font-bold">Kategoriya / Xizmat</TableHead>
                        <TableHead className="font-bold text-center">Tartib</TableHead>
                        <TableHead className="font-bold text-center">Faol</TableHead>
                        <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {faqList.map((faq) => {
                        const srv = services.find((s) => s.id === faq.service_id);
                        return (
                          <TableRow key={faq.id} className="hover:bg-muted/40 transition-colors">
                            <TableCell className="max-w-[340px]">
                              <p className="font-bold text-foreground">{faq.question}</p>
                              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                                {faq.answer}
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="text-xs">
                                {srv ? srv.name_uz : faq.category || "Umumiy"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-center font-mono text-xs">
                              {faq.sort_order}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  faq.is_active
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : "bg-muted text-muted-foreground"
                                )}
                              >
                                {faq.is_active ? "Faol" : "Yashirin"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right pr-6">
                              <div className="flex items-center justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                                  onClick={() => openFaqModal(faq)}
                                >
                                  <Edit2 className="size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                                  onClick={() => setFaqToDelete(faq)}
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

        {/* REVIEWS TAB */}
        <TabsContent value="reviews" className="mt-6 space-y-6">
          <Card className="rounded-3xl border-border/80 shadow-xs">
            <CardContent className="p-4 sm:p-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtrlash:</span>
                <Select value={reviewFilter} onValueChange={setReviewFilter}>
                  <SelectTrigger className="h-10 w-[180px] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="all">Barcha sharhlar</SelectItem>
                    <SelectItem value="approved">Tasdiqlanganlar</SelectItem>
                    <SelectItem value="pending">Tasdiq kutilayotganlar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
            <CardContent className="p-0">
              {filteredReviews.length === 0 ? (
                <div className="py-16 text-center text-muted-foreground">
                  <p className="text-base font-semibold">Sharhlar topilmadi</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-muted/40">
                      <TableRow>
                        <TableHead className="font-bold">Muallif</TableHead>
                        <TableHead className="font-bold">Reyting</TableHead>
                        <TableHead className="font-bold">Sharh matni</TableHead>
                        <TableHead className="font-bold">Sana</TableHead>
                        <TableHead className="font-bold text-center">Tasdiqlangan</TableHead>
                        <TableHead className="text-right font-bold pr-6">Amal</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReviews.map((rev) => (
                        <TableRow key={rev.id} className="hover:bg-muted/40 transition-colors">
                          <TableCell className="font-bold text-foreground whitespace-nowrap">
                            {rev.author_name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "size-3.5",
                                    i < rev.rating ? "fill-amber-400" : "text-muted-foreground/30"
                                  )}
                                />
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[320px] text-xs text-foreground">
                            "{rev.body}"
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(rev.created_at)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Switch
                              checked={rev.is_approved}
                              onCheckedChange={() => toggleReviewApproval(rev)}
                              className="cursor-pointer"
                            />
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                              onClick={() => setReviewToDelete(rev)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* CREATE / EDIT FAQ MODAL */}
      <Dialog open={isFaqModalOpen} onOpenChange={setIsFaqModalOpen}>
        <DialogContent className="rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingFaq ? "Savol-javobni tahrirlash" : "Yangi savol-javob qo'shish"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSaveFaq} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="faq-q">Savol *</Label>
              <Input
                id="faq-q"
                placeholder="Masalan: MCHJ ochish uchun qancha vaqt ketadi?"
                value={faqForm.question}
                onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                required
                className="rounded-xl font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="faq-a">Javob *</Label>
              <Textarea
                id="faq-a"
                rows={4}
                placeholder="Batafsil javobni kiriting..."
                value={faqForm.answer}
                onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                required
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="faq-cat">Kategoriya</Label>
                <Input
                  id="faq-cat"
                  placeholder="Umumiy / To'lov / Hujjatlar"
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="faq-sort">Tartib raqami</Label>
                <Input
                  id="faq-sort"
                  type="number"
                  value={faqForm.sort_order}
                  onChange={(e) => setFaqForm({ ...faqForm, sort_order: Number(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                id="faq-active"
                checked={faqForm.is_active}
                onCheckedChange={(v) => setFaqForm({ ...faqForm, is_active: v })}
              />
              <Label htmlFor="faq-active" className="cursor-pointer">
                Saytda faol ko'rsatish
              </Label>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFaqModalOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isSavingFaq}
                className="rounded-xl gradient-primary text-primary-foreground cursor-pointer"
              >
                {isSavingFaq ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                Saqlash
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete FAQ Confirmation */}
      <AlertDialog open={!!faqToDelete} onOpenChange={(open) => !open && setFaqToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Savol-javobni o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              Ushbu FAQ yozuvini o'chirishni tasdiqlaysizmi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFaq}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Review Confirmation */}
      <AlertDialog open={!!reviewToDelete} onOpenChange={(open) => !open && setReviewToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Sharhni o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{reviewToDelete?.author_name}" qoldirgan sharhni o'chirishni tasdiqlaysizmi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReview}
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
