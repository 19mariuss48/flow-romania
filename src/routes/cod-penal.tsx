import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Search, Gavel, Scale, AlertTriangle, ShieldCheck, Car, EyeOff, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/cod-penal")({
  head: () => ({
    meta: [
      { title: "CODUL PENAL — FLOW ROMÂNIA" },
      { name: "description", content: "Codul Penal oficial al comunității FLOW ROMÂNIA. Ghidul juridic complet pentru infracțiuni, pedepse, amenzi și cauțiuni." },
      { property: "og:title", content: "CODUL PENAL — FLOW ROMÂNIA" },
      { property: "og:description", content: "Codul Penal oficial al comunității FLOW ROMÂNIA." },
    ],
  }),
  component: CodPenalPage,
});

type LawArticle = {
  id: string;
  category: "contra-persoanei" | "contra-proprietatii" | "rutiere" | "ordine-publica";
  categoryLabel: string;
  title: string;
  description: string;
  amenda: number;
  inchisoare: number; // minutes
  cautiune: boolean;
};

const articlesData: LawArticle[] = [
  // Contra Persoanei
  {
    id: "Art. 1.1",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Vătămare corporală",
    description: "Lovirea sau orice alte acte de violență cauzatoare de suferințe fizice aduse unui cetățean.",
    amenda: 5000,
    inchisoare: 15,
    cautiune: true
  },
  {
    id: "Art. 1.2",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Tentativă de omor",
    description: "Încercarea deliberată de a pune capăt vieții unui alt cetățean, indiferent de mijloacele folosite.",
    amenda: 15000,
    inchisoare: 35,
    cautiune: true
  },
  {
    id: "Art. 1.3",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Omor deosebit de grav (Crimă)",
    description: "Uciderea cu intenție a unuia sau a mai multor cetățeni.",
    amenda: 30000,
    inchisoare: 60,
    cautiune: false
  },
  {
    id: "Art. 1.4",
    category: "contra-persoanei",
    categoryLabel: "Contra Persoanei",
    title: "Răpire / Luare de ostatici",
    description: "Lipsirea de libertate a unei persoane în mod ilegal, adusă sub amenințare în scopul obținerii de foloase sau șantaj.",
    amenda: 25000,
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
    amenda: 4000,
    inchisoare: 10,
    cautiune: true
  },
  {
    id: "Art. 2.2",
    category: "contra-proprietatii",
    categoryLabel: "Contra Proprietății",
    title: "Jaf armat magazin / bancă",
    description: "Sustragerea de bunuri sau bani prin violență, amenințare cu arme de foc asupra personalului unei bănci sau magazin.",
    amenda: 20000,
    inchisoare: 40,
    cautiune: false
  },
  {
    id: "Art. 2.3",
    category: "contra-proprietatii",
    categoryLabel: "Contra Proprietății",
    title: "Pătrundere prin efracție",
    description: "Pătrunderea ilegală pe o proprietate privată, locuință sau sediu securizat prin distrugerea sistemelor de închidere.",
    amenda: 6000,
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
    amenda: 8000,
    inchisoare: 15,
    cautiune: true
  },
  {
    id: "Art. 3.2",
    category: "rutiere",
    categoryLabel: "Infracțiuni Rutiere",
    title: "Conducere fără permis / Vehicul neînmatriculat",
    description: "Conducerea unui vehicul fără a deține un permis de conducere valid sau operarea unui autovehicul fără numere/acte.",
    amenda: 3000,
    inchisoare: 5,
    cautiune: true
  },
  {
    id: "Art. 3.3",
    category: "rutiere",
    categoryLabel: "Infracțiuni Rutiere",
    title: "Fuga de la locul accidentului",
    description: "Părăsirea locului unui accident rutier soldat cu victime sau daune materiale majore fără acordul autorităților.",
    amenda: 10000,
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
    amenda: 12000,
    inchisoare: 25,
    cautiune: true
  },
  {
    id: "Art. 4.2",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Posesie de armament militar / ilegal",
    description: "Deținerea sau utilizarea de arme automate, explozibili sau arme de calibru mare fără licență specială.",
    amenda: 25000,
    inchisoare: 35,
    cautiune: false
  },
  {
    id: "Art. 4.3",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Ultraj / Agresarea unui funcționar public",
    description: "Amenințarea, jignirea sau lovirea unui organ de poliție, cadru medical sau membru al departamentului de justiție în exercițiul funcțiunii.",
    amenda: 15000,
    inchisoare: 30,
    cautiune: true
  },
  {
    id: "Art. 4.4",
    category: "ordine-publica",
    categoryLabel: "Ordine Publică",
    title: "Corupție pasivă / activă",
    description: "Oferirea sau primirea de foloase necuvenite (mită) de către sau către un funcționar al statului.",
    amenda: 20000,
    inchisoare: 30,
    cautiune: false
  }
];

function CodPenalPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = articlesData.filter((art) => {
    const matchesCategory = activeCategory === "all" || art.category === activeCategory;
    const matchesSearch = 
      art.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">ACASĂ</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-silver font-semibold uppercase">CODUL PENAL</span>
        </div>

        {/* Header Block */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] text-silver mb-3">CADRUL JURIDIC OFICIAL</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient">
            CODUL PENAL
          </h1>
          <div className="mx-auto mt-6 hairline w-32" />
          <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Codul de legi oficial aplicat pe teritoriul FLOW ROMÂNIA. Consultați limitele pedepselor, 
            amenzile stabilite și condițiile de eliberare pe cauțiune pentru fiecare clasă de infracțiune.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "CATEGORII GENERALE", value: "4", icon: Scale },
            { label: "ARTICOLE DE LEGE", value: articlesData.length.toString(), icon: Gavel },
            { label: "AMENDĂ MAXIMĂ", value: "30.000 €", icon: AlertTriangle },
            { label: "CAUȚIUNE PERMISĂ", value: "65%", icon: ShieldCheck },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="glass rounded-xl p-5 border-white/5 flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-silver shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs tracking-wider text-muted-foreground uppercase">{stat.label}</div>
                  <div className="text-xl font-light text-foreground mt-0.5">{stat.value}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search and Category Filter Block */}
        <div className="space-y-6 mb-12">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-0 -m-1 bg-white/5 rounded-2xl blur opacity-20 pointer-events-none" />
            <div className="relative glass rounded-2xl flex items-center px-6 py-2 border-white/10 hover:border-white/20 transition-all duration-300">
              <Search className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
              <input
                type="text"
                placeholder="Caută după numărul articolului, denumire sau cuvinte cheie (ex: Art. 1.3, Omor, Alcool)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none w-full py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground tracking-widest font-mono font-semibold"
                >
                  ȘTERGE
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "all", label: "Toate Articolele", icon: Scale },
              { id: "contra-persoanei", label: "Contra Persoanei", icon: ShieldAlert },
              { id: "contra-proprietatii", label: "Contra Proprietății", icon: EyeOff },
              { id: "rutiere", label: "Rutier", icon: Car },
              { id: "ordine-publica", label: "Ordine Publică", icon: ShieldCheck },
            ].map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white font-medium shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-white/[0.02] border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Law Articles Directory Grid */}
        {filteredArticles.length === 0 ? (
          <div className="glass rounded-2xl p-20 border-white/5 text-center">
            <ShieldAlert className="h-10 w-10 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Niciun articol găsit</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Nu am găsit niciun articol în Codul Penal care să corespundă criteriilor de căutare. Reîncearcă cu alți termeni.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredArticles.map((art) => {
              return (
                <div
                  key={art.id}
                  className="group relative glass rounded-2xl p-6 border-white/5 hover:border-white/15 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between gap-6"
                >
                  {/* Card Top Information */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold tracking-widest text-silver">{art.id}</span>
                      <span className="text-[9px] tracking-widest uppercase text-muted-foreground bg-white/[0.03] px-2 py-0.5 rounded border border-white/5">
                        {art.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold tracking-wide text-foreground group-hover:text-silver-gradient transition duration-300">
                      {art.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed font-light font-sans">
                      {art.description}
                    </p>
                  </div>

                  {/* Card Bottom Panel (Penalties & Bail) */}
                  <div className="pt-4 border-t border-white/5 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-[9px] tracking-widest text-muted-foreground uppercase">AMENDĂ</div>
                        <div className="text-sm font-semibold text-foreground font-mono mt-0.5">
                          {art.amenda.toLocaleString()} €
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] tracking-widest text-muted-foreground uppercase">TIMP ÎNCHISOARE</div>
                        <div className="text-sm font-semibold text-foreground font-mono mt-0.5">
                          {art.inchisoare} min.
                        </div>
                      </div>
                    </div>

                    {/* Bail Status */}
                    <div className="flex items-center justify-between text-[10px] tracking-wider">
                      <span className="text-muted-foreground">CAUȚIUNE:</span>
                      {art.cautiune ? (
                        <span className="font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase text-[9px]">
                          PERMISĂ
                        </span>
                      ) : (
                        <span className="font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase text-[9px] animate-pulse">
                          INTERZISĂ
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}
