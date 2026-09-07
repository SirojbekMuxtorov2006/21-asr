import { useMemo } from "react";
import {
  TrendingUp,
  ShoppingCart,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  DollarSign,
  ArrowUpRight,
  PlusCircle,
  Eye,
  Layers,
  Sparkles,
  Handshake,
} from "lucide-react";
import { usePartners } from "@/hooks/usePartners";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { formatSum, formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";
import type { AdminTab } from "./AdminLayout";
import { Image as ImageIcon } from "lucide-react";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];
type TeamMemberRow = Database["public"]["Tables"]["team_members"]["Row"];
type GalleryRow = Database["public"]["Tables"]["gallery"]["Row"];

interface DashboardOverviewProps {
  orders: OrderRow[];
  services: ServiceRow[];
  payments: PaymentRow[];
  teamMembers?: TeamMemberRow[];
  galleryItems?: GalleryRow[];
  usersCount: number;
  onNavigate: (tab: AdminTab) => void;
  onSelectOrder: (order: OrderRow) => void;
  onNewOrder: () => void;
  onNewService: () => void;
}

const statusColors: Record<string, { label: string; className: string; bgHex: string }> = {
  yangi: { label: "Yangi", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", bgHex: "#3b82f6" },
  qabul_qilindi: { label: "Qabul qilindi", className: "bg-purple-500/10 text-purple-600 border-purple-500/20", bgHex: "#a855f7" },
  jarayonda: { label: "Jarayonda", className: "bg-amber-500/10 text-amber-600 border-amber-500/20", bgHex: "#f59e0b" },
  mijozdan_kutilmoqda: { label: "Mijozdan kutilmoqda", className: "bg-orange-500/10 text-orange-600 border-orange-500/20", bgHex: "#f97316" },
  tayyor: { label: "Tayyor", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", bgHex: "#10b981" },
  bekor_qilindi: { label: "Bekor qilindi", className: "bg-red-500/10 text-red-600 border-red-500/20", bgHex: "#ef4444" },
};

export function DashboardOverview({
  orders,
  services,
  payments,
  teamMembers = [],
  galleryItems = [],
  usersCount,
  onNavigate,
  onSelectOrder,
  onNewOrder,
  onNewService,
}: DashboardOverviewProps) {
  // Compute Key Metrics
  const totalOrders = orders.length;
  const newOrders = orders.filter((o) => o.status === "yangi").length;
  const inProgressOrders = orders.filter((o) => o.status === "jarayonda" || o.status === "qabul_qilindi").length;
  const completedOrders = orders.filter((o) => o.status === "tayyor").length;
  const totalTeam = teamMembers.length;
  const activeTeam = teamMembers.filter((m) => m.is_active).length;
  const totalServices = services.length;
  const activeServices = services.filter((s) => s.is_active).length;
  const totalGallery = galleryItems.length;
  const { partners = [] } = usePartners();

  const totalRevenue = useMemo(() => {
    return orders
      .filter((o) => o.status !== "bekor_qilindi")
      .reduce((acc, o) => acc + (Number(o.price) || 0), 0);
  }, [orders]);

  const paidRevenue = useMemo(() => {
    return payments
      .filter((p) => p.status === "tolangan")
      .reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
  }, [payments]);

  // Chart Data: Status Breakdown
  const statusChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      counts[o.status] = (counts[o.status] || 0) + 1;
    });

    return Object.entries(counts).map(([status, count]) => ({
      name: statusColors[status]?.label || status,
      value: count,
      color: statusColors[status]?.bgHex || "#94a3b8",
    }));
  }, [orders]);

  // Chart Data: Top Services
  const topServicesData = useMemo(() => {
    const serviceMap: Record<string, number> = {};
    orders.forEach((o) => {
      const name = o.service_name || "Boshqa xizmat";
      serviceMap[name] = (serviceMap[name] || 0) + 1;
    });

    return Object.entries(serviceMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name: name.length > 22 ? name.slice(0, 20) + "..." : name,
        fullTitle: name,
        buyurtmalar: count,
      }));
  }, [orders]);

  // Chart Data: Weekly or Monthly Dynamics
  const activityData = useMemo(() => {
    const months = ["Yan", "Fev", "Mar", "Apr", "May", "Iyun", "Iyul", "Avg", "Sen", "Okt", "Noy", "Dek"];
    const now = new Date();
    const result: { month: string; orders: number; revenue: number }[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const mName = months[d.getMonth()] ?? "";
      const year = d.getFullYear();
      const monthNum = d.getMonth();

      const matchingOrders = orders.filter((o) => {
        const od = new Date(o.created_at);
        return od.getFullYear() === year && od.getMonth() === monthNum;
      });

      const mRevenue = matchingOrders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);

      result.push({
        month: mName,
        orders: matchingOrders.length,
        revenue: Math.round(mRevenue / 1000), // in thousand so'm for chart readability
      });
    }

    return result;
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 7);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Action Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl bg-linear-to-r from-primary/15 via-primary/5 to-accent/20 p-6 border border-primary/20 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Xush kelibsiz! Boshqaruv markazi
            </h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Barcha arizalar, to'lovlar, yangiliklar va xizmatlarni real vaqtda boshqaring.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={onNewOrder}
            className="rounded-full gradient-primary text-primary-foreground shadow-sm cursor-pointer"
          >
            <PlusCircle className="mr-2 size-4" /> Yangi buyurtma
          </Button>
          <Button
            onClick={onNewService}
            variant="outline"
            className="rounded-full border-border bg-card hover:bg-accent cursor-pointer"
          >
            <Layers className="mr-2 size-4" /> Yangi xizmat
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {/* Total Team Members */}
        <Card
          onClick={() => onNavigate("team")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Jami xodimlar
            </CardTitle>
            <span className="rounded-xl bg-primary/10 p-2 text-primary">
              <Users className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-foreground">{totalTeam}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-semibold text-emerald-600">{activeTeam} ta faol</span> xodim
            </p>
          </CardContent>
        </Card>

        {/* Total Services */}
        <Card
          onClick={() => onNavigate("services")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-indigo-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Jami xizmatlar
            </CardTitle>
            <span className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600">
              <Layers className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-foreground">{totalServices}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-semibold text-indigo-600">{activeServices} ta faol</span> katalogda
            </p>
          </CardContent>
        </Card>

        {/* Total Gallery Photos */}
        <Card
          onClick={() => onNavigate("gallery")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-pink-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Galereya rasmlari
            </CardTitle>
            <span className="rounded-xl bg-pink-500/10 p-2 text-pink-600">
              <ImageIcon className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-foreground">{totalGallery}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Sayt foto albomida
            </p>
          </CardContent>
        </Card>

        {/* Total Partners */}
        <Card
          onClick={() => onNavigate("partners")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Hamkor kompaniyalar
            </CardTitle>
            <span className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600">
              <Handshake className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-foreground">{partners.length}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-semibold text-emerald-600">{partners.filter((p) => p.is_active).length} ta faol</span> brend
            </p>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card
          onClick={() => onNavigate("orders")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Buyurtmalar
            </CardTitle>
            <span className="rounded-xl bg-blue-500/10 p-2 text-blue-600">
              <ShoppingCart className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-foreground">{totalOrders}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-semibold text-blue-600">{newOrders} ta yangi</span> ariza
            </p>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card
          onClick={() => onNavigate("payments")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-emerald-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Jami tushum
            </CardTitle>
            <span className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600">
              <DollarSign className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-black tracking-tight text-foreground truncate">
              {formatSum(totalRevenue)}
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground truncate">
              To'langan: {formatSum(paidRevenue)}
            </p>
          </CardContent>
        </Card>

        {/* Users Count */}
        <Card
          onClick={() => onNavigate("users")}
          className="rounded-2xl border-border/80 shadow-xs hover:border-amber-500/50 hover:shadow-md transition-all cursor-pointer bg-card"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold text-muted-foreground">
              Mijozlar bazasi
            </CardTitle>
            <span className="rounded-xl bg-amber-500/10 p-2 text-amber-600">
              <Sparkles className="size-4" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black tracking-tight text-foreground">{usersCount}</div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Ro'yxatdan o'tganlar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Orders Dynamics */}
        <Card className="rounded-3xl border-border/80 shadow-xs lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">Buyurtmalar & Tushum dinamikasi</CardTitle>
              <CardDescription>Oxirgi 6 oylik buyurtmalar va tushum (ming so'mda)</CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate("orders")}
              className="text-xs text-primary"
            >
              Barchasini ko'rish <ArrowUpRight className="ml-1 size-3.5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="orderGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary, #3b82f6)" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="var(--color-primary, #3b82f6)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    name="Buyurtmalar"
                    stroke="var(--color-primary, #3b82f6)"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#orderGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution Donut */}
        <Card className="rounded-3xl border-border/80 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Buyurtmalar holati</CardTitle>
            <CardDescription>Statuslar bo'yicha taqsimot</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="h-52 w-full">
              {statusChartData.length === 0 ? (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Hozircha buyurtmalar mavjud emas
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {statusChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--card)",
                        borderColor: "var(--border)",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Legend */}
            <div className="mt-2 grid grid-cols-2 gap-2 w-full text-xs">
              {statusChartData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5 truncate">
                  <span className="size-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate text-muted-foreground">{item.name}:</span>
                  <span className="font-semibold text-foreground">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table & Top Services */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="rounded-3xl border-border/80 shadow-xs lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold">So'nggi buyurtmalar</CardTitle>
              <CardDescription>Yangi va o'zgarish kiritilgan so'nggi arizalar</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("orders")}
              className="rounded-full text-xs cursor-pointer"
            >
              Hammasi ({orders.length})
            </Button>
          </CardHeader>
          <CardContent className="px-0 sm:px-6">
            {recentOrders.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                Buyurtmalar hali mavjud emas.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Raqam</TableHead>
                      <TableHead>Mijoz</TableHead>
                      <TableHead>Xizmat</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead>Sana</TableHead>
                      <TableHead className="text-right">Amal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((o) => {
                      const st = statusColors[o.status] || {
                        label: o.status,
                        className: "bg-muted text-muted-foreground",
                      };
                      return (
                        <TableRow
                          key={o.id}
                          className="hover:bg-muted/40 transition-colors cursor-pointer"
                          onClick={() => onSelectOrder(o)}
                        >
                          <TableCell className="font-bold text-foreground">
                            {o.order_number || o.id.slice(0, 8)}
                          </TableCell>
                          <TableCell>
                            <p className="font-medium text-foreground truncate max-w-[120px] sm:max-w-[160px]">
                              {o.customer_name}
                            </p>
                            <p className="text-xs text-muted-foreground">{o.phone}</p>
                          </TableCell>
                          <TableCell className="max-w-[140px] truncate text-xs">
                            {o.service_name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("text-xs font-semibold px-2 py-0.5", st.className)}>
                              {st.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground">
                            {formatDateTime(o.created_at)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectOrder(o);
                              }}
                            >
                              <Eye className="size-4" />
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

        {/* Top 5 Services */}
        <Card className="rounded-3xl border-border/80 shadow-xs">
          <CardHeader>
            <CardTitle className="text-base font-bold">Eng ko'p talab qilingan</CardTitle>
            <CardDescription>Buyurtmalar soni bo'yicha TOP-5</CardDescription>
          </CardHeader>
          <CardContent>
            {topServicesData.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                Xizmatlar bo'yicha ma'lumot mavjud emas
              </div>
            ) : (
              <div className="space-y-4">
                {topServicesData.map((item, idx) => (
                  <div key={item.fullTitle} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground truncate max-w-[180px]">
                        {idx + 1}. {item.fullTitle}
                      </span>
                      <span className="font-bold text-primary">{item.buyurtmalar} ta</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${Math.min(100, (item.buyurtmalar / (orders.length || 1)) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
