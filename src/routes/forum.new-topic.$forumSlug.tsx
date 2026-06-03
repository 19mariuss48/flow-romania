import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Send, 
  FileText, 
  ChevronRight, 
  ShieldAlert 
} from "lucide-react";

export const Route = createFileRoute("/forum/new-topic/$forumSlug")({
  head: () => ({
    meta: [
      { title: "Deschide Subiect Nou · FLOW ROMÂNIA" },
    ],
  }),
  component: NewTopicPage,
});

function NewTopicPage() {
  const { forumSlug } = Route.useParams();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  
  const [forumDetails, setForumDetails] = useState<any>(null);
  const [forumLoading, setForumLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Trebuie să te conectezi pentru a deschide un subiect nou!");
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("username, display_name, avatar_url, reputation, faction")
        .eq("id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data);
        });
    }
  }, [user]);

  useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        setForumLoading(true);
        const { data, error } = await supabase
          .from("forums")
          .select("id, title, slug")
          .eq("slug", forumSlug)
          .single();
        
        if (error) throw error;
        setForumDetails(data);
      } catch (err) {
        console.warn("Failed to load forum details for new topic. Using slug fallback:", err);
        const fallbackTitle = forumSlug
          .replace("-", " ")
          .replace(/\b\w/g, c => c.toUpperCase());
        
        setForumDetails({
          id: `mock-forum-${forumSlug}`,
          slug: forumSlug,
          title: fallbackTitle
        });
      } finally {
        setForumLoading(false);
      }
    };

    fetchForumDetails();
  }, [forumSlug]);

  const handleSubmitTopic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !forumDetails) return;
    
    // Cooldown check removed so users can post announcements freely
    
    if (title.trim().length < 5) {
      return toast.error("Titlul trebuie să conțină cel puțin 5 caractere.");
    }
    if (content.trim().length < 15) {
      return toast.error("Conținutul trebuie să conțină cel puțin 15 caractere.");
    }

    setPublishing(true);
    try {
      // 1. Insert thread
      const { data: threadData, error: threadError } = await supabase
        .from("forum_threads")
        .insert({
          forum_id: forumDetails.id,
          user_id: user.id,
          title: title.trim(),
          content: content.trim() // Duplicate content on thread directly as backup summary
        })
        .select()
        .single();

      if (threadError) throw threadError;

      // 2. Insert first post (which serves as the main content body)
      const { error: postError } = await supabase
        .from("forum_posts")
        .insert({
          thread_id: threadData.id,
          user_id: user.id,
          content: content.trim()
        });

      if (postError) throw postError;

      // 3. Award reputation points for creating a new topic (+10 REP)
      if (profile) {
        const currentReputation = profile.reputation || 0;
        await supabase
          .from("profiles")
          .update({ reputation: currentReputation + 10 })
          .eq("id", user.id);
      }

      // Set cooldown timestamp
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());

      toast.success("Subiectul tău a fost publicat cu succes!");
      navigate({ 
        to: "/forum/thread/$threadId", 
        params: { threadId: threadData.id } 
      });
    } catch (err: any) {
      console.warn("Could not submit thread to Supabase. Simulating local mock submission:", err);
      
      const generatedId = `local-t-${Date.now()}`;
      const userDisplayName = profile?.display_name || profile?.username || user.user_metadata?.display_name || user.user_metadata?.username || user.email?.split("@")[0] || "Cetățean";
      const userAvatar = profile?.avatar_url || user.user_metadata?.avatar_url || "";
      
      const newThread = {
        id: generatedId,
        forum_slug: forumSlug,
        title: title.trim(),
        content: content.trim(),
        user_name: userDisplayName,
        avatar_url: userAvatar,
        is_pinned: false,
        is_locked: false,
        replies_count: 0,
        views_count: 0,
        created_at: new Date().toISOString()
      };
      
      const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
      localThreads.push(newThread);
      localStorage.setItem("flowro_local_threads", JSON.stringify(localThreads));
      
      const newPost = {
        id: `local-p-${Date.now()}`,
        thread_id: generatedId,
        user_name: userDisplayName,
        avatar_url: userAvatar,
        rank: profile?.faction || "Jucător",
        reputation: profile?.reputation || 0,
        content: content.trim(),
        created_at: newThread.created_at,
        likes: 0,
        liked: false
      };
      
      const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
      localPosts.push(newPost);
      localStorage.setItem("flowro_local_posts", JSON.stringify(localPosts));

      // Set cooldown timestamp
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());

      toast.success("Subiectul tău a fost publicat cu succes (Simulare locală)!");
      navigate({ 
        to: "/forum/thread/$threadId", 
        params: { threadId: generatedId } 
      });
    } finally {
      setPublishing(false);
    }
  };

  if (authLoading || forumLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-t border-white animate-spin" />
          </div>
          <span className="text-[10px] text-muted-foreground tracking-widest animate-pulse">SE ÎNCARCĂ DATELE...</span>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium">
          <Link to="/" className="hover:text-foreground transition-colors">ACASĂ</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/" className="hover:text-foreground transition-colors">FORUM</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/forum/$forumSlug" params={{ forumSlug }} className="hover:text-foreground transition-colors uppercase">
            {forumDetails?.title || forumSlug}
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-silver font-semibold">SUBIECT NOU</span>
        </div>

        {/* New Topic form Card */}
        <div className="glass rounded-2xl p-6 md:p-8 border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-silver">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-light tracking-wide text-silver-gradient">
                DESCHIDE SUBIECT NOU
              </h1>
              <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-relaxed">
                Publici în secțiunea: <span className="text-silver font-semibold">{forumDetails?.title || forumSlug}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitTopic} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="top-title" className="text-xs text-silver tracking-wider uppercase">Titlu Subiect (Sugestiv & Scurt)</Label>
              <Input 
                id="top-title" 
                type="text" 
                required 
                minLength={5}
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Introdu un titlu clar care rezumă subiectul"
                className="bg-white/5 border-white/10 text-foreground text-sm focus:border-white/40 h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="top-content" className="text-xs text-silver tracking-wider uppercase">Descrierea / Mesajul Subiectului</Label>
              <textarea 
                id="top-content" 
                rows={10}
                required 
                minLength={15}
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                placeholder="Redactează mesajul tău de deschidere. Oferă cât mai multe detalii relevante, imagini sau scenarii de roleplay..."
                className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none leading-relaxed"
              />
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-xl p-4 text-[10px] text-muted-foreground leading-normal flex items-start gap-2.5">
              <ShieldAlert className="h-4.5 w-4.5 shrink-0 text-amber-400" />
              <p>
                ⚠️ <strong>Atenție!</strong> Prin publicarea acestui subiect de discuție, ești de acord cu regulamentul general al comunității FLOW ROMÂNIA. Te rugăm să păstrezi un limbaj civilizat, adecvat și OOC-constructiv. Subiectele care conțin injurii, link-uri neautorizate sau instigare vor fi închise și șterse de administratori, iar contul tău poate fi sancționat.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate({ to: "/forum/$forumSlug", params: { forumSlug } })}
                className="border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider px-6 h-10 rounded-full"
              >
                ANULEAZĂ
              </Button>
              
              <Button
                type="submit"
                disabled={publishing || !title.trim() || !content.trim()}
                className="bg-white text-black hover:bg-white/90 text-xs font-bold tracking-widest px-8 h-10 rounded-full gap-1.5 cursor-pointer"
              >
                {publishing ? "SE PUBLICĂ..." : "PUBLICĂ SUBIECTUL"}
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </form>
        </div>

      </main>

      <SiteFooter />
    </div>
  );
}
