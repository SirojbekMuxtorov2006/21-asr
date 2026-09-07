import { Send } from "lucide-react";

export function TelegramFab() {
  return (
    <a
      href="https://t.me/21asr"
      target="_blank"
      rel="noreferrer"
      aria-label="Telegram orqali yozish"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full gradient-primary text-primary-foreground shadow-elevated transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-glow active:scale-95"
    >
      <Send className="size-6 transition-transform duration-300 group-hover:rotate-12" />
    </a>
  );
}
