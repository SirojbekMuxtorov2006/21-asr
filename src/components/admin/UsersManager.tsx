import { useState, useMemo } from "react";
import {
  Search,
  Users,
  Shield,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Calendar,
  Lock,
  Unlock,
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
import { formatDate, formatDateTime } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { Database } from "@/integrations/supabase/types";

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
type UserRoleRow = Database["public"]["Tables"]["user_roles"]["Row"];
type AppRole = Database["public"]["Enums"]["app_role"];

interface UsersManagerProps {
  profiles: ProfileRow[];
  userRoles: UserRoleRow[];
  onRefresh: () => void;
}

const roleLabels: Record<AppRole, { label: string; className: string }> = {
  super_admin: { label: "Bosh Admin", className: "bg-red-500/10 text-red-600 border-red-500/20" },
  admin: { label: "Admin", className: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" },
  manager: { label: "Menejer", className: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  employee: { label: "Xodim / Operator", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  customer: { label: "Mijoz", className: "bg-muted text-muted-foreground border-border" },
};

export function UsersManager({ profiles, userRoles, onRefresh }: UsersManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  // Edit Role Modal
  const [selectedUser, setSelectedUser] = useState<ProfileRow | null>(null);
  const [currentSelectedRole, setCurrentSelectedRole] = useState<AppRole>("customer");
  const [isSavingRole, setIsSavingRole] = useState(false);

  // Filtered profiles
  const filteredProfiles = useMemo(() => {
    return profiles.filter((p) => {
      const matchSearch =
        !searchTerm.trim() ||
        p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      const userRole = userRoles.find((r) => r.user_id === p.id)?.role || "customer";
      const matchRole = roleFilter === "all" || userRole === roleFilter;

      return matchSearch && matchRole;
    });
  }, [profiles, userRoles, searchTerm, roleFilter]);

  // Open Edit Role Dialog
  function openRoleDialog(profile: ProfileRow) {
    const existingRole = userRoles.find((r) => r.user_id === profile.id)?.role || "customer";
    setSelectedUser(profile);
    setCurrentSelectedRole(existingRole);
  }

  // Save Role
  async function handleSaveRole() {
    if (!selectedUser) return;
    setIsSavingRole(true);
    try {
      const existingRoleRow = userRoles.find((r) => r.user_id === selectedUser.id);

      if (existingRoleRow) {
        const { error } = await supabase
          .from("user_roles")
          .update({ role: currentSelectedRole })
          .eq("id", existingRoleRow.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("user_roles").insert({
          user_id: selectedUser.id,
          role: currentSelectedRole,
        });
        if (error) throw error;
      }

      toast.success(`Foydalanuvchi roli "${roleLabels[currentSelectedRole]?.label}" ga o'zgartirildi`);
      setSelectedUser(null);
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Rolni saqlashda xatolik yuz berdi");
    } finally {
      setIsSavingRole(false);
    }
  }

  // Block / Unblock User
  async function toggleBlockUser(profile: ProfileRow) {
    const nextBlocked = !profile.is_blocked;
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_blocked: nextBlocked })
        .eq("id", profile.id);
      if (error) throw error;

      toast.success(
        nextBlocked
          ? `Foydalanuvchi ${profile.full_name || profile.email} bloklandi`
          : `Foydalanuvchi blokdan chiqarildi`
      );
      onRefresh();
    } catch (err) {
      console.error(err);
      toast.error("Holatni o'zgartirishda xatolik");
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Foydalanuvchi ismi, email yoki telefon bo'yicha qidiruv..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-2xl pl-10 bg-background"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="h-11 w-full sm:w-[200px] rounded-2xl bg-background">
                <SelectValue placeholder="Rol bo'yicha" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl">
                <SelectItem value="all">Barcha rollar</SelectItem>
                <SelectItem value="super_admin">Bosh Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Menejer</SelectItem>
                <SelectItem value="employee">Xodim / Operator</SelectItem>
                <SelectItem value="customer">Mijoz</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <div>
            <CardTitle className="text-lg font-bold">Foydalanuvchilar va Xodimlar</CardTitle>
            <CardDescription>Jami {filteredProfiles.length} ta hisob qaydnomasi</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredProfiles.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-base font-semibold">Foydalanuvchilar topilmadi</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow>
                    <TableHead className="font-bold">Foydalanuvchi</TableHead>
                    <TableHead className="font-bold">Telefon</TableHead>
                    <TableHead className="font-bold">Tizimdagi roli</TableHead>
                    <TableHead className="font-bold">Ro'yxatdan o'tgan</TableHead>
                    <TableHead className="font-bold text-center">Holat</TableHead>
                    <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => {
                    const role = userRoles.find((r) => r.user_id === profile.id)?.role || "customer";
                    const rInfo = roleLabels[role] || roleLabels.customer;

                    return (
                      <TableRow key={profile.id} className="hover:bg-muted/40 transition-colors">
                        <TableCell>
                          <div>
                            <p className="font-bold text-foreground">
                              {profile.full_name || "Ismi kiritilmagan"}
                            </p>
                            <p className="text-xs text-muted-foreground">{profile.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {profile.phone || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("text-xs font-semibold px-2.5 py-0.5", rInfo.className)}>
                            {rInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(profile.created_at)}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              profile.is_blocked
                                ? "bg-red-500/10 text-red-600 border-red-500/20"
                                : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            )}
                          >
                            {profile.is_blocked ? "Bloklangan" : "Faol"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-6">
                          <div className="flex items-center justify-end gap-1.5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-xl text-xs h-8 cursor-pointer"
                              onClick={() => openRoleDialog(profile)}
                            >
                              <Shield className="size-3.5 mr-1" /> Rol
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className={cn(
                                "size-8 rounded-full cursor-pointer",
                                profile.is_blocked
                                  ? "text-emerald-600 hover:bg-emerald-500/10"
                                  : "text-red-600 hover:bg-red-500/10"
                              )}
                              title={profile.is_blocked ? "Blokdan chiqarish" : "Bloklash"}
                              onClick={() => toggleBlockUser(profile)}
                            >
                              {profile.is_blocked ? <Unlock className="size-4" /> : <Lock className="size-4" />}
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

      {/* EDIT ROLE MODAL */}
      <Dialog open={!!selectedUser} onOpenChange={(open) => !open && setSelectedUser(null)}>
        <DialogContent className="rounded-3xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">Foydalanuvchi rolini o'zgartirish</DialogTitle>
            <DialogDescription>
              {selectedUser?.full_name || selectedUser?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label htmlFor="user-role-select">Tizimdagi huquq / Rol</Label>
              <Select
                value={currentSelectedRole}
                onValueChange={(v) => setCurrentSelectedRole(v as AppRole)}
              >
                <SelectTrigger id="user-role-select" className="rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="super_admin">Bosh Admin (Barcha huquqlar)</SelectItem>
                  <SelectItem value="admin">Admin (To'liq boshqaruv)</SelectItem>
                  <SelectItem value="manager">Menejer (Buyurtmalar va mijozlar)</SelectItem>
                  <SelectItem value="employee">Xodim / Operator</SelectItem>
                  <SelectItem value="customer">Oddiy mijoz (Faqat o'z kabineti)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              onClick={() => setSelectedUser(null)}
              className="rounded-xl"
            >
              Bekor qilish
            </Button>
            <Button
              onClick={handleSaveRole}
              disabled={isSavingRole}
              className="rounded-xl gradient-primary text-primary-foreground cursor-pointer"
            >
              {isSavingRole ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Save className="mr-2 size-4" />}
              Saqlash
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
