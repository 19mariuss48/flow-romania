import { useEffect, useState } from "react";
import { getForumStructure } from "@/lib/api/forum.server";
import { Link } from "@tanstack/react-router";

type LocalSub = { name: string; topics: number };
type LocalCat = {
  title: string;
  desc: string;
  icon: string;
  slug: string;
  threads_count?: number;
  posts_count?: number;
  subs: LocalSub[];
};

type LocalCategory = {
  group: string;
  tag: string;
  slug: string;
  cats: LocalCat[];
};

// High-fidelity fallback categories in case database is loading/empty
const localFallbackCategories: LocalCategory[] = [
  {
    group: "FLOW ROMÂNIA [OOC]",
    tag: "01",
    slug: "flow-romania-ooc",
    cats: [
      { title: "Anunțuri Oficiale", slug: "anunturi", desc: "Noutăți, jurnale de modificări și știri oficiale.", icon: "📢",
        subs: [{ name: "Știri", topics: 42 }, { name: "Update-uri", topics: 18 }] },
      { title: "[FiveM] Staff FLOW", slug: "staff", desc: "Aplicații, anunțuri și informații despre echipa administrativă FLOW.", icon: "🛡️",
        subs: [] },
      { title: "[FiveM] Beneficii", slug: "beneficii", desc: "Informații despre pachete, VIP și alte avantaje pe server.", icon: "💎",
        subs: [] },
      { title: "Sugestii și Feedback", slug: "sugestii", desc: "Ajută-ne să modelăm viitorul FLOW propunând idei noi.", icon: "💡",
        subs: [{ name: "Acceptate", topics: 31 }, { name: "Respinse", topics: 22 }] },
      { title: "Discuții Generale", slug: "discutii-generale", desc: "Discuții libere (Free Chat) și subiecte diverse legate de comunitate.", icon: "💬",
        subs: [] },
    ],
  },
  {
    group: "FLOW ROMÂNIA [IC]",
    tag: "02",
    slug: "flow-romania-ic",
    cats: [
      { title: "[FiveM] Poliția Română", slug: "politia-romana", desc: "Secția de poliție Los Santos. Aplicații și aviziere oficiale.", icon: "🚔",
        subs: [] },
      { title: "[FiveM] Spitalul General", slug: "spitalul-general", desc: "Departamentul medical al orașului. Informații și recrutări.", icon: "🏥",
        subs: [] },
      { title: "[FiveM] Syndicate Business", slug: "syndicate-business", desc: "Centrul de afaceri, aplicatii si dezvoltare economica.", icon: "💼",
        subs: [] }
    ],
  },
];

export function ForumIndex() {
  const [dbCategories, setDbCategories] = useState<LocalCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForumStructure = async () => {
      try {
        setLoading(true);
        const structured = await getForumStructure();
        
        // Map the result to match LocalCategory structure with fallbacks
        const finalStructured: LocalCategory[] = structured.map(cat => {
          return {
            group: cat.group,
            slug: cat.slug,
            tag: cat.tag,
            cats: cat.cats.map(f => {
              const matchingFallbackCat = localFallbackCategories
                .flatMap(g => g.cats)
                .find(c => c.slug === f.slug);

              return {
                title: f.title,
                slug: f.slug,
                desc: f.desc,
                icon: f.icon,
                threads_count: f.threads_count,
                posts_count: f.posts_count,
                subs: matchingFallbackCat?.subs || []
              };
            })
          };
        });

        if (finalStructured.length > 0) {
          setDbCategories(finalStructured);
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

  // Read local mock threads/posts to reflect live additions by users
  let localThreads: any[] = [];
  let localPosts: any[] = [];
  if (typeof window !== "undefined") {
    try {
      localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
      localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
    } catch (e) {}
  }

  return (
    <section id="forum" className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 text-center">
          <p className="text-xs tracking-[0.5em] text-silver mb-4">DIRECTOR</p>
          <h2 className="text-4xl md:text-6xl font-light tracking-[0.1em] text-silver-gradient">FORUM</h2>
          <div className="mx-auto mt-6 hairline w-32" />
        </div>

        <div className="space-y-20">
          {displayCategories.map((g) => (
            <div key={g.group}>
              <div className="flex items-baseline justify-between mb-8">
                <div className="flex items-baseline gap-6">
                  <span className="text-xs tracking-[0.4em] text-muted-foreground">{g.tag}</span>
                  <h3 className="text-xl md:text-2xl font-light tracking-[0.25em] text-foreground">{g.group}</h3>
                </div>
                <div className="flex-1 mx-8 hairline" />
                <span className="text-[10px] tracking-[0.4em] text-muted-foreground">VEZI TOT</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.cats.map((c) => {
                  const cLocalThreads = localThreads.filter(t => t.forum_slug === c.slug);
                  const localThreadsCount = cLocalThreads.length;
                  const localPostsCount = localPosts.filter(p => cLocalThreads.some(t => t.id === p.thread_id)).length;
                  const localLikesCount = cLocalThreads.reduce((acc, t) => acc + (t.likes || 0), 0) + 
                    localPosts.filter(p => cLocalThreads.some(t => t.id === p.thread_id)).reduce((acc, p) => acc + (p.likes || 0), 0);

                  const baseThreads = c.threads_count ?? 0;
                  const basePosts = c.posts_count ?? 0;
                  const baseLikes = 0;

                  const finalThreads = baseThreads + localThreadsCount;
                  const finalPosts = basePosts + Math.max(0, localPostsCount - localThreadsCount); // numarul raspunsurilor sa se incarce la postari
                  const finalLikes = baseLikes + localLikesCount;

                  return (
                    <Link
                      key={c.slug}
                      to="/forum/$forumSlug"
                      params={{ forumSlug: c.slug }}
                      className="group relative glass rounded-xl p-6 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(255,255,255,0.15)] block cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-silver text-lg group-hover:bg-white/10 transition">
                          {c.icon}
                        </div>
                        <span className="text-[10px] tracking-[0.3em] text-muted-foreground opacity-0 group-hover:opacity-100 transition font-semibold">INTRĂ →</span>
                      </div>
                      <h4 className="text-base font-medium tracking-wide text-foreground mb-1">{c.title}</h4>
                      <p className="text-xs text-muted-foreground mb-5 leading-relaxed">{c.desc}</p>
                      
                      <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] text-muted-foreground">
                        <div className="flex gap-4">
                          <span>Subiecte: <span className="text-silver font-semibold font-mono">{finalThreads}</span></span>
                          <span>Postări: <span className="text-silver font-semibold font-mono">{finalPosts}</span></span>
                          <span>Aprecieri: <span className="text-emerald-400/80 font-semibold font-mono">{finalLikes}</span></span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
