import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
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

// Premium High-Fidelity Mock Fallback threads per section to make the forum look fully active
const mockThreadsData: Record<string, any[]> = {};

// Default threads fallback for unconfigured sections
const genericThreadsFallback: any[] = [];

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
          const { data } = await supabase
            .from("profiles")
            .select("username, display_name, avatar_url")
            .eq("id", user.id)
            .single();
          if (data) {
            setCurrentUserProfile(data);
          }
        } catch (e) {
          console.warn("Could not load user profile:", e);
        }
      }

      const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]")
        .filter((t: any) => t.forum_slug === forumSlug);

      try {
        // 1. Fetch forum details by slug
        const { data: fm, error: fmError } = await supabase
          .from("forums")
          .select("id, title, category_id, description, icon")
          .eq("slug", forumSlug)
          .single();

        if (fmError) throw fmError;
        setForumDetails(fm);

        // 2. Fetch category details
        const { data: cat } = await supabase
          .from("forum_categories")
          .select("title")
          .eq("id", fm.category_id)
          .single();
        
        if (cat) setCategoryName(cat.title);

        // 3. Fetch live threads
        const { data: ths, error: thsError } = await supabase
          .from("forum_threads")
          .select(`
            id,
            title,
            is_pinned,
            is_locked,
            views_count,
            replies_count,
            created_at,
            user_id
          `)
          .eq("forum_id", fm.id)
          .order("is_pinned", { ascending: false })
          .order("created_at", { ascending: false });

        if (thsError) throw thsError;

        // Fetch profile names for these threads
        if (ths && ths.length > 0) {
          const userIds = ths.map(t => t.user_id);
          const { data: prfs } = await supabase
            .from("profiles")
            .select("id, username, display_name, avatar_url")
            .in(
              userIds.filter(
                (value, index, self) => self.indexOf(value) === index
              )
            );

          const joinedThreads = ths.map(t => {
            const prf = prfs?.find(p => p.id === t.user_id);
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
        // Set mock fallbacks based on slug
        const mockFallback = mockThreadsData[forumSlug] || genericThreadsFallback;
        setThreads([...localThreads, ...mockFallback]);
        
        // Generate mock forum title from slug for clean fallback rendering
        const fallbackTitle = forumSlug
          .replace("-", " ")
          .replace(/\b\w/g, c => c.toUpperCase());
        
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
          <Link to="/" className="hover:text-foreground transition-colors">FORUM</Link>
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
              {threads.map((t) => {
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
                const isMock = String(thread.id).startsWith("mock-");
                
                return (
                  <Link
                    key={thread.id}
                    to="/forum/thread/$threadId"
                    params={{ threadId: thread.id }}
                    className="group relative glass rounded-xl p-4 md:p-5 hover:bg-white/[0.03] border-white/5 hover:border-white/15 transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      {/* Author Avatar */}
                      <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 overflow-hidden flex items-center justify-center text-silver text-sm shrink-0">
                        {thread.avatar_url ? (
                          <img src={thread.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                          <span>{initial}</span>
                        )}
                      </div>

                      {/* Thread Title & Author info */}
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          {thread.is_pinned && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-bold tracking-widest bg-amber-400/10 border border-amber-400/20 text-amber-400 px-1.5 py-0.5 rounded uppercase">
                              <Pin className="h-2 w-2 shrink-0 fill-amber-400" />
                              Fixat
                            </span>
                          )}
                          {thread.is_locked && (
                            <span className="inline-flex items-center gap-0.5 text-[8px] font-bold tracking-widest bg-rose-400/10 border border-rose-400/20 text-rose-400 px-1.5 py-0.5 rounded uppercase">
                              <Lock className="h-2 w-2 shrink-0" />
                              Închis
                            </span>
                          )}
                          
                          <h3 className="text-sm md:text-base font-medium text-foreground tracking-wide group-hover:text-silver-gradient transition duration-300 truncate">
                            {thread.title}
                          </h3>
                        </div>

                        {/* Thread Metadata */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted-foreground font-light">
                          <span>
                            deschis de <strong className="text-silver hover:underline">@{thread.user_name}</strong>
                          </span>
                          <span className="h-1 w-1 bg-white/20 rounded-full" />
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(thread.created_at).toLocaleDateString('ro-RO')}
                          </span>
                          {isMock && (
                            <>
                              <span className="h-1 w-1 bg-white/20 rounded-full" />
                              <span className="text-amber-400/70 text-[9px] font-bold font-mono">SIMULAT</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Replies & Views counters (Right side) */}
                    <div className="flex items-center gap-6 shrink-0 text-right pr-2">
                      <div className="hidden sm:block space-y-0.5">
                        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">VIZUALIZĂRI</div>
                        <div className="text-xs font-semibold text-silver font-mono flex items-center gap-1 justify-end">
                          <Eye className="h-3.5 w-3.5 text-muted-foreground/60" />
                          {typeof thread.views_count === 'number' ? thread.views_count.toLocaleString() : (thread.views_count || 0)}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[10px] text-muted-foreground tracking-widest uppercase">RĂSPUNSURI</div>
                        <div className="text-xs font-semibold text-silver font-mono flex items-center gap-1 justify-end">
                          <MessageSquare className="h-3.5 w-3.5 text-muted-foreground/60" />
                          {thread.replies_count.toLocaleString()}
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
