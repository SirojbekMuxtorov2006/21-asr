import { useState, useMemo, useRef } from "react";
import {
  Users,
  PlusCircle,
  Edit2,
  Trash2,
  Search,
  Upload,
  Image as ImageIcon,
  Phone,
  Mail,
  Instagram,
  Send,
  Linkedin,
  CheckCircle2,
  XCircle,
  Loader2,
  Eye,
  User,
  Shield,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useTeam, type TeamMemberRow } from "@/hooks/useTeam";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function TeamManager() {
  const {
    team,
    isLoading,
    createMember,
    isCreating,
    updateMember,
    isUpdating,
    deleteMember,
    isDeleting,
    toggleActive,
  } = useTeam(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberRow | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<TeamMemberRow | null>(null);
  const [viewingMember, setViewingMember] = useState<TeamMemberRow | null>(null);

  // Form states
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    position: "",
    phone: "",
    email: "",
    instagram: "",
    telegram: "",
    linkedin: "",
    bio: "",
    sort_order: 0,
    is_active: true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered team
  const filteredTeam = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return team;
    return team.filter((m) => {
      const full = `${m.first_name} ${m.last_name} ${m.position} ${m.email || ""} ${m.phone || ""}`.toLowerCase();
      return full.includes(q);
    });
  }, [team, searchTerm]);

  // Open Add / Edit Modal
  function openModal(member?: TeamMemberRow) {
    if (member) {
      setEditingMember(member);
      setForm({
        first_name: member.first_name,
        last_name: member.last_name,
        position: member.position,
        phone: member.phone || "",
        email: member.email || "",
        instagram: member.instagram || "",
        telegram: member.telegram || "",
        linkedin: member.linkedin || "",
        bio: member.bio || "",
        sort_order: member.sort_order || 0,
        is_active: member.is_active,
      });
      setImagePreview(member.image_url || null);
    } else {
      setEditingMember(null);
      setForm({
        first_name: "",
        last_name: "",
        position: "",
        phone: "",
        email: "",
        instagram: "",
        telegram: "",
        linkedin: "",
        bio: "",
        sort_order: team.length + 1,
        is_active: true,
      });
      setImagePreview(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  }

  // Handle file selection & preview
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Rasm hajmi 10 MB dan oshmasligi kerak");
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }

  // Save member
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.first_name.trim() || !form.last_name.trim() || !form.position.trim()) {
      toast.error("Ism, familiya va lavozimni to'ldiring");
      return;
    }

    try {
      if (editingMember) {
        await updateMember({
          id: editingMember.id,
          data: {
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            position: form.position.trim(),
            phone: form.phone.trim() || null,
            email: form.email.trim() || null,
            instagram: form.instagram.trim() || null,
            telegram: form.telegram.trim() || null,
            linkedin: form.linkedin.trim() || null,
            bio: form.bio.trim() || null,
            sort_order: Number(form.sort_order) || 0,
            is_active: form.is_active,
          },
          newImageFile: selectedFile,
          oldImageUrl: editingMember.image_url,
        });
      } else {
        await createMember({
          data: {
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            position: form.position.trim(),
            phone: form.phone.trim() || null,
            email: form.email.trim() || null,
            instagram: form.instagram.trim() || null,
            telegram: form.telegram.trim() || null,
            linkedin: form.linkedin.trim() || null,
            bio: form.bio.trim() || null,
            sort_order: Number(form.sort_order) || 0,
            is_active: form.is_active,
          },
          imageFile: selectedFile,
        });
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  }

  // Delete member
  async function handleDelete() {
    if (!memberToDelete) return;
    try {
      await deleteMember({
        id: memberToDelete.id,
        imageUrl: memberToDelete.image_url,
      });
      setMemberToDelete(null);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <Users className="size-6 text-primary" /> Jamoa a'zolari boshqaruvi
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Saytda ko'rinadigan barcha xodimlar va mutaxassislarni qo'shing, tahrirlang yoki o'chiring.
          </p>
        </div>

        <Button
          onClick={() => openModal()}
          className="rounded-2xl gradient-primary text-primary-foreground shadow-md hover:opacity-95 cursor-pointer"
        >
          <PlusCircle className="mr-2 size-4" /> Yangi xodim qo'shish
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="rounded-3xl border-border/80 shadow-xs">
        <CardContent className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Ism, familiya yoki lavozim bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-11 rounded-2xl pl-10 bg-background"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground font-medium">Ko'rinish:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-xl h-9 text-xs"
              >
                Karta
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="rounded-xl h-9 text-xs"
              >
                Jadval
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Content */}
      {isLoading ? (
        <div className="flex min-h-[300px] items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : filteredTeam.length === 0 ? (
        <Card className="rounded-3xl border-border/80 p-12 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Users className="size-7" />
          </div>
          <h3 className="mt-4 text-base font-bold text-foreground">Xodimlar topilmadi</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {searchTerm ? "Qidiruv bo'yicha hech qanday xodim topilmadi." : "Hozircha jamoa a'zolari qo'shilmagan."}
          </p>
          <Button
            onClick={() => openModal()}
            variant="outline"
            className="mt-5 rounded-2xl cursor-pointer"
          >
            <PlusCircle className="mr-2 size-4" /> Birinchi xodimni qo'shish
          </Button>
        </Card>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTeam.map((member) => (
            <Card
              key={member.id}
              className={cn(
                "group relative rounded-3xl border-border/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card",
                !member.is_active && "opacity-60 bg-muted/20"
              )}
            >
              {/* Card Header with Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-muted/40">
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={`${member.first_name} ${member.last_name}`}
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-primary">
                    <User className="size-20 opacity-40" />
                  </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] backdrop-blur-md font-semibold px-2 py-0.5 border shadow-xs",
                      member.is_active
                        ? "bg-emerald-500/80 text-white border-emerald-400/50"
                        : "bg-black/60 text-white/80 border-white/20"
                    )}
                  >
                    {member.is_active ? "Faol" : "Nofaol"}
                  </Badge>
                </div>

                {/* Sort Order Badge */}
                <div className="absolute top-3 right-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-[11px] font-bold text-white shadow-xs">
                    #{member.sort_order}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <CardContent className="p-5 space-y-3">
                <div>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {member.first_name} {member.last_name}
                  </h3>
                  <p className="text-xs font-medium text-muted-foreground mt-0.5">
                    {member.position}
                  </p>
                </div>

                {member.bio && (
                  <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
                    {member.bio}
                  </p>
                )}

                {/* Contacts / Socials */}
                <div className="flex items-center gap-2 pt-1 border-t border-border/60">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      title={member.phone}
                    >
                      <Phone className="size-3.5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                      title={member.email}
                    >
                      <Mail className="size-3.5" />
                    </a>
                  )}
                  {member.telegram && (
                    <a
                      href={`https://t.me/${member.telegram.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-sky-500/10 hover:text-sky-500 transition-colors"
                      title={`Telegram: ${member.telegram}`}
                    >
                      <Send className="size-3.5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-pink-500/10 hover:text-pink-500 transition-colors"
                      title={`Instagram: ${member.instagram}`}
                    >
                      <Instagram className="size-3.5" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin.startsWith("http") ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex size-7 items-center justify-center rounded-lg bg-muted text-muted-foreground hover:bg-blue-600/10 hover:text-blue-600 transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="size-3.5" />
                    </a>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-muted-foreground">Faollik:</span>
                    <Switch
                      checked={member.is_active}
                      onCheckedChange={() => toggleActive(member.id, member.is_active)}
                      className="scale-75 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                      onClick={() => openModal(member)}
                      title="Tahrirlash"
                    >
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                      onClick={() => setMemberToDelete(member)}
                      title="O'chirish"
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <Card className="rounded-3xl border-border/80 shadow-xs overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="font-bold">Xodim</TableHead>
                  <TableHead className="font-bold">Lavozim</TableHead>
                  <TableHead className="font-bold">Aloqa</TableHead>
                  <TableHead className="font-bold text-center">Tartib</TableHead>
                  <TableHead className="font-bold text-center">Faol</TableHead>
                  <TableHead className="text-right font-bold pr-6">Amallar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeam.map((member) => (
                  <TableRow key={member.id} className="hover:bg-muted/40 transition-colors">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 border border-border">
                          <AvatarImage src={member.image_url || undefined} alt={member.first_name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                            {member.first_name.slice(0, 1)}
                            {member.last_name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-foreground">
                            {member.first_name} {member.last_name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                            {member.bio || "Tavsif yo'q"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs font-semibold">
                        {member.position}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      <p>{member.phone || "—"}</p>
                      <p className="text-[11px]">{member.email || ""}</p>
                    </TableCell>
                    <TableCell className="text-center font-bold text-muted-foreground text-xs">
                      #{member.sort_order}
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={member.is_active}
                        onCheckedChange={() => toggleActive(member.id, member.is_active)}
                        className="cursor-pointer scale-90"
                      />
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary"
                          onClick={() => openModal(member)}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                          onClick={() => setMemberToDelete(member)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* CREATE / EDIT MEMBER MODAL */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingMember ? "Xodim ma'lumotlarini tahrirlash" : "Yangi xodim qo'shish"}
            </DialogTitle>
            <DialogDescription>
              Saytdagi Jamoa bo'limida aks etadigan xodim anketasi.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            {/* Image Upload Area */}
            <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-muted/40 border border-border">
              <div className="relative size-24 shrink-0 rounded-2xl overflow-hidden border-2 border-dashed border-border bg-card flex items-center justify-center group shadow-xs">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-8 text-muted-foreground/50" />
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <Label htmlFor="team-avatar-input" className="text-xs font-bold block">
                  Xodim fotosurati
                </Label>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG yoki WebP formatida, maksimal 10 MB. Rasm to'g'ridan-to'g'ri Supabase Storage ga yuklanadi.
                </p>
                <input
                  ref={fileInputRef}
                  id="team-avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl h-8 text-xs cursor-pointer"
                >
                  <Upload className="mr-2 size-3.5" />
                  {imagePreview ? "Rasmni almashtirish" : "Rasm tanlash"}
                </Button>
              </div>
            </div>

            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="mem-firstname" className="text-xs font-semibold">
                  Ism *
                </Label>
                <Input
                  id="mem-firstname"
                  placeholder="Azizbek"
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mem-lastname" className="text-xs font-semibold">
                  Familiya *
                </Label>
                <Input
                  id="mem-lastname"
                  placeholder="Qodirov"
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Position & Sort Order */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <Label htmlFor="mem-position" className="text-xs font-semibold">
                  Lavozim / Mutaxassislik *
                </Label>
                <Input
                  id="mem-position"
                  placeholder="Bosh direktor (CEO) / Soliq maslahatchisi"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mem-sort" className="text-xs font-semibold">
                  Tartib raqami
                </Label>
                <Input
                  id="mem-sort"
                  type="number"
                  placeholder="1"
                  value={form.sort_order}
                  onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Contacts: Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="mem-phone" className="text-xs font-semibold">
                  Telefon raqami
                </Label>
                <Input
                  id="mem-phone"
                  placeholder="+998 90 123-45-67"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mem-email" className="text-xs font-semibold">
                  Email manzil
                </Label>
                <Input
                  id="mem-email"
                  type="email"
                  placeholder="azizbek@21-asr.uz"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Social Links: Telegram, Instagram, LinkedIn */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="mem-tg" className="text-xs font-semibold flex items-center gap-1">
                  <Send className="size-3 text-sky-500" /> Telegram
                </Label>
                <Input
                  id="mem-tg"
                  placeholder="username (masalan: azizbek)"
                  value={form.telegram}
                  onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mem-ig" className="text-xs font-semibold flex items-center gap-1">
                  <Instagram className="size-3 text-pink-500" /> Instagram
                </Label>
                <Input
                  id="mem-ig"
                  placeholder="username"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mem-li" className="text-xs font-semibold flex items-center gap-1">
                  <Linkedin className="size-3 text-blue-600" /> LinkedIn
                </Label>
                <Input
                  id="mem-li"
                  placeholder="profile URL yoki username"
                  value={form.linkedin}
                  onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  className="rounded-xl text-xs"
                />
              </div>
            </div>

            {/* Bio / Description */}
            <div className="space-y-1.5">
              <Label htmlFor="mem-bio" className="text-xs font-semibold">
                Xodim haqida qisqacha tavsif (Bio)
              </Label>
              <Textarea
                id="mem-bio"
                rows={3}
                placeholder="10 yillik tajribaga ega yetakchi mutaxassis..."
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                className="rounded-xl resize-none text-sm"
              />
            </div>

            {/* Active Switch */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-muted/40 border border-border">
              <div>
                <p className="text-xs font-semibold text-foreground">Saytda ko'rsatilsinmi?</p>
                <p className="text-[11px] text-muted-foreground">Agar faol bo'lmasa, saytda yashiriladi.</p>
              </div>
              <Switch
                checked={form.is_active}
                onCheckedChange={(v) => setForm({ ...form, is_active: v })}
                className="cursor-pointer"
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl"
              >
                Bekor qilish
              </Button>
              <Button
                type="submit"
                disabled={isCreating || isUpdating}
                className="rounded-xl gradient-primary text-primary-foreground font-semibold cursor-pointer"
              >
                {isCreating || isUpdating ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 size-4" />
                )}
                {editingMember ? "O'zgarishlarni saqlash" : "Xodimni saqlash"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRMATION MODAL */}
      <AlertDialog
        open={!!memberToDelete}
        onOpenChange={(open) => !open && setMemberToDelete(null)}
      >
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertTriangle className="size-5" /> Xodimni o'chirishni tasdiqlaysizmi?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Haqiqatan ham <strong className="text-foreground">{memberToDelete?.first_name} {memberToDelete?.last_name}</strong> ma'lumotlarini o'chirmoqchimisiz?
              Xodimning fotosurati Supabase Storage dan, yozuvi esa ma'lumotlar bazasidan butunlay o'chiriladi.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-xl">Bekor qilish</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90 cursor-pointer"
            >
              {isDeleting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Trash2 className="mr-2 size-4" />}
              Ha, butunlay o'chirilsin
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
