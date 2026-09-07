import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export function DynamicIcon({ name, className }: { name?: string | null; className?: string }) {
  const set = Icons as unknown as Record<string, LucideIcon>;
  const Icon = (name && set[name]) || Icons.FileText;
  return <Icon className={className} aria-hidden />;
}
