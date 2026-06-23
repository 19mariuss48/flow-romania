import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { 
  Search, 
  ChevronDown, 
  Compass, 
  ShieldAlert, 
  Lock, 
  Star, 
  Eye, 
  MessageSquare, 
  ArrowLeft, 
  Calendar,
  AlertTriangle,
  Flame,
  User,
  Info,
  Clock,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { getPageViews, incrementPageViews } from "@/lib/api/metrics.server";
import { getSiteContent, updateSiteContent } from "@/lib/api/content.server";

export const Route = createFileRoute("/regulament")({
  head: () => ({
    meta: [
      { title: "REGULAMENTE & TERMENI — FLOW ROMÂNIA" },
      { name: "description", content: "Regulamentele oficiale, condițiile de joc și regulamentul de jafuri pentru comunitatea de roleplay FLOW ROMÂNIA." },
      { property: "og:title", content: "REGULAMENTE & TERMENI — FLOW ROMÂNIA" },
      { property: "og:description", content: "Regulamentele oficiale și condițiile comunității FLOW ROMÂNIA." },
    ],
  }),
  component: RegulamentPage,
});

type RuleItem = {
  title: string;
  pedeapsa: string;
  description: string;
  details: string[];
};

type RuleCategory = {
  id: string;
  name: string;
  icon: any;
  description: string;
  rules: RuleItem[];
};

import { regulamenteData, termeniData, jafuriData } from "@/data/regulament-data";

// Locked announcements list configuration
const lockedTopics = [
  {
    id: "termeni",
    title: "Termeni și Condiții",
    author: "19mariuss48",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    date: "1 iunie 2026",
    replies: "0 replies",
    views: "0 views",
    color: "#6b7280"
  },
  {
    id: "regulament",
    title: "Regulament",
    author: "19mariuss48",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
    date: "1 iunie 2026",
    replies: "0 replies",
    views: "0 views",
    color: "#14b8a6"
  },
  {
    id: "jafuri",
    title: "REGULAMENT - Jafuri Organizatii / Jafuri Civili",
    author: "19mariuss48",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    date: "1 iunie 2026",
    replies: "0 replies",
    views: "0 views",
    color: "#3b82f6"
  }
];

function RegulamentPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // CMS State
  const [contentData, setContentData] = useState<{
    regulamenteData: any[];
    termeniData: any[];
    jafuriData: any;
  } | null>(null);
  const [loadingContent, setLoadingContent] = useState(true);

  // States for general regulament sub-view
  const [activeCategory, setActiveCategory] = useState("gameplay");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRules, setExpandedRules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getSiteContent({ data: { id: "regulament" } });
        if (data) {
          setContentData(data as any);
        } else {
          // Auto-seed
          const defaultData = { regulamenteData, termeniData, jafuriData };
          setContentData(defaultData);
          await updateSiteContent({ data: { id: "regulament", content: defaultData } });
        }
      } catch (err) {
        console.error("Failed to load regulament from DB", err);
        setContentData({ regulamenteData, termeniData, jafuriData });
      } finally {
        setLoadingContent(false);
      }
    };
    fetchContent();
  }, []);
  


  const toggleRule = (categoryKey: string, ruleIndex: number) => {
    const key = `${categoryKey}-${ruleIndex}`;
    setExpandedRules((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const [viewsData, setViewsData] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch initial views
    const loadViews = async () => {
      try {
        const termeniV = await getPageViews({ data: { pageId: "termeni" } });
        const regulamentV = await getPageViews({ data: { pageId: "regulament" } });
        const jafuriV = await getPageViews({ data: { pageId: "jafuri" } });

        const newViews = {
          termeni: termeniV || 0,
          regulament: regulamentV || 0,
          jafuri: jafuriV || 0
        };

        setViewsData(newViews);
      } catch (e) {
        console.error("Eroare la preluarea vizualizarilor din baza de date:", e);
      }
    };
    loadViews();
  }, []);

  const handleSelectTopic = async (topicId: string) => {
    setSelectedTopic(topicId);
    try {
      const newCount = await incrementPageViews({ data: { pageId: topicId } });
      if (newCount) {
        setViewsData(prev => ({ ...prev, [topicId]: newCount }));
      }
    } catch (e) {
      console.error("Eroare la incrementarea vizualizarilor:", e);
    }
  };

  const activeData = contentData?.regulamenteData.find((c) => c.id === activeCategory) || contentData?.regulamenteData[0] || { name: "", description: "", rules: [] };

  // Filter rules based on search query
  const filteredCategories = contentData?.regulamenteData.map((cat) => {
    const filteredRules = cat.rules.filter(
      (rule: any) =>
        rule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rule.details.some((d: string) => d.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    return { ...cat, rules: filteredRules };
  }) || [];

  const displayData = searchQuery
    ? filteredCategories.find((c) => c.id === activeCategory) || { rules: [] }
    : activeData;

  const totalRulesCount = contentData?.regulamenteData.reduce((acc, cat) => acc + cat.rules.length, 0) || 0;

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
      <div className="absolute top-[30%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(255,255,255,0.015),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">ACASĂ</Link>
          <ChevronRight className="h-3 w-3" />
          <span 
            onClick={() => setSelectedTopic(null)} 
            className={`cursor-pointer uppercase ${selectedTopic ? "hover:text-foreground text-muted-foreground" : "text-silver font-semibold"}`}
          >
            REGULAMENTE & CONDITII
          </span>
          {selectedTopic && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="text-silver font-semibold uppercase">
                {selectedTopic === "termeni" && "Termeni și Condiții"}
                {selectedTopic === "regulament" && "Regulament General"}
                {selectedTopic === "jafuri" && "Regulament Jafuri"}
              </span>
            </>
          )}
        </div>

        {/* 1. INITIAL SUB-FORUM VIEW */}
        {selectedTopic === null && (
          <div className="space-y-12">
            {/* Header Block */}
            <div className="text-center">
              <p className="text-xs tracking-[0.5em] text-silver mb-3">DOCUMENTE OFICIALE COMUNITATE</p>
              <h1 className="text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient uppercase">
                Anunțuri & Regulamente
              </h1>
              <div className="mx-auto mt-6 hairline w-32" />
              <p className="mt-6 text-sm text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Citește cu atenție regulile interne, procedurile privind jafurile și termenii de utilizare a platformei FLOW ROMÂNIA.
                Abaterile vor fi sancționate administrativ.
              </p>
            </div>

            {/* Premium IP.Board style locked announcements box */}
            <div className="max-w-5xl mx-auto glass border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-md">
              
              {/* Box Top Header */}
              <div className="flex justify-between items-center px-6 py-4 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] tracking-[0.25em] font-bold text-silver uppercase">Anunțuri Oficiale / Subiecte Importante</span>
                </div>
                <button className="text-[9px] tracking-widest text-silver/60 hover:text-white font-mono bg-white/5 border border-white/5 rounded-md px-3 py-1.5 flex items-center gap-1 transition-colors uppercase">
                  SORT BY <ChevronDown className="h-3 w-3" />
                </button>
              </div>

              {/* Box Rows */}
              <div className="divide-y divide-white/5">
                {lockedTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleSelectTopic(topic.id)}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-white/[0.02] cursor-pointer transition-all duration-300 group"
                  >
                    
                    {/* Left block: Title, icons, metadata */}
                    <div className="flex items-start gap-4 flex-1">
                      
                      {/* Left icon sequence matching picture */}
                      <div className="flex items-center gap-1.5 mt-1 shrink-0">
                        {/* Lock Icon */}
                        <Lock className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-white transition-colors" />
                        
                        {/* Custom IPB circular tree/leaf star tags */}
                        <div className="h-4.5 w-4.5 rounded-full bg-[#1b2f27] border border-[#2b5943]/40 flex items-center justify-center text-emerald-400 text-[10px] font-bold shrink-0 shadow-inner">
                          ♣
                        </div>
                        <div className="h-4.5 w-4.5 rounded-full bg-[#1b2f27] border border-[#2b5943]/40 flex items-center justify-center text-emerald-400 text-[9px] font-bold shrink-0 shadow-inner">
                          ★
                        </div>
                        
                        {/* Bullet point */}
                        <span className="text-silver/40 pl-0.5">•</span>
                      </div>

                      {/* Title & Author */}
                      <div>
                        <h3 className="text-base font-medium text-silver/90 group-hover:text-white transition-colors duration-300 tracking-wide">
                          {topic.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground mt-1 font-light">
                          By <span className="text-silver hover:underline font-semibold">{topic.author}</span>, {topic.date}
                        </p>
                      </div>
                    </div>

                    {/* Middle stats */}
                    <div className="flex gap-8 my-4 md:my-0 md:px-12 text-left md:text-right shrink-0">
                      <div className="flex flex-col min-w-[70px]">
                        <span className="text-xs font-semibold text-silver/80 font-mono leading-tight">{topic.replies}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{viewsData[topic.id] || 0} views</span>
                      </div>
                    </div>

                    {/* Right side: Author Profile Avatar & Date */}
                    <div className="flex items-center gap-3 shrink-0 border-t border-white/5 pt-4 md:pt-0 md:border-0">
                      <img src={topic.avatar} alt={topic.author} className="h-9 w-9 rounded-full object-cover border border-white/10 group-hover:border-white/30 transition-colors shadow-lg" />
                      <div className="text-left">
                        <div className="text-xs font-semibold text-silver group-hover:text-white transition-colors">{topic.author}</div>
                        <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{topic.date}</div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* Bottom info widget */}
            <div className="max-w-5xl mx-auto flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-5 text-xs text-muted-foreground">
              <Info className="h-6 w-6 text-silver/60 shrink-0" />
              <p>
                💡 <strong>Sfat util:</strong> Utilizați documentele de mai sus ca referință oficială. În cazul în care faceți o plângere sau un ticket pe Discord, menționarea regulii exacte din capitolele de mai sus vă va asigura soluționarea rapidă a speței.
              </p>
            </div>
          </div>
        )}

        {/* 2. SUB-VIEW: TERMENI SI CONDITII */}
        {selectedTopic === "termeni" && (
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Header Block with Back button */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="self-start inline-flex items-center gap-1.5 text-xs text-silver hover:text-white font-medium tracking-wider bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA SUBIECTE
              </button>
              
              <div>
                <p className="text-[10px] tracking-[0.4em] text-silver uppercase mb-1 font-mono">Capitolul Administrativ Oficial</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-wide text-silver-gradient">
                  TERMENI ȘI CONDIȚII
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Ultima Actualizare: 1 iunie 2026 · Publicat de 19mariuss48
                </p>
              </div>
            </div>

            {/* Terms List inside custom visual cards */}
            <div className="space-y-6">
              {contentData?.termeniData.map((term: any, index: number) => (
                <div key={index} className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-br from-white/[0.01] to-transparent hover:border-white/10 transition-colors shadow-lg">
                  <h3 className="text-lg font-semibold tracking-wide text-white mb-3 flex items-center gap-2 border-b border-white/5 pb-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-silver/60" />
                    {term.title}
                  </h3>
                  <p className="text-xs md:text-sm text-foreground/85 leading-relaxed font-light whitespace-pre-line leading-loose">
                    {term.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom accept warning card */}
            <div className="glass bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-widest text-rose-400 uppercase">ACORD IMPLICIT OBLIGATORIU</h4>
                <p className="text-xs text-muted-foreground leading-normal">
                  Prin accesarea serverului și portalului FLOW ROMÂNIA, sunteți complet de acord cu termenii de mai sus. Orice tentativă de abuz, ocolire a regulilor sau ascundere de probe va atrage direct banarea permanentă și adăugarea în Blacklist-ul comunității.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. SUB-VIEW: REGULAMENT GENERAL */}
        {selectedTopic === "regulament" && (
          <div className="space-y-10">
            {/* Header Block with Back button */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="self-start inline-flex items-center gap-1.5 text-xs text-silver hover:text-white font-medium tracking-wider bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA SUBIECTE
              </button>
              
              <div>
                <p className="text-[10px] tracking-[0.4em] text-silver uppercase mb-1 font-mono">Reguli de Joc & Conduită OOC</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-wide text-silver-gradient">
                  REGULAMENT JOC & COMUNITATE
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Ultima Actualizare: 1 iunie 2026 · Publicat de 19mariuss48
                </p>
              </div>
            </div>

            {/* Interactive Search Bar */}
            <div className="max-w-2xl mx-auto mb-10 relative">
              <div className="absolute inset-0 -m-1 bg-white/5 rounded-full blur opacity-30 pointer-events-none" />
              <div className="relative glass rounded-full flex items-center px-6 py-1 border-white/10 hover:border-white/20 transition-all duration-300">
                <Search className="h-4 w-4 text-muted-foreground mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="Caută o regulă sau un termen specific (ex: MetaGaming, PG, CK, Ostatec)..."
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

            {/* Tab & Content layout */}
            <div className="grid lg:grid-cols-4 gap-8 items-start">
              
              {/* Left Sidebar Category Tabs */}
              <div className="space-y-2 lg:col-span-1">
                <div className="text-[10px] text-muted-foreground tracking-widest uppercase mb-4 px-3 font-bold">Capitole</div>
                {contentData?.regulamenteData.map((cat: any) => {
                  const Icon = cat.icon || ShieldAlert;
                  const isActive = cat.id === activeCategory;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white/[0.04] border-white/15 text-white shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
                          : "bg-transparent border-transparent hover:bg-white/[0.02] text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors ${
                        isActive ? "bg-white/10 text-white" : "bg-white/[0.03] text-muted-foreground"
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold tracking-wider uppercase block">{cat.name}</span>
                        <span className="text-[9px] text-muted-foreground font-mono">{cat.rules.length} REGULI</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Main Rules Content */}
              <div className="lg:col-span-3 space-y-6">
                <div className="glass rounded-2xl p-6 border-white/5 bg-white/[0.01]">
                  <h2 className="text-lg font-light tracking-widest text-silver uppercase mb-1">{activeData.name}</h2>
                  <p className="text-xs text-muted-foreground font-light leading-relaxed">{activeData.description}</p>
                </div>

                {displayData.rules.length === 0 ? (
                  <div className="glass rounded-2xl p-16 border-white/5 text-center">
                    <ShieldAlert className="h-8 w-8 text-muted-foreground/30 mx-auto mb-4" />
                    <h3 className="text-sm font-semibold text-foreground mb-1">Nicio regulă găsită</h3>
                    <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                      Nu am găsit nicio regulă care să se potrivească termenilor căutați de tine. Încearcă alte cuvinte cheie.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayData.rules.map((rule, idx) => {
                      const key = `${activeCategory}-${idx}`;
                      const isExpanded = !!expandedRules[key];
                      
                      return (
                        <div
                          key={idx}
                          className={`glass rounded-xl border transition-all duration-500 overflow-hidden ${
                            isExpanded 
                              ? "border-white/15 bg-white/[0.03] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)]" 
                              : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                          }`}
                        >
                          {/* Accordion Trigger Header */}
                          <button
                            onClick={() => toggleRule(activeCategory, idx)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer"
                          >
                            <div className="space-y-1">
                              <h3 className="text-sm md:text-base font-semibold tracking-wide text-foreground group-hover:text-silver transition duration-300">
                                {rule.title}
                              </h3>
                            </div>
                            <div className={`h-8 w-8 rounded-full border border-white/5 flex items-center justify-center text-silver transition-transform duration-300 ${
                              isExpanded ? "rotate-180 bg-white/5" : "bg-transparent"
                            }`}>
                              <ChevronDown className="h-4 w-4" />
                            </div>
                          </button>

                          {/* Accordion Expandable Panel */}
                          {isExpanded && (
                            <div className="px-6 pb-6 pt-2 border-t border-white/5 space-y-4 animate-fade-in">
                              

                              {/* Rule details list */}
                              <div className="space-y-3 pt-2">
                                {rule.details.map((detail, dIdx) => {
                                  if (detail.startsWith("ATENTIE!")) {
                                    return (
                                      <div key={dIdx} className="flex flex-col gap-4 mt-6 glass border-amber-500/20 bg-amber-500/5 rounded-xl p-5 shadow-lg">
                                        <div className="flex items-start gap-3">
                                          <p className="text-xs md:text-sm text-amber-400 leading-relaxed font-bold whitespace-pre-line font-sans">
                                            ⚠️ {detail}
                                          </p>
                                        </div>
                                        <div className="relative rounded-lg overflow-hidden border border-white/10 mt-4">
                                          <img src="/harta-zone.png" alt="Harta Zone Jaf" className="w-full h-auto object-cover" />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  if (detail.startsWith("Acordati atentie")) {
                                    return (
                                      <div key={dIdx} className="flex items-start gap-3 glass border-rose-500/20 bg-rose-500/5 rounded-xl p-5 mt-2 shadow-lg">
                                        <p className="text-xs md:text-sm text-rose-300 leading-relaxed font-semibold whitespace-pre-line font-sans">
                                          🚨 {detail}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div key={dIdx} className="flex items-start gap-3">
                                      <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
                                        {detail}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. SUB-VIEW: REGULAMENT JAFURI */}
        {selectedTopic === "jafuri" && (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
            {/* Header Block with Back button */}
            <div className="flex flex-col gap-4 border-b border-white/5 pb-6">
              <button
                onClick={() => setSelectedTopic(null)}
                className="self-start inline-flex items-center gap-1.5 text-xs text-silver hover:text-white font-medium tracking-wider bg-white/5 border border-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA SUBIECTE
              </button>
              
              <div>
                <p className="text-[10px] tracking-[0.4em] text-silver uppercase mb-1 font-mono">Ghid Activități Ilegale de Grup</p>
                <h1 className="text-3xl md:text-5xl font-light tracking-wide text-silver-gradient">
                  REGULAMENT JAFURI ORGANIZAȚII / CIVILi
                </h1>
                <p className="text-xs text-muted-foreground font-mono mt-2 uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  Ultima Actualizare: 1 iunie 2026 · Publicat de 19mariuss48
                </p>
              </div>
            </div>

            {/* Categories & Cooldown section */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Left Column: Types & Groups */}
              <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-5">
                <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                  <Flame className="h-4.5 w-4.5 text-orange-400 animate-pulse" />
                  TIPURI DE ACTIVITĂȚI ILEGALE
                </h3>
                
                <div className="space-y-4">
                  {contentData?.jafuriData.tipuri.map((tip: any, index: number) => (
                    <div key={index} className="space-y-2">
                      <span className="text-[11px] font-bold text-white tracking-widest uppercase font-mono">{tip.name}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {tip.items.map((it: string, i: number) => (
                          <span key={i} className="text-[10px] font-medium text-silver bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                            {it}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Time limits / Cooldowns */}
              <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-5">
                <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                  <Clock className="h-4.5 w-4.5 text-blue-400" />
                  COOLDOWN & TIMPI DE RESECȚIE
                </h3>
                
                <div className="space-y-3.5">
                  {contentData?.jafuriData.informatii.map((inf: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="h-2 w-2 rounded-full bg-blue-500/80 mt-1.5 shrink-0" />
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {inf}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Participants numeric requirements table */}
            <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-6">
              <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                <User className="h-4.5 w-4.5 text-silver" />
                NUMĂR PARTICIPANȚI ÎNARMACȚI OBLIGATORII
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[9px] uppercase tracking-widest text-muted-foreground font-bold">
                      <th className="pb-3 pl-3">Denumire Jaf / Acțiune</th>
                      <th className="pb-3 text-center">Minim Participanți</th>
                      <th className="pb-3 text-center">Maxim Participanți</th>
                      <th className="pb-3 pr-3 text-right">Tip Configurație</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-silver">
                    {contentData?.jafuriData.participanti.map((p: any, idx: number) => (
                      <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-3 pl-3 font-medium text-white">{p.jaf}</td>
                        <td className="py-3 text-center font-mono text-emerald-400 font-semibold">{p.min} membrii</td>
                        <td className="py-3 text-center font-mono text-rose-400 font-semibold">{p.max} membrii</td>
                        <td className="py-3 pr-3 text-right text-muted-foreground uppercase text-[9px] tracking-wider">
                          {p.max <= 8 ? "Acțiune Mică" : p.max <= 16 ? "Acțiune Medie" : "Acțiune Heist Majoră"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Strictest Forbidden Rules list */}
            <div className="glass rounded-2xl p-6 border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent space-y-6">
              <h3 className="text-sm font-bold tracking-wider text-silver uppercase flex items-center gap-2 border-b border-white/5 pb-3">
                <ShieldAlert className="h-4.5 w-4.5 text-rose-500" />
                REGULI & INTERDICȚII SEVERE
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {contentData?.jafuriData.reguli.map((reg: string, i: number) => {
                  const isInterzis = reg.includes("INTERZIS");
                  return (
                    <div key={i} className={`p-4 rounded-xl border flex items-start gap-3 ${
                      isInterzis 
                        ? "bg-rose-500/[0.02] border-rose-500/10 text-rose-200/90" 
                        : "bg-emerald-500/[0.02] border-emerald-500/10 text-emerald-200/90"
                    }`}>
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isInterzis ? "bg-rose-500/15 text-rose-400" : "bg-emerald-500/15 text-emerald-400"
                      }`}>
                        {isInterzis ? "✕" : "✓"}
                      </div>
                      <p className="text-xs leading-relaxed font-light">
                        {reg}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer block */}
            <div className="glass border-amber-500/10 bg-amber-500/[0.02] rounded-2xl p-5 flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold tracking-widest text-amber-500 uppercase">ATENȚIE LA NEGOCIERI</h4>
                <p className="text-xs text-muted-foreground leading-normal">
                  Pentru jafurile majore cu ostatici, asigurați-vă că aveți o comunicare constructivă și respectuoasă cu negociatorul departamentului de poliție. Raportul de participanți va fi monitorizat în mod constant de membrii echipei Staff. Nerespectarea numărului de participanți sau utilizarea mai multor pipebomb-uri decât limita impusă va duce la anularea completă a acțiunii Roleplay.
                </p>
              </div>
            </div>

          </div>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}
