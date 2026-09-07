import { supabase } from "@/integrations/supabase/client";

export { supabase };

/**
 * Validates an image file's type and size
 */
export function validateImageFile(
  file: File,
  maxSizeBytes = 10 * 1024 * 1024
): { ok: boolean; error?: string } {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/jpg", "image/gif"];
  if (!allowed.includes(file.type.toLowerCase())) {
    return { ok: false, error: "Faqat JPG, PNG, WebP, GIF yoki SVG formatidagi rasmlar qabul qilinadi" };
  }
  if (file.size > maxSizeBytes) {
    const mb = Math.round(maxSizeBytes / (1024 * 1024));
    return { ok: false, error: `Rasm hajmi ${mb} MB dan oshmasligi kerak` };
  }
  return { ok: true };
}

/**
 * Compress an image file to a lightweight WebP data URL fallback
 */
async function fileToCompressedDataUrl(file: File, maxWidth = 800, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Window is not defined"));
      return;
    }
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/webp", quality);
        resolve(dataUrl);
      };
      img.onerror = () => resolve(readerEvent.target?.result as string);
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload an image file to a Supabase Storage bucket and return its public URL.
 * Automatically falls back to high-performance compressed WebP data URL if bucket is missing or restricted.
 * @param bucket 'team-images' | 'service-images' | 'gallery-images' | 'documents'
 * @param file File object from input
 * @param pathPrefix optional subfolder or prefix
 */
export async function uploadImage(
  bucket: "team-images" | "service-images" | "gallery-images" | "documents" | string,
  file: File,
  pathPrefix = ""
): Promise<{ url: string; path: string }> {
  try {
    const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const rawClean = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 30);
    const cleanName = rawClean || "avatar";
    const fileName = `${pathPrefix ? `${pathPrefix}/` : ""}${Date.now()}-${cleanName}.${fileExt}`;

    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: "3600",
      upsert: true,
    });

    if (!error && data?.path) {
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);
      return { url: publicUrl, path: data.path };
    }

    console.warn(
      `[Supabase Storage] Storage upload to "${bucket}" had issue, using optimized data URL fallback:`,
      error
    );
  } catch (err) {
    console.warn(`[Supabase Storage] Exception during upload to "${bucket}", using fallback:`, err);
  }

  // Fallback to compressed WebP data URL so admin operations never fail
  const fallbackDataUrl = await fileToCompressedDataUrl(file);
  return { url: fallbackDataUrl, path: "fallback-data-url" };
}

/**
 * Delete an image file from a Supabase Storage bucket given its public URL or path.
 * @param bucket 'team-images' | 'service-images' | 'gallery-images' | 'documents'
 * @param urlOrPath Full public URL or relative path inside bucket
 */
export async function deleteImage(
  bucket: "team-images" | "service-images" | "gallery-images" | "documents" | string,
  urlOrPath: string
): Promise<boolean> {
  if (!urlOrPath) return false;

  // Don't attempt to delete data URLs or external URLs from storage
  if (urlOrPath.startsWith("data:") || urlOrPath.startsWith("blob:")) {
    return true;
  }

  try {
    let filePath = urlOrPath;

    // If it's a full URL, extract the path after bucket name
    if (urlOrPath.startsWith("http://") || urlOrPath.startsWith("https://")) {
      const parts = urlOrPath.split(`/storage/v1/object/public/${bucket}/`);
      if (parts.length > 1 && parts[1]) {
        filePath = decodeURIComponent(parts[1]);
      } else {
        // External URL (e.g. Unsplash), no need to delete from Supabase storage
        return true;
      }
    }

    const { error } = await supabase.storage.from(bucket).remove([filePath]);
    if (error) {
      console.warn(`[Supabase Storage] Failed to delete file ${filePath} from ${bucket}:`, error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn(`[Supabase Storage] Error deleting image from ${bucket}:`, err);
    return false;
  }
}
