import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as logo, c as cn } from "./utils-zpgQuvnJ.mjs";
import { u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { c as Root2, T as Trigger, P as Portal2, a as Content2, L as Label2, S as Separator2, I as Item2, e as SubTrigger2, d as SubContent2, C as CheckboxItem2, b as ItemIndicator2, R as RadioItem2 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { H as House, r as MessageSquare, a as BookOpen, o as Gavel, f as ChevronRight, d as Check, g as Circle } from "../_libs/lucide-react.mjs";
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
const DiscordIcon = ({ className }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 127.14 96.36",
    className,
    fill: "currentColor",
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.31,60,73.31,53s5-12.74,11.43-12.74S96.2,46,96.12,53,91.08,65.69,84.69,65.69Z" })
  }
);
const nav = [
  { label: "ACASĂ", href: "/", icon: House },
  { label: "FORUM", href: "/forum", icon: MessageSquare },
  { label: "REGULAMENT", href: "/regulament", icon: BookOpen },
  { label: "CODUL PENAL", href: "/cod-penal", icon: Gavel },
  { label: "DISCORD", href: "https://discord.gg/flowro", icon: DiscordIcon }
];
function SiteHeader() {
  const { user, signOut, loading } = useAuth();
  const [avatarUrl, setAvatarUrl] = reactExports.useState(null);
  const [displayName, setDisplayName] = reactExports.useState(null);
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setAvatarUrl(null);
      setDisplayName(null);
      return;
    }
    if (typeof window !== "undefined") {
      const localSync = localStorage.getItem(`flowro_fivem_sync_${user.id}`);
      if (localSync) {
        try {
          const parsed = JSON.parse(localSync);
          if (parsed.avatar_url) setAvatarUrl(parsed.avatar_url);
        } catch (e) {
        }
      }
      const localAvatar = localStorage.getItem(`flowro_avatar_${user.id}`);
      if (localAvatar) {
        setAvatarUrl(localAvatar);
      }
    }
    supabase.from("profiles").select("avatar_url, display_name, username, faction").eq("id", user.id).single().then(({ data }) => {
      if (data) {
        if (data.avatar_url) setAvatarUrl(data.avatar_url);
        if (data.display_name) setDisplayName(data.display_name);
        if (data.username === "19mariuss48" || data.faction === "Fondator" || data.faction === "Administrator" || data.faction?.includes("Poliți") || data.faction?.includes("Admin")) {
          setIsAdmin(true);
        }
      }
    });
  }, [user]);
  const initial = (displayName || user?.user_metadata?.username || user?.email || "F").toString().charAt(0).toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 inset-x-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl flex items-center justify-between px-4 py-3 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 group relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "FLOW", className: "h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.25)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm tracking-[0.3em] text-silver", children: "FLOW" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-muted-foreground", children: "ROMANIA" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:flex flex-1 justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-start gap-2", children: nav.map((n) => {
      const Icon = n.icon;
      const isHash = n.href.startsWith("/#");
      const isExternal = n.href.startsWith("http");
      const itemContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 group cursor-pointer w-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.08] group-hover:border-white/15 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.4)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-silver group-hover:text-white transition-colors duration-300" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-[0.2em] pl-[0.2em] text-center text-silver group-hover:text-white transition-colors duration-300 whitespace-nowrap", children: n.label })
      ] });
      if (isExternal) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, target: "_blank", rel: "noopener noreferrer", children: itemContent }, n.label);
      }
      if (isHash) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: n.href, children: itemContent }, n.label);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: n.href, children: itemContent }, n.label);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex justify-end items-center gap-2 relative z-10", children: loading ? null : user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-9 w-9 rounded-full bg-white text-black overflow-hidden flex items-center justify-center hover:bg-white/90 transition shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)] cursor-pointer", children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: "Avatar", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: initial }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "truncate", children: displayName || user.email }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "cursor-pointer w-full text-left font-bold text-amber-400 focus:text-amber-500 focus:bg-amber-400/10", children: "Panou Admin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", className: "cursor-pointer w-full text-left", children: "Profil & Sincronizare" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DropdownMenuItem,
          {
            onClick: () => signOut(),
            className: "text-destructive focus:text-destructive cursor-pointer",
            children: "Deconectare"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/auth",
          className: "hidden sm:inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs tracking-widest text-foreground/90 hover:bg-white/5 transition animate-pulse",
          children: "CONECTARE"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/auth",
          className: "inline-flex items-center justify-center rounded-full bg-white text-black px-4 py-2 text-xs tracking-widest font-medium hover:bg-white/90 transition shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)]",
          children: "ALĂTURĂ-TE"
        }
      )
    ] }) })
  ] }) }) });
}
const cols = [
  { title: "COMUNITATE", links: ["Forum", "Discord", "Regulament", "Evenimente"] },
  { title: "SUPORT", links: ["Centru de Ajutor", "Reclamații", "Cereri Unban", "Bug Tracker"] },
  { title: "LEGAL", links: ["Termeni și Condiții", "Politică de Confidențialitate", "Politică de Cookie-uri", "Politică de Rambursare"] }
];
function SiteFooter() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative border-t border-white/5 mt-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-5 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "FLOW", className: "h-10 w-10 object-contain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm tracking-[0.3em] text-silver", children: "FLOW" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-muted-foreground", children: "ROMANIA" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-sm leading-relaxed font-light", children: "O experiență premium de roleplay în FiveM. Creată în România, concepută pentru întreaga lume. Se lansează în iunie 2026." })
      ] }),
      cols.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-silver mb-5", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: c.links.map((l) => {
          if (l === "Forum") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/forum",
                className: "text-sm text-muted-foreground hover:text-foreground transition cursor-pointer",
                children: l
              }
            ) }, l);
          }
          if (l === "Regulament") {
            return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/regulament",
                className: "text-sm text-muted-foreground hover:text-foreground transition cursor-pointer",
                children: l
              }
            ) }, l);
          }
          let href = "#";
          let target = void 0;
          let rel = void 0;
          if (l === "Discord") {
            href = "https://discord.gg/flowro";
            target = "_blank";
            rel = "noopener noreferrer";
          }
          return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href,
              target,
              rel,
              className: "text-sm text-muted-foreground hover:text-foreground transition",
              children: l
            }
          ) }, l);
        }) })
      ] }, c.title))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "© 2026 FLOW ROMANIA · TOATE DREPTURILE REZERVATE" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "FĂRĂ AFILIERE CU ROCKSTAR GAMES SAU TAKE-TWO INTERACTIVE" })
    ] })
  ] }) });
}
export {
  SiteFooter as S,
  SiteHeader as a
};
