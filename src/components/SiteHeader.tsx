import { Link } from "@tanstack/react-router";
import logo from "@/assets/flow-logo.png";
import { useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { getUserProfile } from "@/lib/api/profile.server";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, MessageSquare, BookOpen, Gavel, ShoppingCart } from "lucide-react";

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
  { label: "SHOP", href: "https://flowromania.tebex.io", icon: ShoppingCart },
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
        setIsAdmin(profile.faction === "Fondator" || profile.faction === "Moderator" || profile.faction === "Chestor General" || profile.faction === "Director General" || profile.username === "19mariuss48");
      }
    }).catch(console.error);




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

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const authContent = loading ? null : user ? (
    <DropdownMenu modal={false}>
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
  );

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-2 sm:mt-4">
        <div className="glass rounded-2xl flex flex-col lg:flex-row items-center justify-between px-4 py-3 lg:min-h-[76px] relative gap-3 lg:gap-0">
          
          {/* Top Row for Mobile (Logo + Auth) / Left section for Desktop */}
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-start lg:flex-1">
            <Link to="/" className="flex items-center gap-3 group relative z-10 shrink-0">
              <img src={logo} alt="FLOW" className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]" />
              <div className="leading-tight">
                <div className="text-sm tracking-[0.3em] text-silver">FLOW</div>
                <div className="text-[10px] tracking-[0.4em] text-muted-foreground">ROMANIA</div>
              </div>
            </Link>
            
            <div className="flex lg:hidden justify-end items-center gap-2 relative z-10">
              {authContent}
            </div>
          </div>

          {/* Navigation Items - flex-wrap on mobile, original layout on PC */}
          <div className="flex w-full lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-1/2 lg:-translate-y-1/2 justify-center mt-3 lg:mt-0 lg:w-auto z-20">
            <nav className="grid grid-cols-3 sm:flex sm:flex-wrap lg:flex-nowrap items-start justify-center gap-y-3 gap-x-2 sm:gap-2 w-full sm:w-auto">
              {nav.map((n) => {
                const Icon = n.icon;
                const isHash = n.href.startsWith("/#");
                const isExternal = n.href.startsWith("http");
              
              const wrapperClass = "flex flex-col items-center gap-1.5 group cursor-pointer w-full sm:w-auto sm:min-w-[5rem] lg:min-w-[6rem] shrink-0";
              
              const itemContent = (
                <>
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] group-hover:border-white/15 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)]">
                    <Icon className="h-4 w-4 text-silver group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold tracking-[0.2em] pl-[0.2em] text-center text-silver group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                    {n.label}
                  </span>
                </>
              );

              if (isExternal) {
                return (
                  <a key={n.label} href={n.href} target="_blank" rel="noopener noreferrer" className={wrapperClass}>
                    {itemContent}
                  </a>
                );
              }

              if (isHash) {
                return (
                  <a key={n.label} href={n.href} className={wrapperClass}>
                    {itemContent}
                  </a>
                );
              }

              return (
                <Link key={n.label} to={n.href} className={wrapperClass}>
                  {itemContent}
                </Link>
              );
            })}
            </nav>
          </div>

          {/* Right section for Desktop (Auth) */}
          <div className="hidden lg:flex flex-1 justify-end items-center gap-2 relative z-10">
            {authContent}
          </div>
          
        </div>
      </div>
    </header>
  );
}
