import { useState, useMemo } from "react";
import {
  Search,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  PlusCircle,
  RefreshCw,
  DollarSign,
  FileText,
  Save,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

type PaymentRow = Database["public"]["Tables"]["payments"]["Row"];
type OrderRow = Database["public"]["Tables"]["orders"]["Row"];
type PaymentStatus = Database["public"]["Enums"]["payment_status"];

interface PaymentsManagerProps {
  payments: PaymentRow[];
  orders: OrderRow[];
  onRefresh: () => void;
}

const paymentStatusMap: Record<PaymentStatus, { label: string; className: string }> = {
  kutilmoqda: { label: "Kutilmoqda", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  tolangan: { label: "To'langan", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  xatolik: { label: "Xatolik", className: "bg-red-500/10 text-red-600 border-red-500/20" },
  qaytarilgan: { label: "Qaytarilgan", className: "bg-purple-500/10 text-purple-600 border-purple-500/20" },
};

export function PaymentsManager({ payments, orders, onRefresh }: PaymentsManagerProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [methodFilter, setMethodFilter] = useState<string>("all");

  // Edit / update status modal
  const [selectedPayment, setSelectedPayment] = useState<PaymentRow | null>(null);
  const [newStatus, setNewStatus] = useState<PaymentStatus>("tolangan");
  const [isUpdating, setIsUpdating] = useState(false);

  // New offline/manual payment modal
  const [isNewPaymentOpen, setIsNewPaymentOpen] = useState(false);
  const [newPaymentForm, setNewPaymentForm] = useState({
    order_id: "",
    amount: 50000,
    method: "Naqd pul",
    transaction_id: "",
    status: "tolangan" as PaymentStatus,
  });
  const [isSavingNew, setIsSavingNew] = useState(false);

  // Metrics
  const totalAmount = useMemo(() => payments.reduce((s, p) => s + (p.amount || 0), 0), [payments]);
  const paidAmount = useMemo(
    () => payments.filter((p) => p.status === "tolangan").reduce((s, p) => s + (p.amount || 0), 0),
    [payments]
  );
  const pendingAmount = useMemo(
    () => payments.filter((p) => p.status === "kutilmoqda").reduce((s, p) => s + (p.amount || 0), 0),
    [payments]
  );

  // Filtered payments
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        !searchTerm.trim() ||
        p.transaction_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.method?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      const matchMethod = methodFilter === "all" || p.method === methodFilter;

      return matchSearch && matchStatus && matchMethod;
    });
  }, [payments, searchTerm, statusFilter, methodFilter]);

  // Update Status
  async function handleUpdateStatus() {
    if (!selectedPayment) return;
    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("payments")
        .update({
          status: newStatus,
          paid_at: newStatus === "tolangan" ? new Date().toISOString() : selectedPayment.paid_at,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedPayment.id);

      if (error) throw error;
      toast.success("To'lov holati yangilandi");
      setSelectedPayment(null);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Holatni yangilashda xatolik");
    } finally {
      setIsUpdating(false);
    }
  }

  // Create Manual Payment
  async function handleCreatePayment(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingNew(true);
    try {
      const txId =
        newPaymentForm.transaction_id.trim() ||
        `MAN-${Date.now().toString().slice(-6)}`;

      const { error } = await supabase.from("payments").insert({
        order_id: newPaymentForm.order_id || null,
        amount: newPaymentForm.amount,
        method: newPaymentForm.method,
        transaction_id: txId,
        status: newPaymentForm.status,
        paid_at: newPaymentForm.status === "tolangan" ? new Date().toISOString() : null,
        user_id: user?.id ?? null,
      });

      if (error) throw error;
      toast.success("To'lov muvaffaqiyatli qayd etildi");
      setIsNewPaymentOpen(false);
      setNewPaymentForm({
        order_id: "",
        amount: 50000,
        method: "Naqd pul",
        transaction_id: "",
        status: "tolangan",
      });
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("To'lovni saqlashda xatolik");
    } finally {
      setIsSavingNew(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="rounded-3xl border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tasdiqlangan tushum
            </CardTitle>
            <span className="rounded-xl bg-emerald-500/10 p-2 text-emerald-600">
              <CheckCircle2 className="size-4.5" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-emerald-600">{formatSum(paidAmount)}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {payments.filter((p) => p.status === "tolangan").length} ta muvaffaqiyatli to'lov
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Kutilayotgan to'lovlar
            </CardTitle>
            <span className="rounded-xl bg-amber-500/10 p-2 text-amber-600">
              <Clock className="size-4.5" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-amber-600">{formatSum(pendingAmount)}</div>
            <p className="mt-1 text-xs text-muted-foreground">
              {payments.filter((p) => p.status === "kutilmoqda").length} ta to'lov tasdiqlanishi kutilmoqda
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-border/80 shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Umumiy to'lovlar soni
            </CardTitle>
            <span className="rounded-xl bg-primary/10 p-2 text-primary">
              <CreditCard className="size-4.5" />
            </span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-foreground">{payments.length} ta</div>
            <p className="mt-1 text-xs text-muted-foreground">
              Jami hisoblangan: {formatSum(totalAmount)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Actions Bar */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tranzaksiya ID yoki to'lov usuli bo'yicha qidiruv..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-2xl pl-10 bg-background"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-11 w-[160px] rounded-2xl bg-background">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">Barcha statuslar</SelectItem>
                  <SelectItem value="tolangan">To'langan</SelectItem>
                  <SelectItem value="kutilmoqda">Kutilmoqda</SelectItem>
                  <SelectItem value="xatolik">Xatolik</SelectItem>
                  <SelectItem value="qaytarilgan">Qaytarilgan</SelectItem>
                </SelectContent>
              </Select>

              <Button
                onClick={() => setIsNewPaymentOpen(true)}
                className="h-11 rounded-2xl gradient-primary text-primary-foreground shadow-sm cursor-pointer"
              >
                <PlusCircle className="mr-2 size-4" /> To'lov qayd etish
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {filteredPayments.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-base font-semibold">To'lovlar topilmadi</p>
              <p className="text-xs mt-1">Tranzaksiyalar qayd etilganda shu yerda ko'rinadi.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="font-bold">Tranzaksiya ID</TableHead>
                    <TableHead className="font-bold">Buyurtma</TableHead>
                    <TableHead className="font-bold">Summa</TableHead>
                    <TableHead className="font-bold">To'lov usuli</TableHead>
                    <TableHead className="font-bold">Holat</TableHead>
                    <TableHead className="font-bold">Sana</TableHead>
                    <TableHead className="text-right font-bold pr-6">Amal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((p) => {
                    const st = paymentStatusMap[p.status] || {
                      label: p.status,
                      className: "bg-muted text-muted-foreground",
                    };
                    const relatedOrder = orders.find((o) => o.id === p.order_id);

                    return (
                      <TableRow key={p.id} className="hover:bg-muted/40 transition-colors">
                        <TableCell className="font-mono text-xs font-bold text-foreground">
                          {p.transaction_id || p.id.slice(0, 10)}
                        </TableCell>
                        <TableCell>
                          {relatedOrder ? (
                            <div>
                              <p className="font-semibold text-foreground text-xs">
                                #{relatedOrder.order_number || relatedOrder.id.slice(0, 8)}
                              </p>
                              <p className="text-[11px] text-muted-foreground truncate max-w-[140px]">
                                {relatedOrder.customer_name}
                              </p>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="font-bold text-foreground whitespace-nowrap">
                          {formatSum(p.amount)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {p.method || "Payme"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-xs font-semibold px-2.5 py-0.5", st.className)}>
                            {st.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateTime(p.created_at)}
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl text-xs h-8 cursor-pointer"
                            onClick={() => {
                              setSelectedPayment(p);
                              setNewStatus(p.status);
                            }}
                          >
                            Holatni o'zgartirish
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

      {/* UPDATE PAYMENT STATUS MODAL */}
      <Dialog open={!!selectedPayment} onOpenChange={(open) => !open && setSelectedPayment(null)}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">To'lov holatini o'zgartirish</DialogTitle>
            <DialogDescription>
              Tranzaksiya #{selectedPayment?.transaction_id || selectedPayment?.id.slice(0, 8)}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="rounded-2xl border border-border p-3.5 bg-muted/20 space-y-1">
              <p className="text-xs text-muted-foreground">To'lov summasi:</p>
              <p className="text-xl font-black text-primary">{formatSum(selectedPayment?.amount)}</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="payment-status">Yangi holat</Label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as PaymentStatus)}>
                <SelectTrigger id="payment-status" className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="tolangan">To'langan (Tasdiqlash)</SelectItem>
                  <SelectItem value="kutilmoqda">Kutilmoqda</SelectItem>
                  <SelectItem value="xatolik">Xatolik / To'lanmadi</SelectItem>
                  <SelectItem value="qaytarilgan">Qaytarilgan (Refund)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedPayment(null)}
              className="rounded-xl"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="rounded-xl gradient-primary text-primary-foreground cursor-pointer"
            >
              {isUpdating ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CREATE MANUAL PAYMENT MODAL */}
      <Dialog open={isNewPaymentOpen} onOpenChange={setIsNewPaymentOpen}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Yangi to'lov qayd etish</DialogTitle>
            <DialogDescription>
              Naqd pul yoki bank orqali amalga oshirilgan to'lovni tizimga kiriting.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreatePayment} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="pay-order">Biriktirilgan buyurtma (ixtiyoriy)</Label>
              <Select
                value={newPaymentForm.order_id}
                onValueChange={(v) => setNewPaymentForm({ ...newPaymentForm, order_id: v })}
              >
                <SelectTrigger id="pay-order" className="rounded-xl">
                  <SelectValue placeholder="Buyurtmani tanlang" />
                </SelectTrigger>
                <SelectContent className="rounded-xl max-h-56">
                  {orders.map((o) => (
                    <SelectItem key={o.id} value={o.id}>
                      #{o.order_number || o.id.slice(0, 8)} — {o.customer_name} ({formatSum(o.price)})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pay-amount">To'lov summasi (so'mda) *</Label>
              <Input
                id="pay-amount"
                type="number"
                value={newPaymentForm.amount}
                onChange={(e) => setNewPaymentForm({ ...newPaymentForm, amount: Number(e.target.value) })}
                required
                className="rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="pay-method">To'lov usuli</Label>
                <Select
                  value={newPaymentForm.method}
                  onValueChange={(v) => setNewPaymentForm({ ...newPaymentForm, method: v })}
                >
                  <SelectTrigger id="pay-method" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Naqd pul">Naqd pul</SelectItem>
                    <SelectItem value="Payme">Payme</SelectItem>
                    <SelectItem value="Click">Click</SelectItem>
                    <SelectItem value="Uzum Pay">Uzum Pay</SelectItem>
                    <SelectItem value="Bank o'tkazmasi">Bank o'tkazmasi</SelectItem>
                    <SelectItem value="Terminal">Terminal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="pay-status-new">Holati</Label>
                <Select
                  value={newPaymentForm.status}
                  onValueChange={(v) => setNewPaymentForm({ ...newPaymentForm, status: v as PaymentStatus })}
                >
                  <SelectTrigger id="pay-status-new" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="tolangan">To'langan</SelectItem>
                    <SelectItem value="kutilmoqda">Kutilmoqda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="pay-txid">Tranzaksiya / Chek raqami</Label>
              <Input
                id="pay-txid"
                placeholder="Avtomatik yoki chek No"
                value={newPaymentForm.transaction_id}
                onChange={(e) => setNewPaymentForm({ ...newPaymentForm, transaction_id: e.target.value })}
                className="rounded-xl"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsNewPaymentOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isSavingNew}
                className="rounded-xl gradient-primary text-primary-foreground cursor-pointer"
              >
                {isSavingNew ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
                Saqlash
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
