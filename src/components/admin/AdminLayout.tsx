import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ShoppingCart,
  Layers,
  Users,
  CreditCard,
  Newspaper,
  HelpCircle,
  Image as ImageIcon,
  Settings,
  Menu,
  X,
  LogOut,
  Globe,
  Sun,
  Moon,
  Bell,
  UserCheck,
  Sparkles,
  Handshake,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type AdminTab =
  | "dashboard"
  | "team"
  | "partners"
  | "services"
  | "gallery"
  | "orders"
  | "payments"
  | "users"
  | "news"
  | "faq_reviews"
  | "banners"
  | "settings";

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  pendingOrdersCount?: number;
  pendingReviewsCount?: number;
  children: ReactNode;
}

const navItems = [
  { id: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
  { id: "team" as AdminTab, label: "Jamoa", icon: Users },
  { id: "partners" as AdminTab, label: "Hamkorlar", icon: Handshake },
  { id: "services" as AdminTab, label: "Xizmatlar", icon: Layers },
  { id: "gallery" as AdminTab, label: "Galereya", icon: ImageIcon },
  { id: "orders" as AdminTab, label: "Buyurtmalar", icon: ShoppingCart, countKey: "orders" },
  { id: "payments" as AdminTab, label: "To'lovlar", icon: CreditCard },
  { id: "users" as AdminTab, label: "Mijozlar & Rollar", icon: UserCheck },
  { id: "news" as AdminTab, label: "Yangiliklar", icon: Newspaper },
  { id: "faq_reviews" as AdminTab, label: "FAQ & Sharhlar", icon: HelpCircle, countKey: "reviews" },
  { id: "banners" as AdminTab, label: "Bannerlar", icon: Sparkles },
  { id: "settings" as AdminTab, label: "Sozlamalar", icon: Settings },
];

export function AdminLayout({
  currentTab,
  onTabChange,
  pendingOrdersCount = 0,
  pendingReviewsCount = 0,
  children,
}: AdminLayoutProps) {
  const { user, roles, isStaff, logout } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleLogout() {
    await logout();
    toast.success("Tizimdan chiqildi");
    navigate({ to: "/auth", search: { redirect: undefined } });
  }

  const primaryRole = roles[0] || (isStaff ? "manager" : "admin");
  const roleLabels: Record<string, { label: string; color: string }> = {
    super_admin: { label: "Bosh Admin", color: "bg-red-500/10 text-red-500 border-red-500/20" },
    admin: { label: "Admin", color: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20" },
    manager: { label: "Menejer", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    employee: { label: "Xodim", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    customer: { label: "Mijoz", color: "bg-muted text-muted-foreground border-border" },
  };

  // `roleLabels` index signature bilan e'lon qilingan, shuning uchun bracket
  // notatsiyasi ishlatiladi va noma'lum rol uchun aniq zaxira qiymat beriladi.
  const currentRoleInfo = roleLabels[primaryRole] ??
    roleLabels["admin"] ?? { label: "Administrator", color: "" };

  return (
    <div className="flex min-h-screen bg-muted/20 text-foreground">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full",
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-20 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary tracking-wide">
              ADMIN
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* User Card */}
        <div className="mx-4 my-4 flex items-center gap-3 rounded-2xl border border-border/80 bg-muted/40 p-3">
          <Avatar className="size-10 border border-border shadow-xs">
            <AvatarFallback className="bg-primary/15 font-semibold text-primary">
              {user?.email?.slice(0, 2).toUpperCase() ?? "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {user?.user_metadata?.["full_name"] || user?.email?.split("@")[0] || "Administrator"}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Badge variant="outline" className={cn("text-[10px] px-1.5 py-0 h-4 border", currentRoleInfo.color)}>
                {currentRoleInfo.label}
              </Badge>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            const count =
              item.countKey === "orders"
                ? pendingOrdersCount
                : item.countKey === "reviews"
                  ? pendingReviewsCount
                  : 0;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setSidebarOpen(false);
                }}
                className={cn(
                  "group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={cn(
                      "size-4.5 transition-colors",
                      isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {count > 0 && (
                  <span
                    className={cn(
                      "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-bold",
                      isActive
                        ? "bg-white text-primary"
                        : "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-4 space-y-2">
          <Button
            asChild
            variant="outline"
            className="w-full justify-start gap-2 rounded-xl text-xs h-9 border-dashed"
          >
            <Link to="/" target="_blank">
              <Globe className="size-4 text-muted-foreground" />
              Asosiy saytga o'tish
            </Link>
          </Button>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-2 rounded-xl text-xs h-9 text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
          >
            <LogOut className="size-4" />
            Tizimdan chiqish
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-border bg-card/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="size-5" />
            </Button>

            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                {navItems.find((n) => n.id === currentTab)?.label ?? "Boshqaruv paneli"}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                21-ASR Raqamli Xizmatlar Markazi — boshqaruv tizimi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Dark / Light Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full size-9 cursor-pointer"
              onClick={toggle}
              aria-label="Rejimni o'zgartirish"
            >
              {theme === "dark" ? (
                <Sun className="size-4 text-yellow-400" />
              ) : (
                <Moon className="size-4 text-foreground" />
              )}
            </Button>

            {/* Notifications Button */}
            <Button
              variant="outline"
              size="icon"
              className="relative rounded-full size-9 cursor-pointer"
              onClick={() => onTabChange("orders")}
              aria-label="Bildirishnomalar"
            >
              <Bell className="size-4" />
              {pendingOrdersCount > 0 && (
                <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
                  {pendingOrdersCount}
                </span>
              )}
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card p-1 pr-3 transition-colors hover:bg-accent focus:outline-none cursor-pointer">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                      {user?.email?.slice(0, 2).toUpperCase() ?? "AD"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold max-w-[100px] truncate hidden md:inline-block">
                    {user?.user_metadata?.["full_name"] || user?.email?.split("@")[0] || "Admin"}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{user?.user_metadata?.["full_name"] || "Admin"}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onTabChange("settings")} className="cursor-pointer">
                  <Settings className="mr-2 size-4" /> Tizim sozlamalari
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onTabChange("users")} className="cursor-pointer">
                  <UserCheck className="mr-2 size-4" /> Xodimlar & Rollar
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/" target="_blank" className="cursor-pointer">
                    <Globe className="mr-2 size-4" /> Saytni ko'rish
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 size-4" /> Chiqish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
