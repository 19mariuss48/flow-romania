import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, session: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncProfile = async (s: Session | null) => {
      if (s?.user) {
          let isUserBanned = false;
          
          try {
            const { data: profile } = await supabase
              .from("profiles")
              .select("is_banned")
              .eq("id", s.user.id)
              .single();
              
            if (profile?.is_banned) isUserBanned = true;
          } catch (e) {
            // Fallback for when column doesn't exist yet
            const bannedList = JSON.parse(localStorage.getItem("flowro_banned_users") || "[]");
            if (bannedList.includes(s.user.id)) isUserBanned = true;
          }

          if (isUserBanned) {
            toast.error("Contul tău a fost suspendat permanent de către conducere.");
            await supabase.auth.signOut();
            setSession(null);
            return;
          }

          // Always try to insert ignoring duplicates (upsert is best if no unique constraints block it)
          const { error } = await supabase.from("profiles").insert({
            id: s.user.id,
            username: s.user.email?.split("@")[0] || "jucator",
            display_name: s.user.email?.split("@")[0] || "Jucător",
            reputation: 0
          });
          
          if (error && error.code !== '23505') { // 23505 is unique violation
            console.warn("Profile sync insert warning:", error.message);
          }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
      syncProfile(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
      syncProfile(data.session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Ctx.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
