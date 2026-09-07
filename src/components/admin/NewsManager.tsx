import { useState, useMemo, useRef } from "react";
import {
  Search,
  PlusCircle,
  Edit2,
  Trash2,
  Newspaper,
  Eye,
  Calendar,
  Save,
  Loader2,
  AlertTriangle,
  ExternalLink,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArticleEditor } from "./ArticleEditor";
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
import { formatDate } from "@/lib/format";
import { supabase, uploadImage, deleteImage } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type NewsRow = Database["public"]["Tables"]["news"]["Row"];

interface NewsManagerProps {
  news: NewsRow[];
  onRefresh: () => void;
}

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[ʻʼ`'"]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function NewsManager({ news, onRefresh }: NewsManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsRow | null>(null);

  const [newsForm, setNewsForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    body: "",
    cover_url: "",
    is_published: true,
    published_at: new Date().toISOString().slice(0, 10),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsRow | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered news
  const filteredNews = useMemo(() => {
    return news.filter((n) => {
      const matchSearch =
        !searchTerm.trim() ||
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [news, searchTerm]);

  // Open Modal
  function openNewsModal(article?: NewsRow) {
    if (article) {
      setEditingArticle(article);
      setNewsForm({
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt || "",
        body: article.body || "",
        cover_url: article.cover_url || "",
        is_published: article.is_published,
        published_at: article.published_at ? article.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
      });
      setImagePreview(article.cover_url || null);
    } else {
      setEditingArticle(null);
      setNewsForm({
        title: "",
        slug: "",
        excerpt: "",
        body: "",
        cover_url: "",
        is_published: true,
        published_at: new Date().toISOString().slice(0, 10),
      });
      setImagePreview(null);
    }
    setSelectedFile(null);
    setIsCreateOpen(true);
  }

  // Handle title change and auto slug
  function handleTitleChange(title: string) {
    setNewsForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug ? prev.slug : generateSlug(title),
    }));
  }

  // Handle file selection
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Rasm hajmi 10 MB dan oshmasligi kerak");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Save Article
  async function handleSaveNews(e: React.FormEvent) {
    e.preventDefault();
    if (!newsForm.title.trim()) {
      toast.error("Sarlavha kiritilishi shart");
      return;
    }

    const safeSlug = generateSlug(newsForm.slug || newsForm.title) || `maqola-${Date.now()}`;
    const publishedIso = newsForm.published_at
      ? new Date(newsForm.published_at).toISOString()
      : new Date().toISOString();

    setIsSaving(true);
    try {
      let finalCoverUrl = newsForm.cover_url.trim() || null;

      // Upload image to Storage if selected
      if (selectedFile) {
        const uploadRes = await uploadImage("gallery-images", selectedFile, "news");
        finalCoverUrl = uploadRes.url;

        // Clean up old image if replaced
        if (editingArticle?.cover_url && editingArticle.cover_url !== finalCoverUrl) {
          await deleteImage("gallery-images", editingArticle.cover_url);
        }
      }

      if (editingArticle) {
        const { error } = await supabase
          .from("news")
          .update({
            title: newsForm.title.trim(),
            slug: safeSlug,
            excerpt: newsForm.excerpt.trim(),
            body: newsForm.body.trim(),
            cover_url: finalCoverUrl,
            is_published: newsForm.is_published,
            published_at: publishedIso,
          })
          .eq("id", editingArticle.id);

        if (error) throw error;
        toast.success("Yangilik muvaffaqiyatli tahrirlandi");
      } else {
        const { error } = await supabase.from("news").insert({
          title: newsForm.title.trim(),
          slug: safeSlug,
          excerpt: newsForm.excerpt.trim(),
          body: newsForm.body.trim(),
          cover_url: finalCoverUrl,
          is_published: newsForm.is_published,
          published_at: publishedIso,
        });

        if (error) throw error;
        toast.success("Yangi maqola e'lon qilindi");
      }

      setIsCreateOpen(false);
      onRefresh();
    } catch (err: any) {
      console.error("Save news error:", err);
      toast.error(err?.message || "Yangilikni saqlashda xatolik yuz berdi");
    } finally {
      setIsSaving(false);
    }
  }

  // Delete Article
  async function handleDeleteNews() {
    if (!articleToDelete) return;
    try {
      if (articleToDelete.cover_url) {
        await deleteImage("gallery-images", articleToDelete.cover_url);
      }

      const { error } = await supabase.from("news").delete().eq("id", articleToDelete.id);
      if (error) throw error;
      toast.success("Maqola o'chirildi");
      setArticleToDelete(null);
      onRefresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "O'chirishda xatolik yuz berdi");
    }
  }

  // Toggle publish status
  async function togglePublish(article: NewsRow, current: boolean) {
    try {
      const { error } = await supabase
        .from("news")
        .update({ is_published: !current })
        .eq("id", article.id);
      if (error) throw error;
      toast.success(!current ? "Maqola e'lon qilindi" : "Maqola qoralamaga olindi");
      onRefresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Holatni yangilashda xatolik");
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Action */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Maqola sarlavhasi yoki mavzusi bo'yicha qidiruv..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-2xl pl-10 bg-background"
              />
            </div>

            <Button
              onClick={() => openNewsModal()}
              className="h-11 rounded-2xl gradient-primary text-primary-foreground shadow-sm cursor-pointer"
            >
              <PlusCircle className="mr-2 size-4" /> Yangi maqola
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* News Table */}
      <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg font-bold">Yangiliklar va Maqolalar</CardTitle>
            <CardDescription>Jami {filteredNews.length} ta maqola</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredNews.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-base font-semibold">Maqolalar mavjud emas</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="font-bold">Sarlavha</TableHead>
                    <TableHead className="font-bold">Slug</TableHead>
                    <TableHead className="font-bold">Sana</TableHead>
                    <TableHead className="font-bold text-center">Holat</TableHead>
                    <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNews.map((item) => (
                    <TableRow key={item.id} className="hover:bg-muted/40 transition-colors">
                      <TableCell className="max-w-[280px]">
                        <p className="font-bold text-foreground truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{item.excerpt}</p>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {item.slug}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(item.published_at || item.created_at)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs font-semibold px-2.5 py-0.5 cursor-pointer",
                            item.is_published
                              ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                              : "bg-muted text-muted-foreground"
                          )}
                          onClick={() => togglePublish(item, item.is_published)}
                        >
                          {item.is_published ? "Nashr qilingan" : "Qoralama"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            asChild
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                          >
                            <a href={`/news/${item.slug}`} target="_blank" rel="noreferrer">
                              <Eye className="size-4" />
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                            onClick={() => openNewsModal(item)}
                          >
                            <Edit2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                            onClick={() => setArticleToDelete(item)}
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

      {/* CREATE / EDIT NEWS MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingArticle ? "Maqolani tahrirlash" : "Yangi maqola yozish"}
            </DialogTitle>
            <DialogDescription>
              Foydali qo'llanma, qonunchilik yangiliklari yoki markaz yangiliklari.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveNews} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="news-title">Sarlavha *</Label>
              <Input
                id="news-title"
                placeholder="Masalan: 2026-yilda yangi tadbirkorlar uchun imtiyozlar"
                value={newsForm.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
                className="rounded-xl font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="news-slug" className="text-xs font-semibold">
                  Slug (URL havola)
                </Label>
                <Input
                  id="news-slug"
                  placeholder="tadbirkorlar-uchun-imtiyozlar"
                  value={newsForm.slug}
                  onChange={(e) => setNewsForm({ ...newsForm, slug: generateSlug(e.target.value) })}
                  className="rounded-xl font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="news-date" className="text-xs font-semibold">
                  Nashr sanasi
                </Label>
                <Input
                  id="news-date"
                  type="date"
                  value={newsForm.published_at}
                  onChange={(e) => setNewsForm({ ...newsForm, published_at: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Cover Image Upload Area */}
            <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-3">
              <Label className="text-xs font-semibold block">Muqova rasmi (Cover Image)</Label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative size-20 shrink-0 rounded-2xl overflow-hidden border border-border bg-card flex items-center justify-center shadow-xs">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Cover Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-8 text-muted-foreground/40" />
                  )}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="rounded-xl h-8 text-xs cursor-pointer"
                    >
                      <Upload className="mr-2 size-3.5" />
                      {imagePreview ? "Rasmni almashtirish" : "Kompyuterdan rasm yuklash"}
                    </Button>
                    {imagePreview && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedFile(null);
                          setImagePreview(null);
                          setNewsForm((prev) => ({ ...prev, cover_url: "" }));
                        }}
                        className="h-8 text-xs text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        O'chirish
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="yoki rasm URL manzilini kiriting: https://images.unsplash.com/..."
                    value={newsForm.cover_url}
                    onChange={(e) => {
                      setNewsForm({ ...newsForm, cover_url: e.target.value });
                      if (!selectedFile) setImagePreview(e.target.value || null);
                    }}
                    className="h-8 rounded-xl text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="news-excerpt">Qisqa mazmun (Excerpt)</Label>
              <Textarea
                id="news-excerpt"
                rows={2}
                placeholder="Maqolaning qisqacha mazmuni..."
                value={newsForm.excerpt}
                onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                className="rounded-xl"
              />
            </div>

            {/* Rich Article Body Editor with formatting toolbar & image upload */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">
                Asosiy maqola matni (Markdown / HTML va rasmlar)
              </Label>
              <ArticleEditor
                value={newsForm.body}
                onChange={(val) => setNewsForm({ ...newsForm, body: val })}
                placeholder="Maqola matnini bu yerga yozing. Matn ichiga rasm qo'yish uchun yuqoridagi 'Rasm yuklash' tugmasidan foydalaning..."
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Switch
                id="news-publish-status"
                checked={newsForm.is_published}
                onCheckedChange={(v) => setNewsForm({ ...newsForm, is_published: v })}
              />
              <Label htmlFor="news-publish-status" className="cursor-pointer font-medium">
                Saytda e'lon qilish (Nashr etish)
              </Label>
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
      <AlertDialog open={!!articleToDelete} onOpenChange={(open) => !open && setArticleToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Maqolani o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              "{articleToDelete?.title}" maqolasini o'chirishni tasdiqlaysizmi?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteNews}
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
