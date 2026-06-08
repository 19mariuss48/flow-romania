import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { authClient, signOut as betterSignOut, useSession } from "@/lib/auth-client";

type AuthCtx = {
  user: any | null;
  session: any | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const Ctx = createContext<AuthCtx>({ user: null, session: null, loading: true, signOut: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession();
  
  const user = data?.user ?? null;
  const session = data?.session ?? null;

  useEffect(() => {
    // We could do banned logic here if needed
  }, [user]);

  return (
    <Ctx.Provider
      value={{
        user,
        session,
        loading: isPending,
        signOut: async () => {
          await betterSignOut();
          window.location.href = "/";
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
