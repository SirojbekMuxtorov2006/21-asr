import { useEffect, useState, createContext, useContext, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AppRole = "super_admin" | "admin" | "manager" | "employee" | "customer";

async function sha256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Secure hashed credentials for authorized administrators
export const AUTHORIZED_ADMINS: Record<
  string,
  { passwordHash: string; role: AppRole; name: string }
> = {
  "sirojbekmuxtorov74@gmail.com": {
    passwordHash: "ee9b8d73fd2328a0d20b4a32f8537a91d1038597fc4ad847fcf82497f64d0894",
    role: "super_admin",
    name: "Sirojbek Muxtorov",
  },
  "toxirovsurat96@gmail.com": {
    passwordHash: "01f54f2b6bd93266c1331d4ded4746d1a65f3e143641afbbfbbbc5836956328b",
    role: "admin",
    name: "Surat Toxirov",
  },
  "21buxgalter@gmail.com": {
    passwordHash: "412064f8cb23855d742a82063ded922e5f05da2c471fdcb83b530ebf6db00799",
    role: "admin",
    name: "21-Asr Buxgalteriya",
  },
};

export async function verifyAdminCredentials(
  email: string,
  enteredPassword: string
): Promise<{ ok: boolean; role?: AppRole; name?: string; error?: string }> {
  const normalized = email.toLowerCase().trim();
  const admin = AUTHORIZED_ADMINS[normalized];
  if (!admin) {
    return {
      ok: false,
      error: "Kirish taqiqlangan! Faqat tayinlangan administratorlar kirishi mumkin.",
    };
  }

  const hash = await sha256(enteredPassword);
  if (hash !== admin.passwordHash) {
    return {
      ok: false,
      error: "Email yoki parol noto'g'ri. Iltimos tekshirib qaytadan kiriting.",
    };
  }

  return { ok: true, role: admin.role, name: admin.name };
}

type AuthCtx = {
  user: User | null;
  session: Session | null;
  roles: AppRole[];
  loading: boolean;
  isStaff: boolean;
  isAdmin: boolean;
  loginAsDirectAdmin: (email: string, role: AppRole, fullName?: string) => void;
  logout: () => Promise<void>;
};

function getLocalDirectUser(): { user: User; role: AppRole } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("admin_direct_session");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.email || !parsed?.role) return null;
    const mockUser: User = {
      id: parsed.id || "00000000-0000-0000-0000-000000000001",
      app_metadata: {},
      user_metadata: { full_name: parsed.fullName || parsed.email },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      email: parsed.email,
    } as any;
    return { user: mockUser, role: parsed.role };
  } catch {
    return null;
  }
}

const Ctx = createContext<AuthCtx>({
  user: null,
  session: null,
  roles: [],
  loading: true,
  isStaff: false,
  isAdmin: false,
  loginAsDirectAdmin: () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [directUser, setDirectUser] = useState<{ user: User; role: AppRole } | null>(() => getLocalDirectUser());
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!active) return;
      setSession(s);
      if (!s && !directUser) setRoles([]);
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [directUser]);

  useEffect(() => {
    if (directUser) {
      setRoles([directUser.role]);
      return;
    }

    if (!session?.user) {
      setRoles([]);
      return;
    }

    let active = true;
    const userEmail = (session.user.email || "").toLowerCase().trim();
    const designated = AUTHORIZED_ADMINS[userEmail];

    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .then(async ({ data }) => {
        if (!active) return;
        let fetchedRoles = ((data ?? []) as { role: AppRole }[]).map((r) => r.role);

        if (designated && !fetchedRoles.includes(designated.role)) {
          fetchedRoles = [designated.role, ...fetchedRoles];
          try {
            await supabase.from("user_roles").upsert(
              { user_id: session.user.id, role: designated.role },
              { onConflict: "user_id,role" }
            );
          } catch (e) {
            console.warn("Failed to auto-upsert designated role:", e);
          }
        }

        setRoles(fetchedRoles);
      });

    return () => {
      active = false;
    };
  }, [session?.user?.id, session?.user?.email, directUser]);

  function loginAsDirectAdmin(email: string, role: AppRole, fullName?: string) {
    const mockUser: User = {
      id: "00000000-0000-0000-0000-000000000001",
      app_metadata: {},
      user_metadata: { full_name: fullName || email },
      aud: "authenticated",
      created_at: new Date().toISOString(),
      email: email,
    } as any;

    if (typeof window !== "undefined") {
      localStorage.setItem(
        "admin_direct_session",
        JSON.stringify({ email, role, fullName: fullName || email, id: mockUser.id })
      );
    }

    setDirectUser({ user: mockUser, role });
    setRoles([role]);
  }

  async function logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_direct_session");
    }
    setDirectUser(null);
    setRoles([]);
    await supabase.auth.signOut();
  }

  const currentUser = session?.user || directUser?.user || null;
  const isStaff =
    roles.some((r) => r !== "customer") ||
    !!(currentUser?.email && AUTHORIZED_ADMINS[(currentUser.email || "").toLowerCase().trim()]);
  const isAdmin =
    roles.includes("admin") ||
    roles.includes("super_admin") ||
    !!(currentUser?.email && AUTHORIZED_ADMINS[(currentUser.email || "").toLowerCase().trim()]);

  return (
    <Ctx.Provider
      value={{
        user: currentUser,
        session,
        roles,
        loading,
        isStaff,
        isAdmin,
        loginAsDirectAdmin,
        logout,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  return useContext(Ctx);
}
