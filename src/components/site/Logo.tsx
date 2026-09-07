import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import logo from "/logo.png";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        "flex items-center transition-all duration-300 hover:scale-105",
        className
      )}
    >
      <img
        src={logo}
        alt="21-ASR Raqamli Xizmatlar Markazi"
        className="h-14 w-auto object-contain"
        draggable={false}
      />
    </Link>
  );
}