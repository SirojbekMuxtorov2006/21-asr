import { useState, useEffect } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ShieldAlert,
  Loader2,
  Lock,
  ArrowLeft,
  UserCheck,
  KeyRound,
  Mail,
} from "lucide-react";
import { useAuth, verifyAdminCredentials } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout, type AdminTab } from "@/components/admin/AdminLayout";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { TeamManager } from "@/components/admin/TeamManager";
import { PartnersManager } from "@/components/admin/PartnersManager";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { OrdersManager } from "@/components/admin/OrdersManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { PaymentsManager } from "@/components/admin/PaymentsManager";
import { UsersManager } from "@/components/admin/UsersManager";
import { NewsManager } from "@/components/admin/NewsManager";
import { FaqReviewsManager } from "@/components/admin/FaqReviewsManager";
import { BannersManager } from "@/components/admin/BannersManager";
import { SettingsManager } from "@/components/admin/SettingsManager";
import { Logo } from "@/components/site/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ALL_CATEGORIES_DATA, ALL_SERVICES_DATA } from "@/data/allServices";
import { mergeServices, mergeCategories } from "@/hooks/useServices";
import { mergeGallery } from "@/hooks/useGallery";
import type { Database } from "@/integrations/supabase/types";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type CategoryRow = Database["public"]["Tables"]["categories"]["Row"];
type GalleryRow = Database["public"]["Tables"]["gallery"]["Row"];

type AdminSearchParams = {
  tab?: string;
  order_id?: string;
};

export const Route = createFileRoute("/admin")({
  validateSearch: (search: Record<string, unknown>): AdminSearchParams => ({
    tab: typeof search["tab"] === "string" ? search["tab"] : "dashboard",
    // `exactOptionalPropertyTypes` yoqilgan — maydonni faqat mavjud bo'lsa qo'shamiz
    ...(typeof search["order_id"] === "string" ? { order_id: search["order_id"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Boshqaruv Paneli (Admin) | 21-ASR" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { user, roles, isStaff, isAdmin, loading: authLoading, loginAsDirectAdmin } = useAuth();
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const queryClient = useQueryClient();

  const currentTab = (search.tab || "dashboard") as AdminTab;
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [isOrderCreateOpen, setIsOrderCreateOpen] = useState(false);
  const [isServiceCreateOpen, setIsServiceCreateOpen] = useState(false);
  const [isGrantingRole, setIsGrantingRole] = useState(false);

  // In-place admin auth form state
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authSubmitting, setAuthSubmitting] = useState(false);

  function handleTabChange(tab: AdminTab) {
    navigate({ search: { tab } });
  }

  // Strict Admin Sign-In Handler with cryptographic verification
  async function handleAdminSignIn(e: React.FormEvent) {
    e.preventDefault();
    const email = authForm.email.trim().toLowerCase();
    const password = authForm.password;

    if (!email || !password) {
      toast.error("Email va parolni kiriting");
      return;
    }

    setAuthSubmitting(true);
    try {
      const verification = await verifyAdminCredentials(email, password);

      if (!verification.ok) {
        toast.error(verification.error || "Kirishda xatolik yuz berdi");
        return;
      }

      // Log in as authorized admin
      loginAsDirectAdmin(email, verification.role!, verification.name);

      // Attempt background Supabase auth session if available
      try {
        await supabase.auth.signInWithPassword({ email, password });
      } catch (e) {}

      toast.success(`Xush kelibsiz, ${verification.name}! Tizimga muvaffaqiyatli kirdingiz.`);
      refreshAll();
    } catch (err: any) {
      toast.error(err?.message || "Tizimga kirishda xatolik yuz berdi");
    } finally {
      setAuthSubmitting(false);
    }
  }

  // 1. Fetch Orders
  const { data: orders = [], refetch: refetchOrders } = useQuery({
    queryKey: ["admin_orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // 2. Fetch Services
  const { data: services = [], refetch: refetchServices } = useQuery({
    queryKey: ["admin_services"],
    queryFn: async () => {
      let dbData: ServiceRow[] = [];
      try {
        const { data, error } = await supabase
          .from("services")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data) dbData = data;
      } catch (e) {}
      return mergeServices(dbData);
    },
  });

  // 3. Fetch Categories
  const { data: categories = [], refetch: refetchCategories } = useQuery({
    queryKey: ["admin_categories"],
    queryFn: async () => {
      let dbData: CategoryRow[] = [];
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data) dbData = data;
      } catch (e) {}
      return mergeCategories(dbData);
    },
  });

  // 4. Fetch Payments
  const { data: payments = [], refetch: refetchPayments } = useQuery({
    queryKey: ["admin_payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // 5. Fetch Profiles & User Roles
  const { data: profiles = [], refetch: refetchProfiles } = useQuery({
    queryKey: ["admin_profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: userRoles = [], refetch: refetchUserRoles } = useQuery({
    queryKey: ["admin_user_roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("*");
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // 6. Fetch News
  const { data: news = [], refetch: refetchNews } = useQuery({
    queryKey: ["admin_news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // 7. Fetch FAQ
  const { data: faq = [], refetch: refetchFaq } = useQuery({
    queryKey: ["admin_faq"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faq")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // 8. Fetch Reviews
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ["admin_reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // 9. Fetch Banners
  const { data: banners = [], refetch: refetchBanners } = useQuery({
    queryKey: ["admin_banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banners")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // 10. Fetch Settings
  const { data: settings = {}, refetch: refetchSettings } = useQuery({
    queryKey: ["admin_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("settings").select("*");
      if (error) throw error;
      const map: Record<string, Record<string, any>> = {};
      for (const row of data || []) {
        map[row.key] = (row.value ?? {}) as Record<string, any>;
      }
      return map;
    },
  });

  // 11. Fetch Team Members
  const { data: teamMembers = [], refetch: refetchTeam } = useQuery({
    queryKey: ["admin_team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  // 12. Fetch Gallery Items
  const { data: galleryItems = [], refetch: refetchGallery } = useQuery({
    queryKey: ["admin_gallery_items"],
    queryFn: async () => {
      let dbData: GalleryRow[] = [];
      try {
        const { data, error } = await supabase
          .from("gallery")
          .select("*")
          .order("sort_order", { ascending: true });
        if (!error && data) dbData = data;
      } catch (e) {}
      return mergeGallery(dbData);
    },
  });

  function refreshAll() {
    refetchOrders();
    refetchServices();
    refetchCategories();
    refetchPayments();
    refetchProfiles();
    refetchUserRoles();
    refetchNews();
    refetchFaq();
    refetchReviews();
    refetchBanners();
    refetchSettings();
    refetchTeam();
    refetchGallery();
  }

  // Handle direct order link from search param
  useEffect(() => {
    if (search.order_id && orders.length > 0) {
      const matched = orders.find((o) => o.id === search.order_id);
      if (matched) {
        setSelectedOrder(matched);
      }
    }
  }, [search.order_id, orders]);

  // Self-grant Admin role helper for owner / admin initialization
  async function handleGrantAdminRole() {
    if (!user) return;
    setIsGrantingRole(true);
    try {
      const { error } = await supabase.from("user_roles").upsert({
        user_id: user.id,
        role: "super_admin",
      });
      if (error) throw error;
      toast.success("Sizga Super Admin huquqi muvaffaqiyatli berildi!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Rol berishda xatolik yuz berdi");
    } finally {
      setIsGrantingRole(false);
    }
  }

  // 1. Loading State
  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-muted-foreground">Admin panel yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  // 2. Direct In-Place Login Form (When not logged in)
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-card border border-border shadow-xs">
              <Logo />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
              Admin Boshqaruv Tizimi
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Boshqaruv paneliga faqat ruxsat berilgan adminlar kirishi mumkin
            </p>
          </div>

          <Card className="rounded-3xl border-border/80 shadow-xl bg-card p-6 sm:p-8">
            <form onSubmit={handleAdminSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="admin-email" className="text-xs font-semibold">
                  Admin Email manzili
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="admin@gmail.com"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                    required
                    className="h-11 rounded-2xl pl-10 bg-background"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="admin-password" className="text-xs font-semibold">
                  Maxfiy parol
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="••••••••"
                    value={authForm.password}
                    onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                    required
                    className="h-11 rounded-2xl pl-10 bg-background"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={authSubmitting}
                className="h-12 w-full rounded-2xl gradient-primary text-base text-primary-foreground font-semibold shadow-glow hover:opacity-95 cursor-pointer mt-2"
              >
                {authSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <KeyRound className="mr-2 size-4" />
                )}
                Admin panelga kirish
              </Button>
            </form>
          </Card>

          <div className="text-center">
            <Link
              to="/"
              className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="size-3.5 mr-1.5" /> Asosiy saytga qaytish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Logged In but No Staff Role (Offer self-activation for project administrator)
  const hasAccess = isStaff || isAdmin || roles.length === 0 || roles.includes("super_admin");

  if (!hasAccess && roles.includes("customer")) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/20 p-4">
        <Card className="w-full max-w-md rounded-3xl border-border/80 shadow-lg text-center p-6 sm:p-8">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <ShieldAlert className="size-7" />
          </div>
          <CardTitle className="text-xl font-bold">Admin huquqini faollashtirish</CardTitle>
          <CardDescription className="mt-2 text-sm">
            Siz hozirda <span className="font-semibold text-foreground">{user.email}</span> hisobi bilan kirdingiz.
            Admin boshqaruv paneliga to'liq kirish uchun ushbu tugmani bosing:
          </CardDescription>

          <div className="mt-6 space-y-3">
            <Button
              onClick={handleGrantAdminRole}
              disabled={isGrantingRole}
              className="h-12 w-full rounded-2xl gradient-primary text-primary-foreground font-semibold cursor-pointer"
            >
              {isGrantingRole ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                <UserCheck className="mr-2 size-4" />
              )}
              O'zimga Super Admin huquqini berish
            </Button>
            <Button asChild variant="outline" className="h-11 w-full rounded-2xl">
              <Link to="/dashboard">Mijoz kabinetiga o'tish</Link>
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  // Notification counters
  const pendingOrdersCount = orders.filter((o) => o.status === "yangi").length;
  const pendingReviewsCount = reviews.filter((r) => !r.is_approved).length;

  return (
    <AdminLayout
      currentTab={currentTab}
      onTabChange={handleTabChange}
      pendingOrdersCount={pendingOrdersCount}
      pendingReviewsCount={pendingReviewsCount}
    >
      {/* DASHBOARD TAB */}
      {currentTab === "dashboard" && (
        <DashboardOverview
          orders={orders}
          services={services}
          payments={payments}
          teamMembers={teamMembers}
          galleryItems={galleryItems}
          usersCount={profiles.length}
          onNavigate={handleTabChange}
          onSelectOrder={(order) => {
            setSelectedOrder(order);
            handleTabChange("orders");
          }}
          onNewOrder={() => {
            setIsOrderCreateOpen(true);
            handleTabChange("orders");
          }}
          onNewService={() => {
            setIsServiceCreateOpen(true);
            handleTabChange("services");
          }}
        />
      )}

      {/* TEAM TAB */}
      {currentTab === "team" && <TeamManager />}

      {/* PARTNERS TAB */}
      {currentTab === "partners" && <PartnersManager />}

      {/* SERVICES & CATEGORIES TAB */}
      {currentTab === "services" && (
        <ServicesManager
          services={services}
          categories={categories}
          onRefresh={() => {
            refetchServices();
            refetchCategories();
          }}
          isCreateOpen={isServiceCreateOpen}
          setIsCreateOpen={setIsServiceCreateOpen}
        />
      )}

      {/* GALLERY TAB */}
      {currentTab === "gallery" && <GalleryManager />}

      {/* ORDERS TAB */}
      {currentTab === "orders" && (
        <OrdersManager
          orders={orders}
          services={services}
          onRefresh={refetchOrders}
          selectedOrder={selectedOrder}
          onSelectOrder={setSelectedOrder}
          isCreateOpen={isOrderCreateOpen}
          setIsCreateOpen={setIsOrderCreateOpen}
        />
      )}

      {/* PAYMENTS TAB */}
      {currentTab === "payments" && (
        <PaymentsManager
          payments={payments}
          orders={orders}
          onRefresh={refetchPayments}
        />
      )}

      {/* USERS TAB */}
      {currentTab === "users" && (
        <UsersManager
          profiles={profiles}
          userRoles={userRoles}
          onRefresh={() => {
            refetchProfiles();
            refetchUserRoles();
          }}
        />
      )}

      {/* NEWS TAB */}
      {currentTab === "news" && (
        <NewsManager
          news={news}
          onRefresh={refetchNews}
        />
      )}

      {/* FAQ & REVIEWS TAB */}
      {currentTab === "faq_reviews" && (
        <FaqReviewsManager
          faqList={faq}
          reviewsList={reviews}
          services={services}
          onRefresh={() => {
            refetchFaq();
            refetchReviews();
          }}
        />
      )}

      {/* BANNERS TAB */}
      {currentTab === "banners" && (
        <BannersManager
          banners={banners}
          onRefresh={refetchBanners}
        />
      )}

      {/* SETTINGS TAB */}
      {currentTab === "settings" && (
        <SettingsManager
          settings={settings}
          onRefresh={refetchSettings}
        />
      )}
    </AdminLayout>
  );
}
