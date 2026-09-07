import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Trash2,
  FileText,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  XCircle,
  Download,
  AlertTriangle,
  FileSpreadsheet,
  Save,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatSum, formatDateTime } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type ServiceRow = Database["public"]["Tables"]["services"]["Row"];
type OrderStatus = Database["public"]["Enums"]["order_status"];
type OrderEvent = Database["public"]["Tables"]["order_events"]["Row"];
type DocumentRow = Database["public"]["Tables"]["documents"]["Row"];

interface OrdersManagerProps {
  orders: OrderRow[];
  services: ServiceRow[];
  onRefresh: () => void;
  selectedOrder: OrderRow | null;
  onSelectOrder: (order: OrderRow | null) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
}

const statusMap: Record<OrderStatus, { label: string; className: string }> = {
  yangi: { label: "Yangi", className: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  qabul_qilindi: { label: "Qabul qilindi", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
  jarayonda: { label: "Jarayonda", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  mijozdan_kutilmoqda: { label: "Mijozdan kutilmoqda", className: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  tayyor: { label: "Tayyor", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  bekor_qilindi: { label: "Bekor qilindi", className: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export function OrdersManager({
  orders,
  services,
  onRefresh,
  selectedOrder,
  onSelectOrder,
  isCreateOpen,
  setIsCreateOpen,
}: OrdersManagerProps) {
  const { user } = useAuth();

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");

  // Detailed view / editing
  const [orderEvents, setOrderEvents] = useState<OrderEvent[]>([]);
  const [orderDocs, setOrderDocs] = useState<DocumentRow[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [statusChange, setStatusChange] = useState<OrderStatus>("yangi");
  const [internalNote, setInternalNote] = useState("");
  const [statusNote, setStatusNote] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<OrderRow | null>(null);

  // New order form state
  const [newOrderForm, setNewOrderForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    service_id: "",
    service_name: "",
    price: 0,
    notes: "",
    status: "yangi" as OrderStatus,
  });
  const [isCreating, setIsCreating] = useState(false);

  // Fetch events and docs when order is selected
  async function openOrderDetails(order: OrderRow) {
    onSelectOrder(order);
    setStatusChange(order.status);
    setInternalNote(order.internal_notes || "");
    setAssignedTo(order.assigned_to || "");
    setStatusNote("");
    setLoadingDetails(true);

    try {
      const [eventsRes, docsRes] = await Promise.all([
        supabase
          .from("order_events")
          .select("*")
          .eq("order_id", order.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("documents")
          .select("*")
          .eq("order_id", order.id)
          .order("created_at", { ascending: false }),
      ]);

      setOrderEvents(eventsRes.data || []);
      setOrderDocs(docsRes.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDetails(false);
    }
  }

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        !searchTerm.trim() ||
        o.order_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.service_name?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      const matchService = serviceFilter === "all" || o.service_id === serviceFilter;

      return matchSearch && matchStatus && matchService;
    });
  }, [orders, searchTerm, statusFilter, serviceFilter]);

  // Update order status and internal note
  async function handleUpdateOrder() {
    if (!selectedOrder) return;
    setIsUpdating(true);

    try {
      const isStatusChanged = statusChange !== selectedOrder.status;

      const { error } = await supabase
        .from("orders")
        .update({
          status: statusChange,
          internal_notes: internalNote,
          assigned_to: assignedTo.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedOrder.id);

      if (error) throw error;

      // Log event if status changed or note provided
      if (isStatusChanged || statusNote.trim()) {
        await supabase.from("order_events").insert({
          order_id: selectedOrder.id,
          status: statusChange,
          note: statusNote.trim() || `Status ${statusMap[statusChange]?.label} holatiga o'zgartirildi`,
          created_by: user?.id ?? null,
        });
      }

      toast.success("Buyurtma muvaffaqiyatli yangilandi");
      onRefresh();

      // Refresh events
      const { data: evs } = await supabase
        .from("order_events")
        .select("*")
        .eq("order_id", selectedOrder.id)
        .order("created_at", { ascending: false });
      setOrderEvents(evs || []);
    } catch (err) {
      console.error(err);
      toast.error("Yangilashda xatolik yuz berdi");
    } finally {
      setIsUpdating(false);
    }
  }

  // Delete Order
  async function handleDeleteOrder() {
    if (!orderToDelete) return;

    try {
      // First delete events
      await supabase.from("order_events").delete().eq("order_id", orderToDelete.id);
      // Delete documents reference
      await supabase.from("documents").delete().eq("order_id", orderToDelete.id);
      // Delete order
      const { error } = await supabase.from("orders").delete().eq("id", orderToDelete.id);
      if (error) throw error;

      toast.success("Buyurtma o'chirildi");
      setOrderToDelete(null);
      if (selectedOrder?.id === orderToDelete.id) {
        onSelectOrder(null);
      }
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("O'chirishda xatolik yuz berdi");
    }
  }

  // Create Order manually
  async function handleCreateOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!newOrderForm.customer_name || !newOrderForm.phone) {
      toast.error("Mijoz ismi va telefon raqami to'ldirilishi shart");
      return;
    }

    setIsCreating(true);
    try {
      const selectedSrv = services.find((s) => s.id === newOrderForm.service_id);
      const serviceName = selectedSrv ? selectedSrv.name_uz : newOrderForm.service_name || "Xizmat";
      const price = selectedSrv ? selectedSrv.price : newOrderForm.price;

      // Katalog statik fallback'dan kelganda id "serv-001" ko'rinishida bo'ladi —
      // uuid ustuniga bunday qiymat yozilmaydi, shuning uchun null qoldiramiz.
      const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      const asUuid = (v?: string | null) => (v && uuidRe.test(v) ? v : null);

      const orderPayload = {
        customer_name: newOrderForm.customer_name,
        phone: newOrderForm.phone,
        email: newOrderForm.email || "",
        service_id: asUuid(newOrderForm.service_id),
        service_name: serviceName,
        price: price,
        notes: newOrderForm.notes,
        status: newOrderForm.status,
        user_id: asUuid(user?.id),
      };

      // Bo'sh order_number ni bazadagi `assign_order_number` trigger'i to'ldiradi.
      // Trigger o'rnatilmagan bo'lsa, raqamni o'zimiz generatsiya qilamiz.
      let { data, error } = await supabase
        .from("orders")
        .insert({ ...orderPayload, order_number: "" })
        .select()
        .single();

      if (error) {
        const retry = await supabase
          .from("orders")
          .insert({
            ...orderPayload,
            order_number: `21ASR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
          })
          .select()
          .single();
        data = retry.data;
        error = retry.error;
      }

      if (error || !data) throw error ?? new Error("Buyurtma saqlanmadi");

      await supabase.from("order_events").insert({
        order_id: data.id,
        status: newOrderForm.status,
        note: "Buyurtma admin tomonidan kiritildi",
        created_by: asUuid(user?.id),
      });

      toast.success("Yangi buyurtma yaratildi");
      setIsCreateOpen(false);
      setNewOrderForm({
        customer_name: "",
        phone: "",
        email: "",
        service_id: "",
        service_name: "",
        price: 0,
        notes: "",
        status: "yangi",
      });
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Buyurtma yaratishda xatolik yuz berdi");
    } finally {
      setIsCreating(false);
    }
  }

  // Export to CSV
  function exportCSV() {
    if (filteredOrders.length === 0) {
      toast.error("Eksport qilish uchun ma'lumot yo'q");
      return;
    }

    const headers = ["Buyurtma No", "Mijoz", "Telefon", "Email", "Xizmat", "Narx", "Holat", "Sana", "Izoh"];
    const rows = filteredOrders.map((o) => [
      o.order_number || o.id,
      `"${o.customer_name.replace(/"/g, '""')}"`,
      `"${o.phone}"`,
      `"${o.email || ""}"`,
      `"${(o.service_name || "").replace(/"/g, '""')}"`,
      o.price || 0,
      statusMap[o.status]?.label || o.status,
      formatDateTime(o.created_at),
      `"${(o.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `buyurtmalar-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV fayl yuklab olindi");
  }

  return (
    <div className="space-y-6">
      {/* Search & Actions Bar */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Raqam, ism, telefon yoki xizmat bo'yicha qidiruv..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-2xl pl-10 bg-background"
              />
            </div>

            {/* Filters & Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11 w-[160px] rounded-2xl bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">Barcha statuslar</SelectItem>
                  <SelectItem value="yangi">Yangi</SelectItem>
                  <SelectItem value="qabul_qilindi">Qabul qilindi</SelectItem>
                  <SelectItem value="jarayonda">Jarayonda</SelectItem>
                  <SelectItem value="mijozdan_kutilmoqda">Mijozdan kutilmoqda</SelectItem>
                  <SelectItem value="tayyor">Tayyor</SelectItem>
                  <SelectItem value="bekor_qilindi">Bekor qilindi</SelectItem>
                </SelectContent>
              </Select>

              {/* Service filter */}
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="h-11 w-[180px] rounded-2xl bg-background">
                  <SelectValue placeholder="Xizmat bo'yicha" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl max-h-60">
                  <SelectItem value="all">Barcha xizmatlar</SelectItem>
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name_uz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Export Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={exportCSV}
                title="CSV ga yuklab olish"
                className="h-11 w-11 rounded-2xl cursor-pointer"
              >
                <FileSpreadsheet className="size-4" />
              </Button>

              {/* Add Order Button */}
              <Button
                onClick={() => setIsCreateOpen(true)}
                className="h-11 rounded-2xl gradient-primary text-primary-foreground shadow-sm cursor-pointer"
              >
                <PlusCircle className="mr-2 size-4" /> Yangi buyurtma
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg font-bold">Buyurtmalar ro'yxati</CardTitle>
            <CardDescription>
              Jami topilgan: {filteredOrders.length} ta buyurtma
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-base font-semibold">Buyurtmalar topilmadi</p>
              <p className="text-xs mt-1">Qidiruv yoki filtr parametrlarini o'zgartirib ko'ring.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="w-[120px] font-bold">Raqam</TableHead>
                    <TableHead className="font-bold">Mijoz</TableHead>
                    <TableHead className="font-bold">Xizmat nomi</TableHead>
                    <TableHead className="font-bold">Narxi</TableHead>
                    <TableHead className="font-bold">Holati</TableHead>
                    <TableHead className="font-bold">Sana</TableHead>
                    <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const st = statusMap[order.status] || {
                      label: order.status,
                      className: "bg-muted text-muted-foreground",
                    };

                    return (
                      <TableRow
                        key={order.id}
                        onClick={() => openOrderDetails(order)}
                        className="hover:bg-muted/40 transition-colors cursor-pointer"
                      >
                        <TableCell className="font-bold text-foreground">
                          {order.order_number || order.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-foreground">{order.customer_name}</div>
                          <div className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                            <span>{order.phone}</span>
                            {order.email && <span>• {order.email}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px] truncate text-sm font-medium">
                          {order.service_name}
                        </TableCell>
                        <TableCell className="font-semibold text-foreground whitespace-nowrap">
                          {formatSum(order.price)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-xs font-semibold px-2.5 py-0.5", st.className)}>
                            {st.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateTime(order.created_at)}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                              onClick={() => openOrderDetails(order)}
                            >
                              <Eye className="size-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                              onClick={() => setOrderToDelete(order)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </div>
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

      {/* Order Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={(open) => !open && onSelectOrder(null)}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      <span>Buyurtma #{selectedOrder.order_number || selectedOrder.id.slice(0, 8)}</span>
                      <Badge
                        variant="outline"
                        className={cn("text-xs", statusMap[selectedOrder.status]?.className)}
                      >
                        {statusMap[selectedOrder.status]?.label}
                      </Badge>
                    </DialogTitle>
                    <DialogDescription className="mt-1">
                      Yaratilgan vaqti: {formatDateTime(selectedOrder.created_at)}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6 pt-2">
                {/* Customer Information Cards */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-3.5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Mijoz ma'lumotlari
                    </p>
                    <p className="mt-1 font-bold text-foreground">{selectedOrder.customer_name}</p>
                    <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                      <p className="flex items-center gap-1.5">
                        <Phone className="size-3.5 text-primary" />
                        <a href={`tel:${selectedOrder.phone}`} className="hover:underline text-foreground">
                          {selectedOrder.phone}
                        </a>
                      </p>
                      {selectedOrder.email && (
                        <p className="flex items-center gap-1.5">
                          <Mail className="size-3.5 text-primary" />
                          <a href={`mailto:${selectedOrder.email}`} className="hover:underline text-foreground">
                            {selectedOrder.email}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-3.5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Xizmat & To'lov
                    </p>
                    <p className="mt-1 font-bold text-foreground">{selectedOrder.service_name}</p>
                    <p className="mt-2 text-base font-black text-primary">
                      {formatSum(selectedOrder.price)}
                    </p>
                  </div>
                </div>

                {/* Customer notes */}
                {selectedOrder.notes && (
                  <div className="rounded-2xl border border-border/80 bg-muted/20 p-3.5">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Mijoz izohi / Talabi
                    </p>
                    <p className="mt-1.5 text-sm text-foreground whitespace-pre-wrap">
                      {selectedOrder.notes}
                    </p>
                  </div>
                )}

                {/* Uploaded Documents */}
                <div className="rounded-2xl border border-border/80 bg-muted/20 p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Biriktirilgan hujjatlar ({orderDocs.length})
                  </p>
                  {orderDocs.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Hujjatlar yuklanmagan.</p>
                  ) : (
                    <div className="space-y-2">
                      {orderDocs.map((doc) => {
                        const publicUrl = supabase.storage.from("documents").getPublicUrl(doc.file_path).data.publicUrl;
                        return (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between rounded-xl bg-card border border-border p-2.5 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <FileText className="size-4 text-primary shrink-0" />
                              <span className="font-medium text-foreground truncate">{doc.name}</span>
                              <span className="text-muted-foreground">
                                ({Math.round(doc.size_bytes / 1024)} KB)
                              </span>
                            </div>
                            <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                              <a href={publicUrl} target="_blank" rel="noreferrer">
                                <ExternalLink className="size-3.5 mr-1" /> Ochish
                              </a>
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Status & Operations Form */}
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-4">
                  <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-primary" /> Holatni yangilash & Boshqaruv
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="status-select">Yangi holat</Label>
                      <Select value={statusChange} onValueChange={(v) => setStatusChange(v as OrderStatus)}>
                        <SelectTrigger id="status-select" className="bg-card rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="yangi">Yangi</SelectItem>
                          <SelectItem value="qabul_qilindi">Qabul qilindi</SelectItem>
                          <SelectItem value="jarayonda">Jarayonda</SelectItem>
                          <SelectItem value="mijozdan_kutilmoqda">Mijozdan kutilmoqda</SelectItem>
                          <SelectItem value="tayyor">Tayyor</SelectItem>
                          <SelectItem value="bekor_qilindi">Bekor qilindi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="assigned-to">Biriktirilgan xodim</Label>
                      <Input
                        id="assigned-to"
                        placeholder="Masalan: Sardor (Operator)"
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        className="bg-card rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="status-note">O'zgarish izohi (Tarixga yoziladi)</Label>
                    <Input
                      id="status-note"
                      placeholder="Masalan: Hujjatlar Adliya vazirligiga topshirildi..."
                      value={statusNote}
                      onChange={(e) => setStatusNote(e.target.value)}
                      className="bg-card rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="internal-note">Ichki eslatmalar (Faqat adminlar ko'radi)</Label>
                    <Textarea
                      id="internal-note"
                      placeholder="Mijoz bilan kelishilgan qo'shimcha tafsilotlar..."
                      rows={2}
                      value={internalNote}
                      onChange={(e) => setInternalNote(e.target.value)}
                      className="bg-card rounded-xl"
                    />
                  </div>

                  <Button
                    onClick={handleUpdateOrder}
                    disabled={isUpdating}
                    className="w-full rounded-xl gradient-primary text-primary-foreground cursor-pointer"
                  >
                    {isUpdating ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
                    O'zgarishlarni saqlash
                  </Button>
                </div>

                {/* Order Events Timeline */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Holatlar tarixi ({orderEvents.length})
                  </p>
                  {loadingDetails ? (
                    <div className="py-4 text-center text-xs text-muted-foreground">Tarix yuklanmoqda...</div>
                  ) : orderEvents.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Hozircha tarix yozuvlari yo'q.</p>
                  ) : (
                    <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                      {orderEvents.map((ev) => (
                        <div key={ev.id} className="relative">
                          <span className="absolute -left-6 top-1 size-3 rounded-full bg-primary ring-4 ring-background" />
                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className={cn("text-[10px] py-0", statusMap[ev.status]?.className)}>
                              {statusMap[ev.status]?.label}
                            </Badge>
                            <span className="text-muted-foreground">{formatDateTime(ev.created_at)}</span>
                          </div>
                          {ev.note && <p className="mt-1 text-xs text-foreground font-medium">{ev.note}</p>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="mt-6 flex items-center justify-between sm:justify-between border-t border-border pt-4">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setOrderToDelete(selectedOrder)}
                  className="rounded-xl cursor-pointer"
                >
                  <Trash2 className="size-4 mr-1.5" /> O'chirish
                </Button>
                <Button variant="outline" size="sm" onClick={() => onSelectOrder(null)} className="rounded-xl">
                  Yopish
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Order Modal */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Yangi buyurtma yaratish</DialogTitle>
            <DialogDescription>
              Ofisda yoki telefon orqali murojaat qilgan mijoz nomidan buyurtma shakllantiring.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateOrder} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="new-customer-name">Mijoz to'liq ismi *</Label>
              <Input
                id="new-customer-name"
                placeholder="Masalan: Alisher Qodirov"
                value={newOrderForm.customer_name}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, customer_name: e.target.value })}
                required
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="new-customer-phone">Telefon raqam *</Label>
                <Input
                  id="new-customer-phone"
                  placeholder="+998 90 123 45 67"
                  value={newOrderForm.phone}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, phone: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="new-customer-email">Email (ixtiyoriy)</Label>
                <Input
                  id="new-customer-email"
                  type="email"
                  placeholder="mijoz@gmail.com"
                  value={newOrderForm.email}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, email: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-service-select">Xizmat turi *</Label>
              <Select
                value={newOrderForm.service_id}
                onValueChange={(val) => {
                  const srv = services.find((s) => s.id === val);
                  setNewOrderForm({
                    ...newOrderForm,
                    service_id: val,
                    service_name: srv?.name_uz || "",
                    price: srv?.price || 0,
                  });
                }}
              >
                <SelectTrigger id="new-service-select" className="rounded-xl">
                  <SelectValue placeholder="Xizmatni tanlang" />
                </SelectTrigger>
                <SelectContent className="rounded-xl max-h-60">
                  {services.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name_uz}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-price">Buyurtma narxi (so'mda)</Label>
              <Input
                id="new-price"
                type="number"
                value={newOrderForm.price}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, price: Number(e.target.value) })}
                className="rounded-xl"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="new-notes">Qo'shimcha izoh / talab</Label>
              <Textarea
                id="new-notes"
                placeholder="Xizmat yuzasidan talablar..."
                rows={3}
                value={newOrderForm.notes}
                onChange={(e) => setNewOrderForm({ ...newOrderForm, notes: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                className="rounded-xl gradient-primary text-primary-foreground cursor-pointer"
              >
                {isCreating ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Buyurtmani saqlash
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Alert */}
      <AlertDialog open={!!orderToDelete} onOpenChange={(open) => !open && setOrderToDelete(null)}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Buyurtmani o'chirish
            </AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham #{orderToDelete?.order_number || orderToDelete?.id.slice(0, 8)} raqamli
              buyurtmani o'chirmoqchimisiz? Ushbu amalni ortga qaytarib bo'lmaydi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              O'chirish
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
