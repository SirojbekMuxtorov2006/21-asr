import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface ArticleContentProps {
  content: string;
  className?: string;
}

/**
 * Parses and renders Markdown & HTML content safely:
 * - Headings (##, ###)
 * - Images (![alt](url) and <img src="..." />)
 * - Bold (**text**), Italic (*text*)
 * - Links ([text](url))
 * - Blockquotes (> quote)
 * - Lists (- item, 1. item)
 * - Paragraphs & linebreaks
 */
export function ArticleContent({ content, className }: ArticleContentProps) {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let isNumbered = false;

    function flushList() {
      if (currentList.length > 0) {
        if (isNumbered) {
          elements.push(
            <ol key={`ol-${elements.length}`} className="my-4 ml-6 list-decimal space-y-1.5 text-foreground/90 leading-relaxed">
              {currentList.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
              ))}
            </ol>
          );
        } else {
          elements.push(
            <ul key={`ul-${elements.length}`} className="my-4 ml-6 list-disc space-y-1.5 text-foreground/90 leading-relaxed">
              {currentList.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
              ))}
            </ul>
          );
        }
        currentList = [];
      }
    }

    function parseInline(text: string): string {
      return text
        // Bold
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Italic
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        // Links
        .replace(
          /\[(.*?)\]\((.*?)\)/g,
          '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary font-semibold underline underline-offset-4 hover:opacity-80 transition-opacity">$1</a>'
        );
    }

    for (let i = 0; i < lines.length; i++) {
      const line = (lines[i] ?? "").trim();

      // Empty line
      if (!line) {
        flushList();
        continue;
      }

      // Markdown image: ![alt](url)
      const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        flushList();
        const alt = imgMatch[1] || "Maqola rasmi";
        const src = imgMatch[2];
        elements.push(
          <figure key={`img-${i}`} className="my-6 space-y-2">
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-muted/20 shadow-md">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-auto max-h-[550px] object-cover transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
            {alt && alt !== "Maqola rasmi" && alt !== "rasm" && (
              <figcaption className="text-center text-xs text-muted-foreground italic">
                {alt}
              </figcaption>
            )}
          </figure>
        );
        continue;
      }

      // HTML Image tag: <img src="..." />
      if (line.startsWith("<img") || line.includes("<img ")) {
        flushList();
        elements.push(
          <div
            key={`raw-img-${i}`}
            className="my-6 overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 shadow-md [&_img]:w-full [&_img]:h-auto [&_img]:object-cover"
            dangerouslySetInnerHTML={{ __html: line }}
          />
        );
        continue;
      }

      // Heading 2: ## Title
      if (line.startsWith("## ")) {
        flushList();
        elements.push(
          <h2
            key={`h2-${i}`}
            className="mt-8 mb-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground border-b border-border/40 pb-2"
            dangerouslySetInnerHTML={{ __html: parseInline(line.replace("## ", "")) }}
          />
        );
        continue;
      }

      // Heading 3: ### Title
      if (line.startsWith("### ")) {
        flushList();
        elements.push(
          <h3
            key={`h3-${i}`}
            className="mt-6 mb-2 text-xl sm:text-2xl font-bold tracking-tight text-foreground"
            dangerouslySetInnerHTML={{ __html: parseInline(line.replace("### ", "")) }}
          />
        );
        continue;
      }

      // Blockquote: > Quote
      if (line.startsWith("> ")) {
        flushList();
        elements.push(
          <blockquote
            key={`quote-${i}`}
            className="my-5 border-l-4 border-primary pl-4 py-2 italic text-foreground/90 bg-primary/5 rounded-r-2xl text-base sm:text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: parseInline(line.replace(/^>\s*/, "")) }}
          />
        );
        continue;
      }

      // Bullet list item: - Item or * Item
      if (line.startsWith("- ") || line.startsWith("* ")) {
        if (isNumbered && currentList.length > 0) flushList();
        isNumbered = false;
        currentList.push(line.replace(/^[-*]\s+/, ""));
        continue;
      }

      // Numbered list item: 1. Item
      if (/^\d+\.\s+/.test(line)) {
        if (!isNumbered && currentList.length > 0) flushList();
        isNumbered = true;
        currentList.push(line.replace(/^\d+\.\s+/, ""));
        continue;
      }

      // Horizontal rule: --- or ***
      if (line === "---" || line === "***") {
        flushList();
        elements.push(<hr key={`hr-${i}`} className="my-8 border-border" />);
        continue;
      }

      // Regular Paragraph
      flushList();
      elements.push(
        <p
          key={`p-${i}`}
          className="my-3.5 text-base sm:text-lg leading-relaxed text-foreground/90"
          dangerouslySetInnerHTML={{ __html: parseInline(line) }}
        />
      );
    }

    flushList();
    return elements;
  }, [content]);

  return (
    <div className={cn("prose-content max-w-none break-words text-foreground", className)}>
      {renderedElements}
    </div>
  );
}
