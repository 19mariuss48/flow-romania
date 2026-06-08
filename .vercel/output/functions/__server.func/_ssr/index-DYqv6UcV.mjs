import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as logo } from "./utils-zpgQuvnJ.mjs";
import "../_libs/sonner.mjs";
import "./router-C5OKu4OK.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
const heroBg = "/assets/hero-bg-DQKDY41-.jpg";
function Particles() {
  const particles = Array.from({ length: 28 });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: particles.map((_, i) => {
    const left = i * 37 % 100;
    const delay = i * 0.6 % 12;
    const dur = 12 + i * 3 % 14;
    const size = 1 + i % 3;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "particle",
        style: {
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${dur}s`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.4 + i % 4 * 0.1
        }
      },
      i
    );
  }) });
}
function Hero() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-screen flex items-center justify-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          src: heroBg,
          alt: "",
          className: "h-full w-full object-cover opacity-50"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(11,11,11,0.85)_75%)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Particles, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 text-center px-6 max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 blur-3xl bg-white/10 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: logo,
            alt: "FLOW Romania",
            className: "relative h-32 w-32 md:h-44 md:w-44 object-contain drop-shadow-[0_10px_40px_rgba(255,255,255,0.25)]"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs md:text-sm tracking-[0.6em] text-silver mb-6", children: "FONDAT · MAI 2025" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-5xl md:text-8xl font-light tracking-[0.15em] text-silver-gradient leading-none", children: "FLOW ROMANIA" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto my-8 hairline w-48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base md:text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide", children: "Următoarea generație de roleplay românesc — creată pentru cei care cer mai mult de la FiveM." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: "https://discord.gg/flowro",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "group relative inline-flex items-center justify-center rounded-full bg-white text-black px-8 py-4 text-sm tracking-[0.25em] font-medium hover:bg-white/90 transition-all shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] hover:shadow-[0_0_80px_-5px_rgba(255,255,255,0.7)]",
            children: [
              "ALĂTURĂ-TE PE DISCORD",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 transition-transform group-hover:translate-x-1", children: "→" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/forum",
            className: "inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm tracking-[0.25em] text-foreground hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur",
            children: "VIZITEAZĂ FORUMUL"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden glass", children: [
        { v: "2.847", l: "MEMBRI" },
        { v: "184", l: "CONECTAȚI" },
        { v: "62", l: "STAFF" },
        { v: "T-156z", l: "PÂNĂ LA LANSARE" }
      ].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background/40 px-6 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl md:text-3xl font-light text-silver-gradient", children: s.v }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.3em] text-muted-foreground mt-1", children: s.l })
      ] }, s.l)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-muted-foreground", children: "DERULEAZĂ ↓" })
  ] });
}
function Widget({ title, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs tracking-[0.35em] text-silver", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_10px_rgba(255,255,255,0.8)]" })
    ] }),
    children
  ] });
}
const topics = [
  { t: "Aplicație Poliție — Agent Andrei Popescu", a: "andrei.p", c: "Poliție", time: "12m" },
  { t: "Anunț Reorganizare Familie de Mafie", a: "don.vito", c: "Mafia Italiană", time: "47m" },
  { t: "Showroom Auto: Gama GT 2026", a: "garage.flow", c: "Media", time: "1h" },
  { t: "Recrutare S.M.U.R.D. — Sesiunea Q2 Deschisă", a: "dr.ionescu", c: "S.M.U.R.D.", time: "2h" },
  { t: "Actualizare Server v0.9.4 Note Patch", a: "staff.flow", c: "Update-uri", time: "3h" }
];
const members = [
  { n: "alexandru.r", rep: 2840, rank: "Fondator" },
  { n: "mirela.s", rep: 1920, rank: "Administrator" },
  { n: "cristian.b", rep: 1741, rank: "Moderator" },
  { n: "andreea.v", rep: 1503, rank: "Veteran" },
  { n: "vlad.n", rep: 1389, rank: "Veteran" }
];
function Widgets() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative py-24 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl grid lg:grid-cols-3 gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { title: "ULTIMELE SUBIECTE", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-4", children: topics.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "#", className: "block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/90 group-hover:text-foreground transition leading-snug", children: t.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-3 text-[10px] tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "@",
          t.a
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px w-3 bg-white/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver", children: t.c }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto", children: t.time })
      ] })
    ] }) }, t.t)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { title: "MEMBRI DE TOP", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: members.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs tracking-widest text-muted-foreground w-6", children: [
        "0",
        i + 1
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-full bg-gradient-to-br from-white/30 to-white/5 border border-white/10 flex items-center justify-center text-xs text-silver", children: m.n[0].toUpperCase() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground truncate", children: m.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground", children: m.rank })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-silver-gradient font-medium", children: m.rep.toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] tracking-widest text-muted-foreground", children: "REP" })
      ] })
    ] }, m.n)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Widget, { title: "STATUS SERVER", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Locuri Jucători" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-foreground", children: [
          "184",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/300" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-white/5 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-white/80 to-white/40 shine", style: { width: "61%" } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-light text-silver-gradient", children: "99.8%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground mt-1", children: "UPTIME" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-light text-silver-gradient", children: "28ms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground mt-1", children: "LATENȚĂ" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-light text-silver-gradient", children: "14.2k" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground mt-1", children: "DISCORD" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-light text-silver-gradient", children: "v0.9.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground mt-1", children: "VERSIUNE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.4em] text-muted-foreground mb-2", children: "LANSARE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2 text-center", children: [
          { v: "156", l: "ZILE" },
          { v: "08", l: "ORE" },
          { v: "42", l: "MIN" },
          { v: "11", l: "SEC" }
        ].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.03] rounded-md py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-light text-foreground", children: c.v }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[8px] tracking-widest text-muted-foreground", children: c.l })
        ] }, c.l)) })
      ] })
    ] }) })
  ] }) });
}
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Widgets, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  Home as component
};
