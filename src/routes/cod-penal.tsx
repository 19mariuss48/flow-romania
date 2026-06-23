import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getSiteContent, updateSiteContent } from "@/lib/api/content.server";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Search, Gavel, Scale, AlertTriangle, ShieldCheck, Car, EyeOff, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/cod-penal")({
  head: () => ({
    meta: [
      { title: "CODUL PENAL — FLOW ROMANIA" },
      { name: "description", content: "Codul Penal oficial al comunitatii FLOW ROMANIA. Ghidul juridic complet pentru infractiuni, pedepse, amenzi si cautiuni." },
      { property: "og:title", content: "CODUL PENAL — FLOW ROMANIA" },
      { property: "og:description", content: "Codul Penal oficial al comunitatii FLOW ROMANIA." },
    ],
  }),
  component: CodPenalPage,
});

import { articlesData } from "@/data/cod-penal-data";

function CodPenalPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [contentData, setContentData] = useState<{ articlesData: any[] } | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getSiteContent({ data: { id: "cod_penal" } });
        if (data) {
          setContentData(data as any);
        } else {
          const defaultData = { articlesData };
          setContentData(defaultData);
          await updateSiteContent({ data: { id: "cod_penal", content: defaultData } });
        }
      } catch (err) {
        console.error("Failed to load cod penal", err);
        setContentData({ articlesData });
      } finally {
        setLoadingContent(false);
      }
    };
    fetchContent();
  }, []);

  const activeArticlesData = contentData?.articlesData || [];

  const filteredArticles = activeArticlesData.filter((art: any) => {
    const matchesCategory = activeCategory === "all" || art.category === activeCategory;
    const matchesSearch = 
      art.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loadingContent) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-foreground flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-t-2 border-amber-400 animate-spin mb-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">ACASA</Link>
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
            Codul de legi oficial aplicat pe teritoriul FLOW ROMANIA. Consultati limitele pedepselor, 
            amenzile stabilite si conditiile de eliberare pe cautiune pentru fiecare clasa de infractiune.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "CATEGORII GENERALE", value: "9", icon: Scale },
            { label: "ARTICOLE DE LEGE", value: activeArticlesData.length.toString(), icon: Gavel },
            { label: "AMENDA MAXIMA", value: "75.000 $", icon: AlertTriangle },
            { label: "PEDEAPSA MAXIMA", value: "500 MINUTE", icon: ShieldCheck },
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
                placeholder="Cauta dupa numarul articolului, denumire sau cuvinte cheie (ex: Art. 1.3, Omor, Alcool)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-0 outline-none w-full py-3 text-sm text-foreground placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="text-xs text-muted-foreground hover:text-foreground tracking-widest font-mono font-semibold"
                >
                  STERGE
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: "all", label: "Toate Articolele", icon: Scale },
              { id: "contra-persoanei", label: "Persoana", icon: ShieldAlert },
              { id: "ordine-publica", label: "Ordine", icon: ShieldCheck },
              { id: "convietuire-sociala", label: "Convietuire", icon: ShieldCheck },
              { id: "moralitate-publica", label: "Moralitate", icon: ShieldAlert },
              { id: "contra-proprietatii", label: "Proprietate", icon: EyeOff },
              { id: "justitie", label: "Justitie", icon: Gavel },
              { id: "arme", label: "Arme", icon: AlertTriangle },
              { id: "contraventii-rutiere", label: "Amenzi", icon: Car },
              { id: "infractiuni-rutiere", label: "Rutiere", icon: Car },
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
            <h3 className="text-sm font-semibold text-foreground mb-1">Niciun articol gasit</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              Nu am gasit niciun articol in Codul Penal care sa corespunda criteriilor de cautare. Reincearca cu alti termeni.
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
                        <div className="text-[9px] tracking-widest text-muted-foreground uppercase">AMENDA</div>
                        <div className="text-sm font-semibold text-foreground font-mono mt-0.5">
                          {art.amenda || "-"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[9px] tracking-widest text-muted-foreground uppercase">TIMP INCHISOARE</div>
                        <div className="text-sm font-semibold text-foreground font-mono mt-0.5">
                          {art.inchisoare || "-"}
                        </div>
                      </div>
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
