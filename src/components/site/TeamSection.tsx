import { useTeam } from "@/hooks/useTeam";
import { User, Phone, Mail, Send, Instagram, Linkedin, Loader2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TeamSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function TeamSection({
  title = "Bizning professionallar jamoasi",
  subtitle = "Har bir yo'nalishda tajribali huquqshunoslar, buxgalterlar va soha mutaxassislari sizga yordam beradi.",
  className,
}: TeamSectionProps) {
  const { team, isLoading } = useTeam(true); // only active members

  return (
    <section className={cn("py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary mb-3">
            <Sparkles className="size-3.5" /> Jamoamiz
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        ) : team.length === 0 ? (
          <div className="rounded-3xl border border-border bg-card p-10 text-center text-muted-foreground">
            <p className="text-sm">Jamoa a'zolari ma'lumotlari tez orada yangilanadi.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card
                key={member.id}
                className="group relative rounded-3xl border-border bg-card overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Photo */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/30">
                  {member.image_url ? (
                    <img
                      src={member.image_url}
                      alt={`${member.first_name} ${member.last_name}`}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 text-primary">
                      <User className="size-16 opacity-30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Body */}
                <CardContent className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                      {member.first_name} {member.last_name}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {member.position}
                    </p>
                    {member.bio && (
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  {/* Social & Contact Icons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-border/60">
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
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
