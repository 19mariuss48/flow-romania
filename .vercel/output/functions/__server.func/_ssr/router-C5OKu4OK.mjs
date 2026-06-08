import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, e as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
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
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-Bdvu8IHE.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function createSupabaseClient() {
  const SUPABASE_URL = "https://rwagmaxrtaioeeyctcew.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3YWdtYXhydGFpb2VleWN0Y2V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODA1ODAsImV4cCI6MjA5NjA1NjU4MH0.rpN6FfplWt5DY669CNdCQpYx8qURTD00N3y5uys2kEo";
  return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
    auth: {
      storage: typeof window !== "undefined" ? localStorage : void 0,
      persistSession: true,
      autoRefreshToken: true
    }
  });
}
let _supabase;
const supabase = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabase) _supabase = createSupabaseClient();
    return Reflect.get(_supabase, prop, receiver);
  }
});
const Ctx = reactExports.createContext({ user: null, session: null, loading: true, signOut: async () => {
} });
function AuthProvider({ children }) {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const syncProfile = async (s) => {
      if (s?.user) {
        let isUserBanned = false;
        try {
          const { data: profile } = await supabase.from("profiles").select("is_banned").eq("id", s.user.id).single();
          if (profile?.is_banned) isUserBanned = true;
        } catch (e) {
          const bannedList = JSON.parse(localStorage.getItem("flowro_banned_users") || "[]");
          if (bannedList.includes(s.user.id)) isUserBanned = true;
        }
        if (isUserBanned) {
          toast.error("Contul tău a fost suspendat permanent de către conducere.");
          await supabase.auth.signOut();
          setSession(null);
          return;
        }
        const { error } = await supabase.from("profiles").insert({
          id: s.user.id,
          username: s.user.email?.split("@")[0] || "jucator",
          display_name: s.user.email?.split("@")[0] || "Jucător",
          reputation: 0
        });
        if (error && error.code !== "23505") {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        user: session?.user ?? null,
        session,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        }
      },
      children
    }
  );
}
const useAuth = () => reactExports.useContext(Ctx);
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Pagina nu a fost găsită" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Pagina pe care o cauți nu există sau a fost mutată." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Mergi acasă"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "Pagina nu s-a putut încărca" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Ceva nu a funcționat corect din partea noastră. Poți încerca să reîncarci pagina sau să te întorci la pagina principală." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Încearcă din nou"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Mergi acasă"
        }
      )
    ] })
  ] }) });
}
const Route$a = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FLOW ROMÂNIA — Portal Comunitate" },
      { name: "description", content: "Un portal web premium pentru comunitatea FiveM FLOW ROMÂNIA. Sincronizează-ți profilul de joc, aplică în facțiuni și susține serverul." },
      { name: "author", content: "FLOW ROMÂNIA" },
      { property: "og:title", content: "FLOW ROMÂNIA — Portal Comunitate" },
      { property: "og:description", content: "Un portal web premium pentru comunitatea FiveM FLOW ROMÂNIA. Sincronizează-ți profilul de joc, aplică în facțiuni și susține serverul." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@FLOWROMANIA" },
      { name: "twitter:title", content: "FLOW ROMÂNIA — Portal Comunitate" },
      { name: "twitter:description", content: "Un portal web premium pentru comunitatea FiveM FLOW ROMÂNIA. Sincronizează-ți profilul de joc, aplică în facțiuni și susține serverul." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f8fd0a4e-3762-4208-a16f-61f8b52aef5f/id-preview-775f219d--bf4d6680-c61c-44e0-b874-c22a76089c54.lovable.app-1780129241503.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f8fd0a4e-3762-4208-a16f-61f8b52aef5f/id-preview-775f219d--bf4d6680-c61c-44e0-b874-c22a76089c54.lovable.app-1780129241503.png" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "ro", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$a.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$9 = () => import("./regulament-Dn0BbnXH.mjs");
const Route$9 = createFileRoute("/regulament")({
  head: () => ({
    meta: [{
      title: "REGULAMENTE & TERMENI — FLOW ROMÂNIA"
    }, {
      name: "description",
      content: "Regulamentele oficiale, condițiile de joc și regulamentul de jafuri pentru comunitatea de roleplay FLOW ROMÂNIA."
    }, {
      property: "og:title",
      content: "REGULAMENTE & TERMENI — FLOW ROMÂNIA"
    }, {
      property: "og:description",
      content: "Regulamentele oficiale și condițiile comunității FLOW ROMÂNIA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./profile-B9EYwmbP.mjs");
const Route$8 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Panou Control · FLOW ROMANIA"
    }, {
      name: "description",
      content: "Administrează-ți contul FLOW ROMANIA și sincronizează-ți profilul de jucător FiveM."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./forum-D2-Aa5M8.mjs");
const Route$7 = createFileRoute("/forum")({
  head: () => ({
    meta: [{
      title: "FORUM — FLOW ROMANIA"
    }, {
      name: "description",
      content: "Forumul oficial al comunității FLOW ROMÂNIA. Discuții, anunțuri, regulamente și asistență."
    }, {
      property: "og:title",
      content: "FORUM — FLOW ROMANIA"
    }, {
      property: "og:description",
      content: "Forumul oficial al comunității FLOW ROMÂNIA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./cod-penal-DLo4DTIW.mjs");
const Route$6 = createFileRoute("/cod-penal")({
  head: () => ({
    meta: [{
      title: "CODUL PENAL — FLOW ROMÂNIA"
    }, {
      name: "description",
      content: "Codul Penal oficial al comunității FLOW ROMÂNIA. Ghidul juridic complet pentru infracțiuni, pedepse, amenzi și cauțiuni."
    }, {
      property: "og:title",
      content: "CODUL PENAL — FLOW ROMÂNIA"
    }, {
      property: "og:description",
      content: "Codul Penal oficial al comunității FLOW ROMÂNIA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./auth-DOTD5oCc.mjs");
const Route$5 = createFileRoute("/auth")({
  head: () => ({
    meta: [{
      title: "Conectare · FLOW ROMANIA"
    }, {
      name: "description",
      content: "Alătură-te comunității FLOW ROMANIA. Creează-ți un cont de jucător sau conectează-te."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin-DSL2sxRU.mjs");
const Route$4 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Panou Administrare · FLOW ROMANIA"
    }, {
      name: "description",
      content: "Panou administrativ pentru gestionarea comunității FLOW."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-DYqv6UcV.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "FLOW ROMANIA — The Next Generation Roleplay Experience"
    }, {
      name: "description",
      content: "Premium Romanian FiveM roleplay community launching June 2026. Join the FLOW."
    }, {
      property: "og:title",
      content: "FLOW ROMANIA"
    }, {
      property: "og:description",
      content: "Premium Romanian FiveM roleplay community launching June 2026."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./forum._forumSlug-4vrqwnjA.mjs");
const Route$2 = createFileRoute("/forum/$forumSlug")({
  head: ({
    params
  }) => {
    const slug = params.forumSlug;
    const cleanTitle = slug.replace("-", " ").toUpperCase();
    return {
      meta: [{
        title: `${cleanTitle} · FORUM FLOW ROMÂNIA`
      }, {
        name: "description",
        content: `Vizualizează discuțiile active, topicele și ghidurile din secțiunea ${cleanTitle}.`
      }]
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./forum.thread._threadId-DdBAaLz0.mjs");
const Route$1 = createFileRoute("/forum/thread/$threadId")({
  head: () => ({
    meta: [{
      title: "Subiect Forum · FLOW ROMÂNIA"
    }, {
      name: "description",
      content: "Dezbatere activă în comunitatea de roleplay FiveM FLOW ROMÂNIA."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./forum.new-topic._forumSlug-BRYNNlzo.mjs");
const Route = createFileRoute("/forum/new-topic/$forumSlug")({
  head: () => ({
    meta: [{
      title: "Deschide Subiect Nou · FLOW ROMÂNIA"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const RegulamentRoute = Route$9.update({
  id: "/regulament",
  path: "/regulament",
  getParentRoute: () => Route$a
});
const ProfileRoute = Route$8.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$a
});
const ForumRoute = Route$7.update({
  id: "/forum",
  path: "/forum",
  getParentRoute: () => Route$a
});
const CodPenalRoute = Route$6.update({
  id: "/cod-penal",
  path: "/cod-penal",
  getParentRoute: () => Route$a
});
const AuthRoute = Route$5.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$a
});
const AdminRoute = Route$4.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$a
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$a
});
const ForumForumSlugRoute = Route$2.update({
  id: "/$forumSlug",
  path: "/$forumSlug",
  getParentRoute: () => ForumRoute
});
const ForumThreadThreadIdRoute = Route$1.update({
  id: "/thread/$threadId",
  path: "/thread/$threadId",
  getParentRoute: () => ForumRoute
});
const ForumNewTopicForumSlugRoute = Route.update({
  id: "/new-topic/$forumSlug",
  path: "/new-topic/$forumSlug",
  getParentRoute: () => ForumRoute
});
const ForumRouteChildren = {
  ForumForumSlugRoute,
  ForumNewTopicForumSlugRoute,
  ForumThreadThreadIdRoute
};
const ForumRouteWithChildren = ForumRoute._addFileChildren(ForumRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  AuthRoute,
  CodPenalRoute,
  ForumRoute: ForumRouteWithChildren,
  ProfileRoute,
  RegulamentRoute
};
const routeTree = Route$a._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$2 as R,
  Route$1 as a,
  Route as b,
  router as r,
  supabase as s,
  useAuth as u
};
