import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile } from "@/lib/api/profile.server";
import { getForumDetails, getForumThreads } from "@/lib/api/forum.server";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Pin, 
  Lock, 
  Eye, 
  MessageSquare, 
  User as UserIcon, 
  PlusCircle, 
  ArrowLeft, 
  FileText, 
  ChevronRight, 
  Calendar 
} from "lucide-react";

export const Route = createFileRoute("/forum/$forumSlug")({
  head: ({ params }) => {
    const slug = params.forumSlug;
    const cleanTitle = slug.replace("-", " ").toUpperCase();
    return {
      meta: [
        { title: `${cleanTitle} · FORUM FLOW ROMÂNIA` },
        { name: "description", content: `Vizualizează discuțiile active, topicele și ghidurile din secțiunea ${cleanTitle}.` },
      ],
    };
  },
  component: SubForumPage,
});



function SubForumPage() {
  const { forumSlug } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [forumDetails, setForumDetails] = useState<any>(null);
  const [categoryName, setCategoryName] = useState("FORUM");
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);

  useEffect(() => {
    const loadSubForumData = async () => {
      setLoading(true);
      
      // Fetch user profile if logged in and not loaded yet to prevent visual blinks
      if (user && !currentUserProfile) {
        try {
          const prf = await getUserProfile({ data: { userId: user.id } });
          if (prf) {
            setCurrentUserProfile(prf);
          }
        } catch (e) {
          console.warn("Could not load user profile:", e);
        }
      }

      try {
        // 1. Fetch forum details by slug
        const fm = await getForumDetails({ data: { slug: forumSlug } });
        if (!fm) throw new Error("Forum not found");
        
        setForumDetails(fm);
        setCategoryName("SECȚIUNE");

        // 2. Fetch live threads
        const ths = await getForumThreads({ data: { forumId: fm.id } });
        setThreads(ths || []);
      } catch (err) {
        console.warn("Failed to load forum details:", err);
        const fallbackTitle = forumSlug
          .replace("-", " ")
          .replace(/\b\w/g, c => c.toUpperCase());
        
        setForumDetails({
          title: fallbackTitle,
          description: "Portal comunitar activ pentru FLOW ROMÂNIA. Adaugă topice, dezbate subiecte și susține-ți opinia.",
          icon: "◆"
        });
        setThreads([]);
      } finally {
        setLoading(false);
      }
    };

    loadSubForumData();
  }, [forumSlug]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">ACASĂ</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/forum" className="hover:text-foreground transition-colors">FORUM</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-muted-foreground uppercase">{categoryName}</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-silver font-semibold uppercase">{forumDetails?.title || forumSlug}</span>
        </div>

        {/* Forum Section Header */}
        <div className="glass rounded-2xl p-8 mb-8 border-white/10 relative overflow-hidden bg-gradient-to-r from-white/[0.02] to-transparent">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-silver text-xl">
                {forumDetails?.icon || "◆"}
              </div>
              <div className="space-y-1.5">
                <h1 className="text-2xl md:text-3xl font-light tracking-wide text-silver-gradient">
                  {forumDetails?.title || forumSlug.replace("-", " ").toUpperCase()}
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground max-w-2xl leading-relaxed font-light">
                  {forumDetails?.description || "Sub-secțiune de forum dedicată discuțiilor membrilor din FLOW ROMÂNIA."}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex gap-3">
              <Button
                onClick={() => navigate({ to: "/" })}
                variant="outline"
                className="border-white/5 hover:bg-white/5 text-silver text-xs tracking-widest gap-2 h-10 px-4 rounded-full"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                ÎNAPOI LA FORUM
              </Button>
              
              <Link
                to="/forum/new-topic/$forumSlug"
                params={{ forumSlug }}
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-xs tracking-widest font-bold hover:bg-white/90 transition shadow-[0_0_30px_-8px_rgba(255,255,255,0.4)] gap-1.5"
              >
                <PlusCircle className="h-4 w-4" />
                CREEAZĂ TOPIC NOU
              </Link>
            </div>
          </div>
        </div>

        {/* Thread list Section */}
        <div className="space-y-4">
          <div className="px-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Discuții Active
          </div>

          {loading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 rounded-full border-t border-white animate-spin" />
              </div>
              <span className="text-[10px] text-muted-foreground tracking-widest animate-pulse">SE ÎNCARCĂ SUBIECTELE...</span>
            </div>
          ) : threads.length === 0 ? (
            <div className="glass rounded-2xl p-16 border-white/5 flex flex-col items-center justify-center text-center">
              <FileText className="h-10 w-10 text-muted-foreground/30 mb-4" />
              <h3 className="text-sm font-semibold text-foreground mb-1">Niciun subiect găsit</h3>
              <p className="text-xs text-muted-foreground max-w-sm mb-6 leading-relaxed">
                Nu există nicio discuție deschisă în acest sub-forum. Fii primul care propune un subiect!
              </p>
              <Link
                to="/forum/new-topic/$forumSlug"
                params={{ forumSlug }}
                className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 text-xs tracking-widest font-bold hover:bg-white/90 transition"
              >
                <PlusCircle className="h-3.5 w-3.5 mr-1.5" />
                CREEAZĂ PRIMUL TOPIC
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {threads.filter(t => !(forumSlug === "spitalul-general" && t.title.toLowerCase().includes("reclamatii"))).map((t) => {
                const isCurrentUser = user && (
                  t.user_name === currentUserProfile?.display_name ||
                  t.user_name === currentUserProfile?.username ||
                  t.user_name === `@${currentUserProfile?.username}` ||
                  t.user_name?.replace("@", "") === currentUserProfile?.username
                );
                
                const thread = isCurrentUser && currentUserProfile ? {
                  ...t,
                  user_name: currentUserProfile.display_name || currentUserProfile.username,
                  avatar_url: currentUserProfile.avatar_url || ""
                } : t;

                const initial = thread.user_name ? thread.user_name.replace("@", "").charAt(0).toUpperCase() : "C";
                
                return (
                  <Link
                    key={thread.id}
                    to="/forum/thread/$threadId"
                    params={{ threadId: thread.id }}
                    className="group relative glass rounded-xl p-4 md:p-5 hover:bg-white/[0.04] border-white/5 hover:border-white/15 transition-all duration-300 flex flex-col gap-3 cursor-pointer"
                  >
                    {/* Glowing effect for pinned threads */}
                    {thread.is_pinned && (
                      <div className="absolute inset-0 rounded-xl border border-amber-400/20 shadow-[0_0_15px_rgba(251,191,36,0.05)] pointer-events-none" />
                    )}

                    <div className="flex items-start gap-4">
                      {/* Author Avatar */}
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center text-silver text-sm shrink-0 mt-0.5 relative z-10">
                        {thread.avatar_url ? (
                          <img src={thread.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          <span>{initial}</span>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="space-y-1.5 min-w-0 flex-1 relative z-10">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                            <strong className="text-silver hover:underline">@{thread.user_name}</strong> a postat un subiect
                          </span>
                          <span className="h-1 w-1 bg-white/20 rounded-full" />
                          <span className="text-[10px] text-muted-foreground font-light flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(thread.created_at).toLocaleDateString('ro-RO')}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                          <h3 className="text-base md:text-lg font-medium text-foreground tracking-wide group-hover:text-silver-gradient transition duration-300">
                            {thread.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {thread.is_pinned && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-bold tracking-widest bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2 py-1 rounded uppercase shadow-[0_0_10px_rgba(251,191,36,0.1)]">
                              <Pin className="h-2.5 w-2.5 shrink-0 fill-amber-400" />
                              Fixat
                            </span>
                          )}
                          {thread.is_locked && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-bold tracking-widest bg-rose-400/10 border border-rose-400/20 text-rose-400 px-2 py-1 rounded uppercase">
                              <Lock className="h-2.5 w-2.5 shrink-0" />
                              Închis
                            </span>
                          )}
                          {thread.category && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest bg-white/5 border border-white/10 text-silver px-2.5 py-1 rounded uppercase">
                              {thread.category}
                            </span>
                          )}
                          
                          <div className="flex items-center gap-2 ml-auto sm:ml-0">
                            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                              <Eye className="h-3 w-3 text-muted-foreground/60" />
                              {typeof thread.views_count === 'number' ? thread.views_count.toLocaleString() : (thread.views_count || 0)}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                              <MessageSquare className="h-3 w-3 text-muted-foreground/60" />
                              {thread.replies_count.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
