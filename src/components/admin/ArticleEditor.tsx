import { useState, useRef } from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Upload,
  Eye,
  Edit3,
  Columns,
  Loader2,
  Minus,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArticleContent } from "@/components/site/ArticleContent";
import { uploadImage, validateImageFile } from "@/lib/supabase";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ArticleEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export function ArticleEditor({
  value,
  onChange,
  placeholder = "Maqola matnini bu yerga yozing...",
  className,
}: ArticleEditorProps) {
  const [activeTab, setActiveTab] = useState<"write" | "preview" | "split">("write");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Helper to insert formatted text at current cursor position
  function insertAtCursor(before: string, after = "", defaultText = "") {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(value + before + defaultText + after);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end) || defaultText;

    const updated =
      value.substring(0, start) + before + selected + after + value.substring(end);

    onChange(updated);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selected.length
      );
    }, 50);
  }

  // Handle uploading and inserting image into the article body
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file, 10 * 1024 * 1024);
    if (!validation.ok) {
      toast.error(validation.error);
      return;
    }

    setIsUploadingImage(true);
    try {
      const { url } = await uploadImage("gallery-images", file, "news-body");
      const altName = file.name.replace(/\.[^/.]+$/, "") || "Rasm";
      
      // Insert markdown image into cursor position
      insertAtCursor(`\n\n![${altName}](`, `${url})\n\n`, "");
      toast.success("Rasm yuklandi va maqolaga qo'shildi!");
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Rasmni yuklashda xatolik yuz berdi");
    } finally {
      setIsUploadingImage(false);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
    }
  }

  // Insert image via external URL prompt
  function handleInsertImageUrl() {
    const url = window.prompt("Rasm URL manzilini kiriting (masalan: https://images.unsplash.com/...):");
    if (!url || !url.trim()) return;

    const cleanUrl = url.trim();
    insertAtCursor(`\n\n![Maqola rasmi](`, `${cleanUrl})\n\n`, "");
  }

  // Insert Link prompt
  function handleInsertLink() {
    const url = window.prompt("Havola URL manzilini kiriting (https://...):");
    if (!url || !url.trim()) return;

    const cleanUrl = url.trim();
    insertAtCursor("[", `](${cleanUrl})`, "Havola matni");
  }

  return (
    <div className={cn("rounded-2xl border border-border bg-card shadow-xs overflow-hidden", className)}>
      {/* Hidden file input for uploading images */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Editor Header / Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/40 p-2 sm:px-3">
        {/* Formatting Actions */}
        <div className="flex flex-wrap items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("**", "**", "Qalin matn")}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Qalin (Bold) - **matn**"
          >
            <Bold className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("*", "*", "Kursiv matn")}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Kursiv (Italic) - *matn*"
          >
            <Italic className="size-4" />
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("\n## ", "\n", "Katta sarlavha")}
            className="h-8 px-2 rounded-lg text-xs font-bold hover:bg-muted"
            title="Sarlavha H2 - ## Sarlavha"
          >
            <Heading2 className="size-4 mr-1" /> H2
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("\n### ", "\n", "Kichik sarlavha")}
            className="h-8 px-2 rounded-lg text-xs font-bold hover:bg-muted"
            title="Sarlavha H3 - ### Sarlavha"
          >
            <Heading3 className="size-4 mr-1" /> H3
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("\n- ", "\n", "Ro'yxat elementi")}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Ro'yxat - Band"
          >
            <List className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("\n1. ", "\n", "Birinchi band")}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Raqamli ro'yxat - 1. Band"
          >
            <ListOrdered className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("\n> ", "\n", "Muhim iqtibos yoki eslatma...")}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Iqtibos - > Matn"
          >
            <Quote className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleInsertLink}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Havola qo'yish"
          >
            <LinkIcon className="size-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => insertAtCursor("\n\n---\n\n", "", "")}
            className="h-8 w-8 p-0 rounded-lg hover:bg-muted"
            title="Gorizontal ajratuvchi chiziq"
          >
            <Minus className="size-4" />
          </Button>

          <div className="h-4 w-px bg-border mx-1" />

          {/* IMAGE UPLOAD BUTTONS */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={isUploadingImage}
            onClick={() => imageInputRef.current?.click()}
            className="h-8 px-2.5 rounded-lg text-xs font-semibold bg-background hover:bg-primary/10 hover:text-primary border-primary/30 text-primary cursor-pointer shadow-xs"
            title="Kompyuterdan rasm yuklash va matnga qo'yish"
          >
            {isUploadingImage ? (
              <Loader2 className="size-3.5 mr-1.5 animate-spin" />
            ) : (
              <Upload className="size-3.5 mr-1.5" />
            )}
            Rasm yuklash
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleInsertImageUrl}
            className="h-8 px-2 rounded-lg text-xs hover:bg-muted"
            title="Rasm URL havolasini qo'yish"
          >
            <ImageIcon className="size-3.5 mr-1" /> URL
          </Button>
        </div>

        {/* View Mode Toggle (Write / Preview / Split) */}
        <div className="flex items-center gap-1 bg-background/80 p-0.5 rounded-xl border border-border/60">
          <Button
            type="button"
            variant={activeTab === "write" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("write")}
            className="h-7 px-2.5 rounded-lg text-xs cursor-pointer"
          >
            <Edit3 className="size-3 mr-1" /> Tahrirlash
          </Button>

          <Button
            type="button"
            variant={activeTab === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("preview")}
            className="h-7 px-2.5 rounded-lg text-xs cursor-pointer"
          >
            <Eye className="size-3 mr-1" /> Ko'rish
          </Button>

          <Button
            type="button"
            variant={activeTab === "split" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("split")}
            className="h-7 px-2 rounded-lg text-xs hidden md:inline-flex cursor-pointer"
            title="Yonma-yon ko'rish"
          >
            <Columns className="size-3 mr-1" /> Split
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowHelp(!showHelp)}
            className="size-7 rounded-lg text-muted-foreground hover:text-foreground"
            title="Qo'llanma"
          >
            <HelpCircle className="size-3.5" />
          </Button>
        </div>
      </div>

      {/* Quick Markdown Help Box */}
      {showHelp && (
        <div className="bg-muted/30 border-b border-border p-3 text-xs text-muted-foreground grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div><code className="text-primary font-bold">## Sarlavha</code> — Katta sarlavha</div>
          <div><code className="text-primary font-bold">**qalin**</code> — Qalin matn</div>
          <div><code className="text-primary font-bold">![tavsif](url)</code> — Rasm qo'yish</div>
          <div><code className="text-primary font-bold">&gt; iqtibos</code> — Ajratilgan iqtibos</div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="relative">
        {/* WRITE MODE */}
        {activeTab === "write" && (
          <Textarea
            ref={textareaRef}
            rows={10}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[220px] w-full rounded-none border-0 p-4 font-mono text-sm leading-relaxed focus-visible:ring-0 resize-y bg-background"
          />
        )}

        {/* PREVIEW MODE */}
        {activeTab === "preview" && (
          <div className="min-h-[220px] max-h-[450px] overflow-y-auto p-5 bg-background">
            {value.trim() ? (
              <ArticleContent content={value} />
            ) : (
              <div className="flex h-36 items-center justify-center text-xs text-muted-foreground">
                Maqola matni kiritilmagan. Ko'rish uchun matn yozing.
              </div>
            )}
          </div>
        )}

        {/* SPLIT MODE */}
        {activeTab === "split" && (
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border min-h-[250px]">
            <Textarea
              ref={textareaRef}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="min-h-[250px] max-h-[450px] w-full rounded-none border-0 p-4 font-mono text-sm leading-relaxed focus-visible:ring-0 resize-none bg-background"
            />
            <div className="max-h-[450px] overflow-y-auto p-4 bg-muted/10">
              {value.trim() ? (
                <ArticleContent content={value} />
              ) : (
                <div className="flex h-36 items-center justify-center text-xs text-muted-foreground">
                  Natija bu yerda ko'rinadi
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between border-t border-border/80 bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
        <span>
          So'zlar soni: <strong className="text-foreground">{value.trim() ? value.trim().split(/\s+/).length : 0}</strong>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-emerald-500 inline-block" /> Markdown & HTML qo'llab-quvvatlanadi
        </span>
      </div>
    </div>
  );
}
