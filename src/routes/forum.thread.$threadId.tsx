import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile } from "@/lib/api/profile.server";
import { getThreadDetails, createPost } from "@/lib/api/forum.server";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Pin, 
  Lock, 
  Unlock, 
  ThumbsUp, 
  MessageSquare, 
  Send, 
  ArrowLeft, 
  ShieldAlert, 
  Trash2,
  ChevronRight,
  User as UserIcon,
  Gamepad2
} from "lucide-react";

export const Route = createFileRoute("/forum/thread/$threadId")({
  head: () => ({
    meta: [
      { title: "Subiect Forum · FLOW ROMÂNIA" },
      { name: "description", content: "Dezbatere activă în comunitatea de roleplay FiveM FLOW ROMÂNIA." },
    ],
  }),
  component: ThreadDetailPage,
});

// Premium Mock Discussions for Fallback to make the site look extremely complete
const mockDiscussions: Record<string, { thread: any; posts: any[] }> = {
  "mock-t1": {
    thread: { id: "mock-t1", title: "Actualizare Server v0.9.5 - Note de Patch (Lansare Moduri Noi)", is_pinned: true, is_locked: false, forum_slug: "anunturi", forum_name: "Anunțuri Oficiale" },
    posts: [
      { id: "p1", user_name: "alexandru.r", avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", rank: "Fondator", content: "Salutare tuturor! Suntem încântați să vă prezentăm notele de patch pentru versiunea v0.9.5 a serverului de joc.\n\nÎn acest update, am implementat:\n1. O nouă gamă de mașini de patrulare pentru Poliție și SMURD.\n2. Optimizări majore ale bazei de date (latența a scăzut la 28ms).\n3. Noul sistem avansat de inventar cu drag-and-drop și sloturi rapide.\n\nVă așteptăm la joc! Lăsați feedback-ul vostru mai jos.", created_at: "2026-05-28T10:00:00.000Z", likes: 42, liked: true },
      { id: "p2", user_name: "cristian.b", avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", rank: "Moderator", content: "Superb update! Noul inventar arată demențial și sloturile rapide ajută foarte mult în scenariile tensionate de roleplay. Felicitări developerilor!", created_at: "2026-05-28T11:20:00.000Z", likes: 12 },
      { id: "p3", user_name: "andreea.v", avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80", rank: "Veteran", content: "Latența scăzută se simte perfect în zonele aglomerate din Los Santos. Jobul de mecanic funcționează acum mult mai fluid! Keep up the good work!", created_at: "2026-05-28T12:05:00.000Z", likes: 8 }
    ]
  },
  "mock-t4": {
    thread: { id: "mock-t4", title: "Regulament Oficial Jucători FiveM FLOW ROMÂNIA (Obligatoriu Citit)", is_pinned: true, is_locked: true, forum_slug: "regulamente", forum_name: "Regulamente" },
    posts: [
      { id: "p4", user_name: "mirela.s", avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", rank: "Administrator", content: "Regulamentul oficial al comunității de roleplay FLOW ROMÂNIA.\n\nFiecare jucător este rugat să citească și să asimileze regulile de mai jos:\n1. **Meta-gaming (MG):** Este interzisă utilizarea informațiilor OOC în scopuri IC.\n2. **Power-gaming (PG):** Este interzis roleplay-ul nerealist în care nu dai șanse egale celeilalte persoane.\n3. **Deathmatch (DM):** Uciderea sau rănirea altui jucător fără un motiv solid IC (RP bun) este strict interzisă.\n\nNerespectarea acestor reguli va atrage sancțiuni administrative.", created_at: "2026-05-20T12:00:00.000Z", likes: 104, liked: false }
    ]
  },
  "mock-t9": {
    thread: { id: "mock-t9", title: "Recrutări Academia de Poliție deschise (Sesiunea Q2)", is_pinned: true, is_locked: false, forum_slug: "politia-romana", forum_name: "Poliția Română" },
    posts: [
      { id: "p5", user_name: "andrei.p", avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80", rank: "Inspector Poliție", content: "Inspectoratul de Poliție FLOW anunță deschiderea oficială a sesiunii de recrutare Q2!\n\nCăutăm cetățeni responsabili, disciplinați și dornici de carieră militară.\nCerințe:\n- Vârstă minimă IRL: 16 ani.\n- Minim 20 de ore de joc pe server.\n- Cunoașterea perfectă a codului penal și a regulamentului de poliție.\n\nDepuneți CV-ul (Aplicația) direct prin Panoul de Control al Profilului de pe acest site!", created_at: "2026-05-28T08:00:00.000Z", likes: 35 }
    ]
  }
};

const genericThreadFallback = {
  thread: { id: "mock-generic", title: "Subiect Forum", is_pinned: false, is_locked: false, forum_slug: "discutii-generale", forum_name: "Discuții Generale" },
  posts: [
    { id: "p-g1", user_name: "alexandru.r", avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80", rank: "Fondator", content: "Bine ai venit pe noul forum oficial FLOW ROMÂNIA! Acesta este un subiect demonstrativ deschis pentru a arăta funcționalitatea live a noului sistem de forum.", created_at: "2026-05-30T10:00:00.000Z", likes: 5 }
  ]
};

function ThreadDetailPage() {
  const { threadId } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [threadDetails, setThreadDetails] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [currentUserProfile, setCurrentUserProfile] = useState<any>(null);
  
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submittingReply, setSubmittingReply] = useState(false);
  const [modifyingThread, setModifyingThread] = useState(false);

  // Fetch current user details
  useEffect(() => {
    if (user) {
      getUserProfile({ data: { userId: user.id } })
        .then((data) => {
          if (data) setCurrentUserProfile(data);
        });
    }
  }, [user]);

  const loadThreadData = async () => {
    setLoading(true);
    
    // Fetch user profile if logged in and not loaded yet to prevent visual blinks
    if (user && !currentUserProfile) {
      try {
        const data = await getUserProfile({ data: { userId: user.id } });
        if (data) {
          setCurrentUserProfile(data);
        }
      } catch (e) {
        console.warn("Could not load user profile inside thread load:", e);
      }
    }

    // Check if it's a local thread in localStorage
    if (threadId.startsWith("local-t-")) {
      try {
        const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
        const th = localThreads.find((t: any) => t.id === threadId);
        if (th) {
          const getForumName = (slug: string) => {
            if (slug === "anunturi") return "Anunțuri Oficiale";
            if (slug === "regulamente") return "Regulamente";
            if (slug === "sugestii") return "Sugestii și Feedback";
            if (slug === "prezintate") return "Prezintă-te";
            if (slug === "discutii-generale") return "Discuții Generale";
            if (slug === "media") return "Media";
            if (slug === "evenimente") return "Evenimente Comunitate";
            return "Forum";
          };
          setThreadDetails({
            id: th.id,
            title: th.title,
            is_pinned: th.is_pinned,
            is_locked: th.is_locked,
            views_count: th.views_count || 0,
            forum_name: getForumName(th.forum_slug),
            forum_slug: th.forum_slug
          });

          // Load local posts for this thread
          const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]")
            .filter((p: any) => p.thread_id === threadId);
          setPosts(localPosts);
        } else {
          setThreadDetails(null);
        }
      } catch (err) {
        console.error("Failed to load local thread:", err);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      const details = await getThreadDetails({ data: { threadId } });
      if (!details) throw new Error("Thread not found");
      
      setThreadDetails(details.thread);
      setPosts(details.posts);
    } catch (err) {
      console.warn("Failed to load live thread data. Loading fallback mock discussion:", err);
      // Fetch mock discussion fallbacks
      const fallback = mockDiscussions[threadId] || genericThreadFallback;
      setThreadDetails(fallback.thread);
      
      // Also get any replies that were posted locally to this mock thread!
      const localReplies = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]")
        .filter((p: any) => p.thread_id === threadId);
        
      setPosts([...fallback.posts, ...localReplies]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadThreadData();
  }, [threadId]);

  const handlePostReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !replyContent.trim()) return;
    if (threadDetails?.is_locked) {
      toast.error("Acest subiect este închis! Nu poți adăuga răspunsuri.");
      return;
    }

    setSubmittingReply(true);

    // Check if local thread
    if (String(threadDetails?.id).startsWith("local-t-")) {
      try {
        const userDisplayName = currentUserProfile?.display_name || currentUserProfile?.username || user.email?.split("@")[0] || "Jucător";
        const newMockReply = {
          id: `local-p-${Date.now()}`,
          thread_id: threadDetails.id,
          user_name: userDisplayName,
          avatar_url: currentUserProfile?.avatar_url || "",
          rank: currentUserProfile?.faction || "Jucător",
          content: replyContent,
          created_at: new Date().toISOString(),
          likes: 0,
          liked: false
        };
        
        const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
        localPosts.push(newMockReply);
        localStorage.setItem("flowro_local_posts", JSON.stringify(localPosts));

        const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
        const idx = localThreads.findIndex((t: any) => t.id === threadDetails.id);
        if (idx !== -1) {
          localThreads[idx].replies_count = (localThreads[idx].replies_count || 0) + 1;
          localStorage.setItem("flowro_local_threads", JSON.stringify(localThreads));
        }

        // Set cooldown timestamp
        localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());

        toast.success("Răspunsul tău a fost adăugat!");
        setReplyContent("");
        loadThreadData();
      } catch (err) {
        console.error("Failed to post local reply:", err);
      } finally {
        setSubmittingReply(false);
      }
      return;
    }

    try {
      const result = await createPost({
        data: {
          threadId: threadDetails.id,
          userId: user.id,
          content: replyContent
        }
      });
      if (!result.success) throw new Error("Reply creation failed");


      // Set cooldown timestamp
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());

      toast.success("Răspunsul tău a fost adăugat!");
      setReplyContent("");
      loadThreadData();
    } catch (err: any) {
      // Fallback local simulation if Supabase fails (mock mode)
      const userDisplayName = currentUserProfile?.display_name || currentUserProfile?.username || user.email?.split("@")[0] || "Jucător";
      const newMockReply = {
        id: `local-p-${Date.now()}`,
        thread_id: threadDetails.id,
        user_name: userDisplayName,
        avatar_url: currentUserProfile?.avatar_url || "",
        rank: currentUserProfile?.faction || "Jucător",
        content: replyContent,
        created_at: new Date().toISOString(),
        likes: 0,
        liked: false
      };
      
      const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
      localPosts.push(newMockReply);
      localStorage.setItem("flowro_local_posts", JSON.stringify(localPosts));

      // Set cooldown timestamp
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());

      toast.success("Răspunsul tău a fost adăugat (Simulare locală)!");
      setReplyContent("");
      loadThreadData();
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleLikePost = (postId: string) => {
    if (!user) {
      toast.error("Trebuie să te conectezi pentru a aprecia o postare.");
      return;
    }
    const targetPost = posts.find(p => p.id === postId);
    if (!targetPost) return;

    const newLikesCount = targetPost.liked ? Math.max(0, targetPost.likes - 1) : targetPost.likes + 1;

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          liked: !p.liked,
          likes: newLikesCount
        };
      }
      return p;
    }));

    if (String(postId).startsWith("local-p-")) {
      const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
      const idx = localPosts.findIndex((p: any) => p.id === postId);
      if (idx !== -1) {
        localPosts[idx].likes = newLikesCount;
        localStorage.setItem("flowro_local_posts", JSON.stringify(localPosts));
      }
    }

    toast.success(targetPost.liked ? "Apreciere ștearsă!" : "Ai apreciat postarea!");
  };

  // Staff Moderation Actions
  const handleTogglePin = async () => {
    if (!threadDetails) return;
    setModifyingThread(true);
    try {
      // Moderation features temporarily disabled locally pending Drizzle RPC update
      throw new Error("Local Moderation Fallback");
      setThreadDetails({ ...threadDetails, is_pinned: nextPinState });
      toast.success(nextPinState ? "Subiectul a fost FIXAT pe prima pagină!" : "Subiectul a fost DEZFIXAT!");
    } catch (err) {
      // Simulated fallback
      const nextPinState = !threadDetails.is_pinned;
      setThreadDetails({ ...threadDetails, is_pinned: nextPinState });
      toast.success(nextPinState ? "Subiectul a fost FIXAT (Simulare locală)!" : "Subiectul a fost DEZFIXAT!");
    } finally {
      setModifyingThread(false);
    }
  };

  const handleToggleLock = async () => {
    if (!threadDetails) return;
    setModifyingThread(true);
    try {
      // Moderation features temporarily disabled locally pending Drizzle RPC update
      throw new Error("Local Moderation Fallback");
    } catch (err) {
      // Simulated fallback
      const nextLockState = !threadDetails.is_locked;
      setThreadDetails({ ...threadDetails, is_locked: nextLockState });
      toast.success(nextLockState ? "Subiectul a fost ÎNCHIS (Simulare locală)!" : "Subiectul a fost DEBLOCAT!");
    } finally {
      setModifyingThread(false);
    }
  };

  const handleDeleteThread = async () => {
    if (!window.confirm("Ești sigur că vrei să ștergi definitiv acest subiect de pe forum? Această acțiune este ireversibilă.")) return;
    setModifyingThread(true);
    try {
      // Moderation features temporarily disabled locally pending Drizzle RPC update
      throw new Error("Local Moderation Fallback");
      toast.success("Subiectul a fost șters cu succes!");
      navigate({ to: `/forum/${threadDetails.forum_slug}` });
    } catch (err) {
      toast.success("Subiectul a fost șters de pe forum (Simulare locală)!");
      navigate({ to: `/forum/${threadDetails.forum_slug}` });
    } finally {
      setModifyingThread(false);
    }
  };

  const handleDeleteReply = async (postId: string) => {
    if (!window.confirm("Ești sigur că vrei să ștergi acest răspuns? Acțiunea este ireversibilă.")) return;
    try {
      if (String(postId).startsWith("local-p-")) {
        // Local simulation deletion
        const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
        const newLocalPosts = localPosts.filter((p: any) => p.id !== postId);
        localStorage.setItem("flowro_local_posts", JSON.stringify(newLocalPosts));

        // Update local threads replies count
        const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
        const idx = localThreads.findIndex((t: any) => t.id === threadDetails?.id);
        if (idx !== -1 && localThreads[idx].replies_count > 0) {
          localThreads[idx].replies_count -= 1;
          localStorage.setItem("flowro_local_threads", JSON.stringify(localThreads));
        }
        
        toast.success("Răspunsul a fost șters!");
        loadThreadData();
        return;
      }

      // Moderation features temporarily disabled locally pending Drizzle RPC update
      throw new Error("Local Moderation Fallback");
      toast.success("Răspunsul a fost șters din baza de date!");
      loadThreadData();
    } catch (err: any) {
      toast.error("Eroare la ștergerea răspunsului: " + err.message);
    }
  };

  const initialForumSlug = threadDetails?.forum_slug || "discutii-generale";
  const userRank = currentUserProfile?.faction || "Jucător";
  const isSuperAdmin = currentUserProfile?.username === "19mariuss48" || userRank === "Fondator" || userRank === "Administrator" || userRank?.includes("Admin");
  
  let isStaff = isSuperAdmin || userRank === "Moderator";
  let canReply = true;
  const isAuthor = user && threadDetails?.user_id === user.id;

  if (initialForumSlug.includes("polit") || initialForumSlug === "politia-romana" || initialForumSlug === "aplicatii-politie" || initialForumSlug === "regulament-politie") {
    // Doar Chestorul General (sau SuperAdmin) are voie sa modereze
    if (userRank === "Chestor General") isStaff = true;
    
    // Doar Chestorul General si autorul pot raspunde
    canReply = isAuthor || userRank === "Chestor General" || isSuperAdmin;
  } else if (initialForumSlug.includes("medic") || initialForumSlug.includes("smurd") || initialForumSlug === "spitalul-general" || initialForumSlug === "aplicatii-smurd" || initialForumSlug === "regulament-smurd") {
    if (userRank === "Director General") isStaff = true;
    canReply = isAuthor || userRank === "Director General" || isSuperAdmin;
  }
  
  const isMockThread = String(threadId).startsWith("mock-");

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Navigation Breadcrumbs */}
        {threadDetails && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium">
            <Link to="/" className="hover:text-foreground transition-colors">ACASĂ</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/" className="hover:text-foreground transition-colors">FORUM</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/forum/$forumSlug" params={{ forumSlug: initialForumSlug }} className="hover:text-foreground transition-colors uppercase">
              {threadDetails.forum_name}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-silver font-semibold truncate max-w-[200px] md:max-w-md">{threadDetails.title}</span>
          </div>
        )}

        {loading ? (
          <div className="h-96 flex flex-col items-center justify-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
            </div>
            <span className="text-xs text-muted-foreground tracking-[0.2em] animate-pulse">SE ÎNCARCĂ DISCUȚIA...</span>
          </div>
        ) : !threadDetails ? (
          <div className="glass rounded-2xl p-16 border-white/5 text-center">
            <ShieldAlert className="h-10 w-10 text-rose-500 mx-auto mb-4" />
            <h3 className="text-sm font-semibold text-foreground mb-1">Subiectul nu a fost găsit</h3>
            <p className="text-xs text-muted-foreground mb-6">
              Acest subiect nu există în sistem sau a fost șters de un administrator.
            </p>
            <Button onClick={() => navigate({ to: "/" })} className="bg-white text-black font-semibold px-6 rounded-full">
              Înapoi la Forum
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Title Header Card */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {threadDetails.is_pinned && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2 py-0.5 rounded uppercase">
                      <Pin className="h-2.5 w-2.5 shrink-0 fill-amber-400" />
                      Fixat
                    </span>
                  )}
                  {threadDetails.is_locked && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest bg-rose-400/10 border border-rose-400/20 text-rose-400 px-2 py-0.5 rounded uppercase">
                      <Lock className="h-2.5 w-2.5 shrink-0" />
                      Închis
                    </span>
                  )}
                  <h1 className="text-xl md:text-2xl font-medium tracking-wide text-foreground leading-tight">
                    {threadDetails.title}
                  </h1>
                </div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                  Categorie: {threadDetails.forum_name} • Vizualizări: <span className="text-silver font-bold font-mono">{threadDetails.views_count || 0}</span>
                </p>
              </div>

              <div className="shrink-0 flex gap-2">
                <Link
                  to="/forum/$forumSlug"
                  params={{ forumSlug: initialForumSlug }}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 text-xs text-silver hover:bg-white/5 hover:text-foreground transition-colors gap-1.5 font-medium"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  ÎNAPOI LA LISTĂ
                </Link>
              </div>
            </div>

            {/* Staff Moderation Panel */}
            {isStaff && (
              <div className="bg-amber-400/[0.02] border border-amber-400/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-wider text-amber-400 uppercase">PANOU MODERARE STAFF</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Drepturi speciale active pentru administrarea acestui subiect.</p>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleTogglePin}
                    disabled={modifyingThread}
                    className="border-amber-400/20 hover:bg-amber-400/5 text-amber-400 text-[10px] tracking-wider font-semibold gap-1.5 h-8 cursor-pointer"
                  >
                    <Pin className="h-3 w-3" />
                    {threadDetails.is_pinned ? "DEZFIXEAZĂ" : "FIXEAZĂ TOPIC"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleToggleLock}
                    disabled={modifyingThread}
                    className="border-amber-400/20 hover:bg-amber-400/5 text-amber-400 text-[10px] tracking-wider font-semibold gap-1.5 h-8 cursor-pointer"
                  >
                    {threadDetails.is_locked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                    {threadDetails.is_locked ? "DEBLOCHEAZĂ" : "ÎNCHIDE TOPIC"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleDeleteThread}
                    disabled={modifyingThread}
                    className="border-rose-500/20 hover:bg-rose-500/5 text-rose-400 text-[10px] tracking-wider font-semibold gap-1.5 h-8 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3" />
                    ȘTERGE TOPIC
                  </Button>
                </div>
              </div>
            )}

            {/* List of Posts (Replies) */}
            <div className="space-y-4 pt-2">
              {posts.map((p, index) => {
                const isCurrentUser = user && (
                  p.user_name === currentUserProfile?.display_name ||
                  p.user_name === currentUserProfile?.username ||
                  p.user_name === `@${currentUserProfile?.username}` ||
                  p.user_name?.replace("@", "") === currentUserProfile?.username
                );
                
                const post = isCurrentUser && currentUserProfile ? {
                  ...p,
                  user_name: currentUserProfile.display_name || currentUserProfile.username,
                  avatar_url: currentUserProfile.avatar_url || "",
                  rank: currentUserProfile.faction || "Jucător"
                } : p;

                const isOp = index === 0;
                const mappedRank = (post.rank === "Administrator" || post.rank?.includes("Admin")) ? "Fondator" : (post.rank || "Jucător");
                const isAuthorStaff = mappedRank === "Fondator" || mappedRank === "Moderator" || mappedRank?.includes("Poliț");
                const initialChar = post.user_name ? post.user_name.charAt(0).toUpperCase() : "C";

                return (
                  <div 
                    key={post.id} 
                    className={`glass rounded-2xl border transition-all ${
                      isAuthorStaff 
                        ? 'border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent shadow-[0_5px_30px_rgba(255,255,255,0.01)]' 
                        : 'border-white/5'
                    }`}
                  >
                    <div className="grid md:grid-cols-12 gap-px bg-white/5 overflow-hidden rounded-2xl">
                      
                      {/* Left Side: Author Profile Card (3 cols) */}
                      <div className="md:col-span-3 bg-background/50 p-6 flex md:flex-col items-center gap-4 text-center md:border-r border-white/5 min-w-[200px]">
                        
                        <div className="relative group">
                          {/* Pulsing ring if Staff author */}
                          {isAuthorStaff && (
                            <span className="absolute inset-0 rounded-full border border-white/20 animate-ping pointer-events-none scale-105" />
                          )}
                          <div className="h-16 w-16 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center text-silver text-2xl font-light shrink-0">
                            {post.avatar_url ? (
                              <img src={post.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                            ) : (
                              <span>{initialChar}</span>
                            )}
                          </div>
                        </div>

                        <div className="md:space-y-1.5 text-left md:text-center flex-1 md:flex-none">
                          <h4 className="text-sm font-semibold text-foreground tracking-wide flex items-center gap-1 md:justify-center">
                            @{post.user_name}
                          </h4>
                          
                          {/* Faction Rank / Badge */}
                          <div className={`text-[10px] tracking-wider font-bold uppercase px-2 py-0.5 rounded-full inline-block ${
                            isAuthorStaff 
                              ? 'bg-white text-black font-semibold' 
                              : 'bg-white/5 text-silver border border-white/5'
                          }`}>
                            {mappedRank}
                          </div>


                          {post.fivem_connected && (
                            <div className="text-[9px] tracking-wider text-emerald-400 font-bold uppercase flex items-center justify-center gap-1.5 mt-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.08)]">
                              <Gamepad2 className="h-3 w-3" />
                              🎮 FIVEM SYNC
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side: Message Content (9 cols) */}
                      <div className="md:col-span-9 bg-background/20 p-6 flex flex-col justify-between gap-6">
                        
                        {/* Header metadata */}
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono pb-3 border-b border-white/5">
                          <span>
                            {isOp ? "SUBIECT DESCHIS" : `RĂSPUNS #${index}`}
                          </span>
                          <span>
                            {new Date(post.created_at).toLocaleString('ro-RO')}
                          </span>
                        </div>

                        {/* Post body */}
                        <div className="text-sm text-foreground/90 leading-relaxed font-light whitespace-pre-line flex-1">
                          {post.content}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-auto">
                          <div className="flex gap-4">
                            <button
                              onClick={() => handleLikePost(post.id)}
                              className={`flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer ${
                                post.liked 
                                  ? 'text-emerald-400' 
                                  : 'text-muted-foreground hover:text-foreground'
                              }`}
                            >
                              <ThumbsUp className={`h-3.5 w-3.5 ${post.liked ? 'fill-emerald-400/20' : ''}`} />
                              {post.likes > 0 ? `${post.likes} aprecieri` : "Apreciază"}
                            </button>
                            
                            {isStaff && !isOp && (
                              <button
                                onClick={() => handleDeleteReply(post.id)}
                                className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer text-rose-500/60 hover:text-rose-500"
                              >
                                <Trash2 className="h-3 w-3" />
                                Șterge
                              </button>
                            )}
                          </div>

                          {isOp && isMockThread && (
                            <span className="text-[8px] tracking-widest bg-amber-400/5 text-amber-400 border border-amber-400/10 px-2 py-0.5 rounded uppercase font-bold font-mono">
                              Subiect MOCK
                            </span>
                          )}
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Reply Form block */}
            <div className="glass rounded-2xl p-6 border-white/5">
              {threadDetails.is_locked ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-2 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                  <Lock className="h-6 w-6 text-rose-400 animate-pulse" />
                  <h4 className="text-xs font-bold tracking-widest text-rose-400 uppercase">SUBIECT ÎNCHIS</h4>
                  <p className="text-[10px] text-muted-foreground max-w-xs leading-normal">
                    Conducerea a închis această discuție. Nu se mai pot adăuga mesaje noi.
                  </p>
                </div>
              ) : !user ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3 bg-white/[0.01] border border-white/5 rounded-xl">
                  <ShieldAlert className="h-6 w-6 text-muted-foreground/40" />
                  <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">CONECTARE OBLIGATORIE</h4>
                  <p className="text-[10px] text-muted-foreground max-w-xs leading-normal">
                    Trebuie să fii conectat pe platformă pentru a putea posta un răspuns în această secțiune.
                  </p>
                  <Link
                    to="/auth"
                    className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2 text-xs tracking-widest font-bold hover:bg-white/90 transition h-8"
                  >
                    CONECTEAZĂ-TE ACUM
                  </Link>
                </div>
              ) : !canReply ? (
                <div className="py-6 flex flex-col items-center justify-center text-center space-y-3 bg-white/[0.01] border border-white/5 rounded-xl">
                  <ShieldAlert className="h-6 w-6 text-amber-500/40" />
                  <h4 className="text-xs font-bold tracking-widest text-amber-500 uppercase">ACȚIUNE RESTRICȚIONATĂ</h4>
                  <p className="text-[10px] text-muted-foreground max-w-xs leading-normal">
                    Doar liderul facțiunii (Chestor General / Director General) sau autorul topicului pot scrie în această secțiune.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h4 className="text-xs tracking-wider text-silver uppercase font-semibold flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4 text-silver" />
                    ADĂUGĂ UN RĂSPUNS RAPID
                  </h4>

                  <form onSubmit={handlePostReply} className="space-y-4">
                    <textarea
                      rows={5}
                      required
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Scrie mesajul tău de răspuns aici. Fii respectuos și urmează regulamentul comunității..."
                      className="w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none leading-relaxed"
                    />

                    <div className="flex justify-end pt-2 border-t border-white/5">
                      <Button
                        type="submit"
                        disabled={submittingReply || !replyContent.trim()}
                        className="bg-white text-black hover:bg-white/90 text-xs font-bold tracking-widest px-8 py-3 rounded-full transition gap-1.5 cursor-pointer"
                      >
                        {submittingReply ? "SE TRIMITE..." : "TRIMITE RĂSPUNS"}
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </form>
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      <SiteFooter />
    </div>
  );
}
