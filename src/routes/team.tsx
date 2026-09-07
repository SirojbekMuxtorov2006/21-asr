import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  Search,
  Phone,
  Mail,
  Send,
  Instagram,
  Linkedin,
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  ArrowRight,
  Loader2,
  Briefcase,
} from "lucide-react";
import { PublicLayout, PageHero } from "@/components/site/PublicLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTeam } from "@/hooks/useTeam";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Jamoamiz — 21-ASR Raqamli Xizmatlar Markazi" },
      {
        name: "description",
        content:
          "21-ASR Raqamli Xizmatlar Markazi mutaxassislari: huquqshunoslar, buxgalterlar va soha ekspertlari jamoasi bilan tanishing.",
      },
      { property: "og:title", content: "Bizning Jamoa — 21-ASR" },
      { property: "og:description", content: "Har bir yo'nalishda tajribali mutaxassislar." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TeamPage,
});

function TeamPage() {
  const { t } = useI18n();
  const { team, isLoading } = useTeam(true); // Fetch only active team members
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeam = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return team;
    return team.filter((m) => {
      const text = `${m.first_name} ${m.last_name} ${m.position} ${m.bio || ""}`.toLowerCase();
      return text.includes(q);
    });
  }, [team, searchTerm]);

  return (
    <PublicLayout>
      {/* HERO SECTION */}
      <PageHero
        eyebrow="21-ASR Mutaxassislari"
        title="Bizning Professional Jamoamiz"
        subtitle="Sizning biznesingiz va huquqiy masalalaringizni o'z sohasining yetuk mutaxassislariga ishonib topshiring."
      />

      {/* STATS HIGHLIGHT */}
      <section className="mx-auto max-w-7xl px-4 -mt-8 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4 rounded-3xl bg-card p-4 sm:p-6 shadow-elevated border border-border">
          {[
            { icon: Award, value: "10+", label: "Yillik tajriba" },
            { icon: Users, value: `${team.length > 0 ? team.length : "15"}+`, label: "Mutaxassislar" },
            { icon: ShieldCheck, value: "100%", label: "Qonuniy & xavfsiz" },
            { icon: HeartHandshake, value: "30 000+", label: "Mamnun mijozlar" },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2.5 sm:gap-3.5 p-1.5 sm:p-2">
              <span className="flex size-9 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-4 sm:size-5" />
              </span>
              <div className="min-w-0">
                <div className="text-lg sm:text-2xl font-black text-foreground truncate">{item.value}</div>
                <div className="text-[11px] sm:text-xs text-muted-foreground font-medium truncate">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH BAR */}
      <section className="mx-auto max-w-7xl px-4 pt-14 pb-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-muted/40 border border-border">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Ism, familiya yoki mutaxassislik..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11 rounded-2xl pl-10 bg-background"
            />
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            Jami ko'rsatilmoqda: <strong className="text-foreground">{filteredTeam.length} nafar</strong> mutaxassis
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS GRID */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <Loader2 className="size-9 animate-spin text-primary" />
          </div>
        ) : filteredTeam.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
            <Users className="mx-auto size-12 opacity-40 mb-3" />
            <h3 className="text-base font-bold text-foreground">Hech qanday mutaxassis topilmadi</h3>
            <p className="mt-1 text-xs">Qidiruv so'zini o'zgartirib ko'ring yoki barcha a'zolarni ko'ring.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTeam.map((member) => (
              <Card
                key={member.id}
                className="group relative rounded-3xl border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Photo Area */}
                <div className="relative aspect-4/3.5 w-full overflow-hidden bg-muted/30">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={`${member.first_name} ${member.last_name}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-primary">
                      <Users className="size-20 opacity-30" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Position Badge */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <Badge
                      variant="outline"
                      className="text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border-white/20 px-2.5 py-0.5"
                    >
                      {member.position}
                    </Badge>
                  </div>
                </div>

                {/* Info Body */}
                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-foreground group-hover:text-primary transition-colors">
                      {member.first_name} {member.last_name}
                    </h3>
                    {member.bio ? (
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-muted-foreground/60 italic">
                        21-ASR Raqamli Xizmatlar Markazining yetakchi mutaxassisi.
                      </p>
                    )}
                  </div>

                  {/* Contacts & Socials */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <div className="flex items-center gap-1.5">
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          title={member.phone}
                        >
                          <Phone className="size-4" />
                        </a>
                      )}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                          title={member.email}
                        >
                          <Mail className="size-4" />
                        </a>
                      )}
                      {member.telegram && (
                        <a
                          href={`https://t.me/${member.telegram.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-sky-500 hover:text-white transition-colors"
                          title={`Telegram: @${member.telegram}`}
                        >
                          <Send className="size-4" />
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={`https://instagram.com/${member.instagram.replace("@", "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-pink-500 hover:text-white transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="size-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin.startsWith("http") ? member.linkedin : `https://linkedin.com/in/${member.linkedin}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex size-8 items-center justify-center rounded-xl bg-muted text-muted-foreground hover:bg-blue-600 hover:text-white transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="size-4" />
                        </a>
                      )}
                    </div>

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-xs font-semibold text-primary hover:bg-primary/10 h-8 px-2.5"
                    >
                      <Link to="/contact">Bog'lanish</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* JOIN OUR TEAM CTA */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="gradient-hero relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center text-white shadow-elevated">
          <div className="absolute -left-12 -top-12 size-60 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-12 -bottom-12 size-60 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur">
              <Briefcase className="size-3.5" /> Bizning Jamoaga Qo'shiling
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Siz ham 21-ASR jamoasi a'zosi bo'lishni xohlaysizmi?
            </h2>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed">
              Biz doimo o'z sohasining iqtidorli mutaxassislarini, yuristlar, buxgalterlar va mijozlar bilan ishlash menejerlarini qidiramiz.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white px-8 text-emerald-950 font-bold hover:bg-white/90 shadow-md"
              >
                <Link to="/contact">
                  Rezyume yuborish <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/40 bg-transparent px-8 text-white hover:bg-white/10"
              >
                <a href="tel:+998557012100">
                  <Phone className="mr-2 size-4" /> +998 (55) 701-21-00
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
