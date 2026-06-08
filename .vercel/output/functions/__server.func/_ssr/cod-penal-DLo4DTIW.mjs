import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import "../_libs/sonner.mjs";
import { S as Scale, o as Gavel, J as TriangleAlert, w as ShieldCheck, s as Search, v as ShieldAlert, m as EyeOff, c as Car } from "../_libs/lucide-react.mjs";
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
const articlesData = [
  // Contra Persoanei
  {
    id: "Art. 1.1",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Vătămare corporală",
    description: "Lovirea sau orice alte acte de violență cauzatoare de suferințe fizice aduse unui cetățean.",
    amenda: 5e3,
    inchisoare: 15,
    cautiune: true
  },
  {
    id: "Art. 1.2",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Tentativă de omor",
    description: "Încercarea deliberată de a pune capăt vieții unui alt cetățean, indiferent de mijloacele folosite.",
    amenda: 15e3,
    inchisoare: 35,
    cautiune: true
  },
  {
    id: "Art. 1.3",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Omor deosebit de grav (Crimă)",
    description: "Uciderea cu intenție a unuia sau a mai multor cetățeni.",
    amenda: 3e4,
    inchisoare: 60,
    cautiune: false
  },
  {
    id: "Art. 1.4",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Răpire / Luare de ostatici",
    description: "Lipsirea de libertate a unei persoane în mod ilegal, adusă sub amenințare în scopul obținerii de foloase sau șantaj.",
    amenda: 25e3,
    inchisoare: 45,
    cautiune: false
  },
  // Contra Proprietății
  {
    id: "Art. 2.1",
    category: "contra-proprietatii",
    categoryLabel: "Contra Proprietății",
    title: "Furt calificat / Furt de vehicul",
    description: "Sustragerea unui bun mobil sau a unui autovehicul fără consimțământul proprietarului de drept.",
    amenda: 4e3,
    inchisoare: 10,
    cautiune: true
  },
  {
    id: "Art. 2.2",
    category: "contra-proprietatii",
    categoryLabel: "Contra Proprietății",
    title: "Jaf armat magazin / bancă",
    description: "Sustragerea de bunuri sau bani prin violență, amenințare cu arme de foc asupra personalului unei bănci sau magazin.",
    amenda: 2e4,
    inchisoare: 40,
    cautiune: false
  },
  {
    id: "Art. 2.3",
    category: "contra-proprietatii",
    categoryLabel: "Contra Proprietății",
    title: "Pătrundere prin efracție",
    description: "Pătrunderea ilegală pe o proprietate privată, locuință sau sediu securizat prin distrugerea sistemelor de închidere.",
    amenda: 6e3,
    inchisoare: 15,
    cautiune: true
  },
  // Rutiere
  {
    id: "Art. 3.1",
    category: "rutiere",
    categoryLabel: "Infracțiuni Rutiere",
    title: "Conducere sub influența substanțelor",
    description: "Operarea unui vehicul pe drumurile publice având reflexele alterate de alcool sau substanțe psihoactive.",
    amenda: 8e3,
    inchisoare: 15,
    cautiune: true
  },
  {
    id: "Art. 3.2",
    category: "rutiere",
    categoryLabel: "Infracțiuni Rutiere",
    title: "Conducere fără permis / Vehicul neînmatriculat",
    description: "Conducerea unui vehicul fără a deține un permis de conducere valid sau operarea unui autovehicul fără numere/acte.",
    amenda: 3e3,
    inchisoare: 5,
    cautiune: true
  },
  {
    id: "Art. 3.3",
    category: "rutiere",
    categoryLabel: "Infracțiuni Rutiere",
    title: "Fuga de la locul accidentului",
    description: "Părăsirea locului unui accident rutier soldat cu victime sau daune materiale majore fără acordul autorităților.",
    amenda: 1e4,
    inchisoare: 20,
    cautiune: true
  },
  // Ordine Publică / Stat
  {
    id: "Art. 4.1",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Deținere / Trafic de substanțe ilegale",
    description: "Posesia sau distribuția de droguri de risc sau mare risc pe teritoriul statului Los Santos.",
    amenda: 12e3,
    inchisoare: 25,
    cautiune: true
  },
  {
    id: "Art. 4.2",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Posesie de armament militar / ilegal",
    description: "Deținerea sau utilizarea de arme automate, explozibili sau arme de calibru mare fără licență specială.",
    amenda: 25e3,
    inchisoare: 35,
    cautiune: false
  },
  {
    id: "Art. 4.3",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Ultraj / Agresarea unui funcționar public",
    description: "Amenințarea, jignirea sau lovirea unui organ de poliție, cadru medical sau membru al departamentului de justiție în exercițiul funcțiunii.",
    amenda: 15e3,
    inchisoare: 30,
    cautiune: true
  },
  {
    id: "Art. 4.4",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Corupție pasivă / activă",
    description: "Oferirea sau primirea de foloase necuvenite (mită) de către sau către un funcționar al statului.",
    amenda: 2e4,
    inchisoare: 30,
    cautiune: false
  }
];
function CodPenalPage() {
  const [activeCategory, setActiveCategory] = reactExports.useState("all");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const filteredArticles = articlesData.filter((art) => {
    const matchesCategory = activeCategory === "all" || art.category === activeCategory;
    const matchesSearch = art.id.toLowerCase().includes(searchQuery.toLowerCase()) || art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "ACASĂ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold uppercase", children: "CODUL PENAL" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.5em] text-silver mb-3", children: "CADRUL JURIDIC OFICIAL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient", children: "CODUL PENAL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mt-6 hairline w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-sm text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed", children: "Codul de legi oficial aplicat pe teritoriul FLOW ROMÂNIA. Consultați limitele pedepselor, amenzile stabilite și condițiile de eliberare pe cauțiune pentru fiecare clasă de infracțiune." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-12", children: [{
        label: "CATEGORII GENERALE",
        value: "4",
        icon: Scale
      }, {
        label: "ARTICOLE DE LEGE",
        value: articlesData.length.toString(),
        icon: Gavel
      }, {
        label: "AMENDĂ MAXIMĂ",
        value: "30.000 €",
        icon: TriangleAlert
      }, {
        label: "CAUȚIUNE PERMISĂ",
        value: "65%",
        icon: ShieldCheck
      }].map((stat, i) => {
        const Icon = stat.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-5 border-white/5 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-silver shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs tracking-wider text-muted-foreground uppercase", children: stat.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-light text-foreground mt-0.5", children: stat.value })
          ] })
        ] }, i);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -m-1 bg-white/5 rounded-2xl blur opacity-20 pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative glass rounded-2xl flex items-center px-6 py-2 border-white/10 hover:border-white/20 transition-all duration-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground mr-3 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "Caută după numărul articolului, denumire sau cuvinte cheie (ex: Art. 1.3, Omor, Alcool)...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "bg-transparent border-0 outline-none w-full py-3 text-sm text-foreground placeholder:text-muted-foreground/60" }),
            searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearchQuery(""), className: "text-xs text-muted-foreground hover:text-foreground tracking-widest font-mono font-semibold", children: "ȘTERGE" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2.5", children: [{
          id: "all",
          label: "Toate Articolele",
          icon: Scale
        }, {
          id: "contra-persoanei",
          label: "Contra Persoanei",
          icon: ShieldAlert
        }, {
          id: "contra-proprietatii",
          label: "Contra Proprietății",
          icon: EyeOff
        }, {
          id: "rutiere",
          label: "Rutier",
          icon: Car
        }, {
          id: "ordine-publica",
          label: "Ordine Publică",
          icon: ShieldCheck
        }].map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveCategory(cat.id), className: `flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs tracking-wider transition-all duration-300 cursor-pointer ${isActive ? "bg-white text-black border-white font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)]" : "bg-white/[0.02] border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
            cat.label
          ] }, cat.id);
        }) })
      ] }),
      filteredArticles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-20 border-white/5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-10 w-10 text-muted-foreground/30 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1", children: "Niciun articol găsit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed", children: "Nu am găsit niciun articol în Codul Penal care să corespundă criteriilor de căutare. Reîncearcă cu alți termeni." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: filteredArticles.map((art) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative glass rounded-2xl p-6 border-white/5 hover:border-white/15 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold tracking-widest text-silver", children: art.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-widest uppercase text-muted-foreground bg-white/[0.03] px-2 py-0.5 rounded border border-white/5", children: art.categoryLabel })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold tracking-wide text-foreground group-hover:text-silver-gradient transition duration-300", children: art.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed font-light font-sans", children: art.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/5 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] tracking-widest text-muted-foreground uppercase", children: "AMENDĂ" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground font-mono mt-0.5", children: [
                  art.amenda.toLocaleString(),
                  " €"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] tracking-widest text-muted-foreground uppercase", children: "TIMP ÎNCHISOARE" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground font-mono mt-0.5", children: [
                  art.inchisoare,
                  " min."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "CAUȚIUNE:" }),
              art.cautiune ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase text-[9px]", children: "PERMISĂ" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase text-[9px] animate-pulse", children: "INTERZISĂ" })
            ] })
          ] })
        ] }, art.id);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  CodPenalPage as component
};
