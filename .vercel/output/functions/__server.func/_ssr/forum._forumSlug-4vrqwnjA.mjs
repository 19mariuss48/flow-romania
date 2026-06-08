import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { R as Route$2, u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { B as Button } from "./button-DY0TMOSU.mjs";
import "../_libs/sonner.mjs";
import { f as ChevronRight, A as ArrowLeft, i as CirclePlus, F as FileText, P as Pin, L as Lock, C as Calendar, E as Eye, r as MessageSquare } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./utils-zpgQuvnJ.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/class-variance-authority.mjs";
const mockThreadsData = {};
const genericThreadsFallback = [];
function SubForumPage() {
  const {
    forumSlug
  } = Route$2.useParams();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [forumDetails, setForumDetails] = reactExports.useState(null);
  const [categoryName, setCategoryName] = reactExports.useState("FORUM");
  const [threads, setThreads] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [currentUserProfile, setCurrentUserProfile] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const loadSubForumData = async () => {
      setLoading(true);
      if (user && !currentUserProfile) {
        try {
          const {
            data
          } = await supabase.from("profiles").select("username, display_name, avatar_url").eq("id", user.id).single();
          if (data) {
            setCurrentUserProfile(data);
          }
        } catch (e) {
          console.warn("Could not load user profile:", e);
        }
      }
      const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]").filter((t) => t.forum_slug === forumSlug);
      try {
        const {
          data: fm,
          error: fmError
        } = await supabase.from("forums").select("id, title, category_id, description, icon").eq("slug", forumSlug).single();
        if (fmError) throw fmError;
        setForumDetails(fm);
        const {
          data: cat
        } = await supabase.from("forum_categories").select("title").eq("id", fm.category_id).single();
        if (cat) setCategoryName(cat.title);
        const {
          data: ths,
          error: thsError
        } = await supabase.from("forum_threads").select(`
            id,
            title,
            is_pinned,
            is_locked,
            views_count,
            replies_count,
            created_at,
            user_id
          `).eq("forum_id", fm.id).order("is_pinned", {
          ascending: false
        }).order("created_at", {
          ascending: false
        });
        if (thsError) throw thsError;
        if (ths && ths.length > 0) {
          const userIds = ths.map((t) => t.user_id);
          const {
            data: prfs
          } = await supabase.from("profiles").select("id, username, display_name, avatar_url").in(userIds.filter((value, index, self) => self.indexOf(value) === index));
          const joinedThreads = ths.map((t) => {
            const prf = prfs?.find((p) => p.id === t.user_id);
            return {
              id: t.id,
              title: t.title,
              is_pinned: t.is_pinned,
              is_locked: t.is_locked,
              views_count: t.views_count,
              replies_count: t.replies_count,
              created_at: t.created_at,
              user_name: prf?.display_name || prf?.username || "Cetățean",
              avatar_url: prf?.avatar_url || ""
            };
          });
          setThreads([...localThreads, ...joinedThreads]);
        } else {
          setThreads(localThreads);
        }
      } catch (err) {
        console.warn("Failed to load live threads. Loading fallback mock data:", err);
        const mockFallback = mockThreadsData[forumSlug] || genericThreadsFallback;
        setThreads([...localThreads, ...mockFallback]);
        const fallbackTitle = forumSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
        setForumDetails({
          title: fallbackTitle,
          description: "Portal comunitar activ pentru FLOW ROMÂNIA. Adaugă topice, dezbate subiecte și susține-ți opinia.",
          icon: "◆"
        });
      } finally {
        setLoading(false);
      }
    };
    loadSubForumData();
  }, [forumSlug]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "ACASĂ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "FORUM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground uppercase", children: categoryName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold uppercase", children: forumDetails?.title || forumSlug })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-8 mb-8 border-white/10 relative overflow-hidden bg-gradient-to-r from-white/[0.02] to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver text-xl", children: forumDetails?.icon || "◆" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-light tracking-wide text-silver-gradient", children: forumDetails?.title || forumSlug.replace("-", " ").toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed font-light", children: forumDetails?.description || "Sub-secțiune de forum dedicată discuțiilor membrilor din FLOW ROMÂNIA." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => navigate({
            to: "/"
          }), variant: "outline", className: "border-white/5 hover:bg-white/5 text-silver text-xs tracking-widest gap-2 h-10 px-4 rounded-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "ÎNAPOI LA FORUM"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forum/new-topic/$forumSlug", params: {
            forumSlug
          }, className: "inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-xs tracking-widest font-bold hover:bg-white/90 transition shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)] gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-4 w-4" }),
            "CREEAZĂ TOPIC NOU"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold", children: "Discuții Active" }),
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-64 flex flex-col items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-10 h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-t border-white animate-spin" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground tracking-widest animate-pulse", children: "SE ÎNCARCĂ SUBIECTELE..." })
        ] }) : threads.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-16 border-white/5 flex flex-col items-center justify-center text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-10 w-10 text-muted-foreground/30 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1", children: "Niciun subiect găsit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-sm mb-6 leading-relaxed", children: "Nu există nicio discuție deschisă în acest sub-forum. Fii primul care propune un subiect!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forum/new-topic/$forumSlug", params: {
            forumSlug
          }, className: "inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-xs tracking-widest font-bold hover:bg-white/90 transition", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "h-3.5 w-3.5 mr-1.5" }),
            "CREEAZĂ PRIMUL TOPIC"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: threads.map((t) => {
          const isCurrentUser = user && (t.user_name === currentUserProfile?.display_name || t.user_name === currentUserProfile?.username || t.user_name === `@${currentUserProfile?.username}` || t.user_name?.replace("@", "") === currentUserProfile?.username);
          const thread = isCurrentUser && currentUserProfile ? {
            ...t,
            user_name: currentUserProfile.display_name || currentUserProfile.username,
            avatar_url: currentUserProfile.avatar_url || ""
          } : t;
          const initial = thread.user_name ? thread.user_name.replace("@", "").charAt(0).toUpperCase() : "C";
          const isMock = String(thread.id).startsWith("mock-");
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forum/thread/$threadId", params: {
            threadId: thread.id
          }, className: "group relative glass rounded-xl p-4 md:p-5 hover:bg-white/[0.03] border-white/5 hover:border-white/15 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center text-silver text-sm shrink-0", children: thread.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: thread.avatar_url, alt: "Avatar", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: initial }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
                  thread.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[8px] font-bold tracking-widest bg-amber-400/10 border border-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded uppercase", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-2 w-2 shrink-0 fill-amber-400" }),
                    "Fixat"
                  ] }),
                  thread.is_locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[8px] font-bold tracking-widest bg-rose-400/10 border border-rose-400/20 text-rose-400 px-1.5 py-0.5 rounded uppercase", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2 w-2 shrink-0" }),
                    "Închis"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm md:text-base font-medium text-foreground tracking-wide group-hover:text-silver-gradient transition duration-300 truncate", children: thread.title })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground font-light", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "deschis de ",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { className: "text-silver hover:underline", children: [
                      "@",
                      thread.user_name
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 bg-white/20 rounded-full" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3 w-3" }),
                    new Date(thread.created_at).toLocaleDateString("ro-RO")
                  ] }),
                  isMock && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-1 bg-white/20 rounded-full" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-amber-400/70 text-[9px] font-bold font-mono", children: "SIMULAT" })
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6 shrink-0 text-right pr-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground tracking-widest uppercase", children: "VIZUALIZĂRI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-silver font-mono flex items-center gap-1 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5 text-muted-foreground/60" }),
                  thread.views_count.toLocaleString()
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground tracking-widest uppercase", children: "RĂSPUNSURI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-silver font-mono flex items-center gap-1 justify-end", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5 text-muted-foreground/60" }),
                  thread.replies_count.toLocaleString()
                ] })
              ] })
            ] })
          ] }, thread.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  SubForumPage as component
};
