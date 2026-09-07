import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ShoppingCart,
  Clock,
  CheckCircle2,
  FileText,
  CreditCard,
  User,
  LogOut,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Building,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { PublicLayout } from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSum, formatDateTime, formatDate } from "@/lib/format";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Shaxsiy Kabinet | 21-ASR" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: CustomerDashboardPage,
});

const statusMap: Record<string, { label: string; className: string }> = {
  yangi: { label: "Yangi qabul qilindi", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  qabul_qilindi: { label: "Ko'rib chiqilmoqda", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  jarayonda: { label: "Jarayonda", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  mijozdan_kutilmoqda: { label: "Hujjat talab qilinmoqda", className: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  tayyor: { label: "Tayyor", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  bekor_qilindi: { label: "Bekor qilingan", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

function CustomerDashboardPage() {
  const { user, isStaff, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // 1. Fetch user orders
  const { data: myOrders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["my_orders", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .or(`user_id.eq.${user.id},email.eq.${user.email}`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // 2. Fetch user documents
  const { data: myDocuments = [] } = useQuery({
    queryKey: ["my_documents", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // 3. Fetch user payments
  const { data: myPayments = [] } = useQuery({
    queryKey: ["my_payments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success("Tizimdan chiqildi");
    navigate({ to: "/" });
  }

  if (authLoading) {
    return (
      <PublicLayout>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }

  if (!user) {
    return (
      <PublicLayout>
        <div className="mx-auto max-w-md py-16 text-center">
          <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <User className="size-7" />
          </div>
          <h2 className="text-2xl font-bold">Shaxsiy kabinetga kirish</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Arizalaringizni ko'rish va boshqarish uchun profilingizga kiring.
          </p>
          <Button asChild className="mt-6 w-full rounded-2xl gradient-primary text-primary-foreground">
            <Link to="/auth" search={{ redirect: undefined }}>Kirish / Ro'yxatdan o'tish</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl py-8 px-4 sm:px-6">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-linear-to-r from-primary/10 via-primary/5 to-accent/20 p-6 border border-primary/20 shadow-xs mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">
                Salom, {user.user_metadata?.["full_name"] || user.email?.split("@")[0]}!
              </h1>
              {isStaff && (
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Admin / Staff
                </Badge>
              )}
            </div>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              {user.email} {user.user_metadata?.["phone"] ? `• ${user.user_metadata["phone"]}` : ""}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isStaff && (
              <Button asChild className="rounded-2xl gradient-primary text-primary-foreground shadow-sm">
                <Link to="/admin">
                  <ShieldCheck className="size-4 mr-2" /> Boshqaruv paneli (Admin)
                </Link>
              </Button>
            )}
            <Button asChild variant="outline" className="rounded-2xl border-border bg-card hover:bg-accent">
              <Link to="/services" search={{ q: "", cat: "all" }}>
                <PlusCircle className="size-4 mr-2" /> Yangi xizmatga buyurtma
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="rounded-full text-destructive hover:bg-destructive/10 cursor-pointer"
              title="Chiqish"
            >
              <LogOut className="size-4.5" />
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="rounded-2xl p-1 bg-muted/60">
            <TabsTrigger value="orders" className="rounded-xl px-5 py-2">
              <ShoppingCart className="size-4 mr-2" /> Buyurtmalarim ({myOrders.length})
            </TabsTrigger>
            <TabsTrigger value="documents" className="rounded-xl px-5 py-2">
              <FileText className="size-4 mr-2" /> Hujjatlarim ({myDocuments.length})
            </TabsTrigger>
            <TabsTrigger value="payments" className="rounded-xl px-5 py-2">
              <CreditCard className="size-4 mr-2" /> To'lovlarim ({myPayments.length})
            </TabsTrigger>
          </TabsList>

          {/* MY ORDERS TAB */}
          <TabsContent value="orders">
            <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">Mening arizalarim</CardTitle>
                <CardDescription>
                  Yuborgan barcha xizmat buyurtmalaringiz va ularning joriy holati
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {myOrders.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground space-y-3">
                    <p className="text-base font-semibold">Sizda hali arizalar mavjud emas</p>
                    <p className="text-xs">
                      100+ dan ortiq onlayn xizmatlarimizdan birini tanlab buyurtma bering.
                    </p>
                    <Button asChild className="rounded-full gradient-primary text-primary-foreground">
                      <Link to="/services" search={{ q: "", cat: "all" }}>Xizmatlar katalogi</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/40">
                        <TableRow>
                          <TableHead className="font-bold">Buyurtma No</TableHead>
                          <TableHead className="font-bold">Xizmat nomi</TableHead>
                          <TableHead className="font-bold">Narxi</TableHead>
                          <TableHead className="font-bold">Holat</TableHead>
                          <TableHead className="font-bold">Sana</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myOrders.map((order) => {
                          const st = statusMap[order.status] || {
                            label: order.status,
                            className: "bg-muted text-muted-foreground",
                          };
                          return (
                            <TableRow key={order.id} className="hover:bg-muted/40">
                              <TableCell className="font-bold text-foreground">
                                #{order.order_number || order.id.slice(0, 8)}
                              </TableCell>
                              <TableCell className="font-medium">{order.service_name}</TableCell>
                              <TableCell className="font-bold text-foreground">
                                {formatSum(order.price)}
                              </TableCell>
                              <TableCell>
                                <Badge variant="outline" className={cn("text-xs font-semibold px-2.5 py-0.5", st.className)}>
                                  {st.label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatDateTime(order.created_at)}
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

          {/* MY DOCUMENTS TAB */}
          <TabsContent value="documents">
            <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">Yuklangan hujjatlar</CardTitle>
                <CardDescription>
                  Buyurtmalaringizga biriktirilgan pasport, ariza va boshqa hujjat nusxalari
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {myDocuments.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground">
                    <p className="text-base font-semibold">Hujjatlar mavjud emas</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/40">
                        <TableRow>
                          <TableHead className="font-bold">Fayl nomi</TableHead>
                          <TableHead className="font-bold">Hajmi</TableHead>
                          <TableHead className="font-bold">Yuklangan sana</TableHead>
                          <TableHead className="text-right font-bold pr-6">Amal</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myDocuments.map((doc) => {
                          const url = supabase.storage.from("documents").getPublicUrl(doc.file_path).data.publicUrl;
                          return (
                            <TableRow key={doc.id} className="hover:bg-muted/40">
                              <TableCell className="font-medium flex items-center gap-2">
                                <FileText className="size-4 text-primary" /> {doc.name}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {Math.round(doc.size_bytes / 1024)} KB
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground">
                                {formatDateTime(doc.created_at)}
                              </TableCell>
                              <TableCell className="text-right pr-6">
                                <Button asChild variant="outline" size="sm" className="rounded-xl h-8 text-xs">
                                  <a href={url} target="_blank" rel="noreferrer">
                                    <ExternalLink className="size-3.5 mr-1" /> Yuklab olish
                                  </a>
                                </Button>
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

          {/* MY PAYMENTS TAB */}
          <TabsContent value="payments">
            <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold">To'lovlar tarixi</CardTitle>
                <CardDescription>Barcha tranzaksiyalar va cheklar</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                {myPayments.length === 0 ? (
                  <div className="py-16 text-center text-muted-foreground">
                    <p className="text-base font-semibold">To'lovlar hali amalga oshirilmagan</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-muted/40">
                        <TableRow>
                          <TableHead className="font-bold">Tranzaksiya ID</TableHead>
                          <TableHead className="font-bold">Summa</TableHead>
                          <TableHead className="font-bold">Usul</TableHead>
                          <TableHead className="font-bold">Holat</TableHead>
                          <TableHead className="font-bold">Sana</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {myPayments.map((p) => (
                          <TableRow key={p.id} className="hover:bg-muted/40">
                            <TableCell className="font-mono text-xs font-bold">{p.transaction_id}</TableCell>
                            <TableCell className="font-bold text-foreground">{formatSum(p.amount)}</TableCell>
                            <TableCell>{p.method}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-xs",
                                  p.status === "tolangan"
                                    ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                                    : "bg-amber-500/10 text-amber-600 border-amber-500/20"
                                )}
                              >
                                {p.status === "tolangan" ? "To'langan" : p.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">
                              {formatDateTime(p.created_at)}
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
      </div>
    </PublicLayout>
  );
}
