import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useLocation, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { s as supabase } from "./router-C5OKu4OK.mjs";
import "../_libs/sonner.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
const localFallbackCategories = [
  {
    group: "FLOW ROMÂNIA [OOC]",
    tag: "01",
    slug: "flow-romania-ooc",
    cats: [
      {
        title: "Anunțuri Oficiale",
        slug: "anunturi",
        desc: "Noutăți, jurnale de modificări și știri oficiale.",
        icon: "📢",
        subs: [{ name: "Știri", topics: 42 }, { name: "Update-uri", topics: 18 }]
      },
      {
        title: "[FiveM] Staff FLOW",
        slug: "staff",
        desc: "Aplicații, anunțuri și informații despre echipa administrativă FLOW.",
        icon: "🛡️",
        subs: []
      },
      {
        title: "[FiveM] Beneficii",
        slug: "beneficii",
        desc: "Informații despre pachete, VIP și alte avantaje pe server.",
        icon: "💎",
        subs: []
      },
      {
        title: "Sugestii și Feedback",
        slug: "sugestii",
        desc: "Ajută-ne să modelăm viitorul FLOW propunând idei noi.",
        icon: "💡",
        subs: [{ name: "Acceptate", topics: 31 }, { name: "Respinse", topics: 22 }]
      }
    ]
  },
  {
    group: "FLOW ROMÂNIA [IC]",
    tag: "02",
    slug: "flow-romania-ic",
    cats: [
      {
        title: "[FiveM] Poliția Română",
        slug: "politia-romana",
        desc: "Secția de poliție Los Santos. Aplicații și aviziere oficiale.",
        icon: "🚔",
        subs: []
      },
      {
        title: "[FiveM] Spitalul General",
        slug: "spitalul-general",
        desc: "Departamentul medical al orașului. Informații și recrutări.",
        icon: "🏥",
        subs: []
      },
      {
        title: "[FiveM] Syndicate Business",
        slug: "syndicate-business",
        desc: "Centrul de afaceri, aplicatii si dezvoltare economica.",
        icon: "💼",
        subs: []
      }
    ]
  }
];
function ForumIndex() {
  const [dbCategories, setDbCategories] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const fetchForumStructure = async () => {
      try {
        setLoading(true);
        const { data: cats, error: catsError } = await supabase.from("forum_categories").select("*").order("order_index", { ascending: true });
        if (catsError) throw catsError;
        const { data: fms, error: fmsError } = await supabase.from("forums").select("*").order("order_index", { ascending: true });
        if (fmsError) throw fmsError;
        const filteredCats = cats.filter((cat) => cat.slug === "flow-romania-ooc" || cat.slug === "flow-romania-ic");
        const structured = filteredCats.map((cat, idx) => {
          const categoryForums = fms.filter((f) => f.category_id === cat.id);
          const tagNum = String(idx + 1).padStart(2, "0");
          return {
            group: cat.title,
            slug: cat.slug,
            tag: tagNum,
            cats: categoryForums.map((f) => {
              const matchingFallbackCat = localFallbackCategories.flatMap((g) => g.cats).find((c) => c.slug === f.slug);
              return {
                title: f.title,
                slug: f.slug,
                desc: f.description || "",
                icon: f.icon || "◆",
                threads_count: f.threads_count,
                posts_count: f.posts_count,
                subs: matchingFallbackCat?.subs || []
              };
            })
          };
        });
        if (structured.length > 0) {
          setDbCategories(structured);
        }
      } catch (err) {
        console.warn("Failed to load live forum structure. Using local fallback:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchForumStructure();
  }, []);
  const displayCategories = dbCategories.length > 0 ? dbCategories : localFallbackCategories;
  let localThreads = [];
  let localPosts = [];
  if (typeof window !== "undefined") {
    try {
      localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
      localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
    } catch (e) {
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "forum", className: "relative py-32 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.5em] text-silver mb-4", children: "DIRECTOR" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient", children: "FORUM" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-6 hairline w-32" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-20", children: displayCategories.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs tracking-[0.4em] text-muted-foreground", children: g.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl md:text-2xl font-light tracking-[0.25em] text-foreground", children: g.group })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 mx-8 hairline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] text-muted-foreground", children: "VEZI TOT" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-4", children: g.cats.map((c) => {
        const cLocalThreads = localThreads.filter((t) => t.forum_slug === c.slug);
        const localThreadsCount = cLocalThreads.length;
        const localPostsCount = localPosts.filter((p) => cLocalThreads.some((t) => t.id === p.thread_id)).length;
        const localLikesCount = cLocalThreads.reduce((acc, t) => acc + (t.likes || 0), 0) + localPosts.filter((p) => cLocalThreads.some((t) => t.id === p.thread_id)).reduce((acc, p) => acc + (p.likes || 0), 0);
        const baseThreads = c.threads_count ?? 0;
        const basePosts = c.posts_count ?? 0;
        const baseLikes = 0;
        const finalThreads = baseThreads + localThreadsCount;
        const finalPosts = basePosts + Math.max(0, localPostsCount - localThreadsCount);
        const finalLikes = baseLikes + localLikesCount;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/forum/$forumSlug",
            params: { forumSlug: c.slug },
            className: "group relative glass rounded-xl p-6 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(255,255,255,0.15)] block cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-silver text-lg group-hover:bg-white/10 transition", children: c.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.3em] text-muted-foreground opacity-0 group-hover:opacity-100 transition font-semibold", children: "INTRĂ →" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-medium tracking-wide text-foreground mb-1", children: c.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-5 leading-relaxed", children: c.desc }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-between items-center pt-2 border-t border-white/5 text-[10px] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Subiecte: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold font-mono", children: finalThreads })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Postări: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold font-mono", children: finalPosts })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Aprecieri: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400/80 font-semibold font-mono", children: finalLikes })
                ] })
              ] }) })
            ]
          },
          c.slug
        );
      }) })
    ] }, g.group)) })
  ] }) });
}
function ForumPage() {
  const location = useLocation();
  const isExactForum = location.pathname === "/forum" || location.pathname === "/forum/";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 relative z-10", children: isExactForum ? /* @__PURE__ */ jsxRuntimeExports.jsx(ForumIndex, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ForumPage as component
};
