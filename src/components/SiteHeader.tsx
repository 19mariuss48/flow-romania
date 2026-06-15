import { Link } from "@tanstack/react-router";
import logo from "@/assets/flow-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api/profile.functions";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, MessageSquare, BookOpen, Gavel } from "lucide-react";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    className={className}
    fill="currentColor"
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const nav = [
  { label: "ACASĂ", href: "/", icon: Home },
  { label: "FORUM", href: "/forum", icon: MessageSquare },
  { label: "REGULAMENT", href: "/regulament", icon: BookOpen },
  { label: "CODUL PENAL", href: "/cod-penal", icon: Gavel },
  { label: "DISCORD", href: "https://discord.gg/flowro", icon: DiscordIcon },
];

export function SiteHeader() {
  const { user, signOut, loading } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      setAvatarUrl(null);
      setDisplayName(null);
      setIsAdmin(false);
      return;
    }
    
    // Fetch profile data from server function
    getUserProfile({ data: { userId: user.id } }).then(profile => {
      if (profile) {
        setAvatarUrl(profile.avatar_url);
        setDisplayName(profile.display_name || profile.username);
        setIsAdmin(profile.faction === "Fondator" || profile.faction === "Admin" || profile.faction === "Staff");
        
        // Update local cache
        if (typeof window !== "undefined") {
          if (profile.avatar_url) {
            localStorage.setItem(`flowro_avatar_${user.id}`, profile.avatar_url);
          }
        }
      }
    }).catch(console.error);

    // Quick load from local storage fallback cache if available
    if (typeof window !== "undefined") {
      const localSync = localStorage.getItem(`flowro_fivem_sync_${user.id}`);
      if (localSync) {
        try {
          const parsed = JSON.parse(localSync);
          if (parsed.avatar_url) setAvatarUrl(parsed.avatar_url);
        } catch (e) {}
      }
      
      const localAvatar = localStorage.getItem(`flowro_avatar_${user.id}`);
      if (localAvatar) {
        setAvatarUrl(localAvatar);
      }
    }


  }, [user]);

  const initial = (
    displayName ||
    (user?.user_metadata?.username as string | undefined) ||
    user?.email ||
    "F"
  )
    .toString()
    .charAt(0)
    .toUpperCase();

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 mt-4">
        <div className="glass rounded-2xl flex items-center justify-between px-4 py-3 relative">
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <img src={logo} alt="FLOW" className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]" />
              <div className="leading-tight">
                <div className="text-sm tracking-[0.3em] text-silver">FLOW</div>
                <div className="text-[10px] tracking-[0.4em] text-muted-foreground">ROMANIA</div>
              </div>
            </Link>
          </div>
          <div className="hidden lg:flex flex-1 justify-center">
            <nav className="flex items-start gap-2">
              {nav.map((n) => {
                const Icon = n.icon;
                const isHash = n.href.startsWith("/#");
                const isExternal = n.href.startsWith("http");
              
              const itemContent = (
                <div className="flex flex-col items-center gap-1.5 group cursor-pointer w-24">
                  {/* Icon Block */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] group-hover:border-white/15 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                    <Icon className="h-4 w-4 text-silver group-hover:text-white transition-colors duration-300" />
                  </div>
                  {/* Label Text */}
                  <span className="text-[10px] font-bold tracking-[0.2em] pl-[0.2em] text-center text-silver group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {n.label}
                  </span>
                </div>
              );

              if (isExternal) {
                return (
                  <a key={n.label} href={n.href} target="_blank" rel="noopener noreferrer">
                    {itemContent}
                  </a>
                );
              }

              if (isHash) {
                return (
                  <a key={n.label} href={n.href}>
                    {itemContent}
                  </a>
                );
              }

              return (
                <Link key={n.label} to={n.href}>
                  {itemContent}
                </Link>
              );
            })}
            </nav>
          </div>
          <div className="flex-1 flex justify-end items-center gap-2 relative z-10">
            {loading ? null : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-9 w-9 rounded-full bg-white text-black overflow-hidden flex items-center justify-center hover:bg-white/90 transition shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)] cursor-pointer">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold">{initial}</span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="truncate">{displayName || user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer w-full text-left font-bold text-amber-400 focus:text-amber-500 focus:bg-amber-400/10">
                        Panou Admin
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer w-full text-left">
                      Profil & Sincronizare
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    Deconectare
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="hidden sm:inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs tracking-widest text-foreground/90 hover:bg-white/5 transition animate-pulse"
                >
                  CONECTARE
                </Link>
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-xs tracking-widest font-medium hover:bg-white/90 transition shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)]"
                >
                  ALĂTURĂ-TE
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
