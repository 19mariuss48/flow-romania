import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as Route$1, u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { B as Button } from "./button-DY0TMOSU.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as ChevronRight, v as ShieldAlert, P as Pin, L as Lock, A as ArrowLeft, p as LockOpen, z as Trash2, G as Gamepad2, T as ThumbsUp, r as MessageSquare, t as Send } from "../_libs/lucide-react.mjs";
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
import "./utils-zpgQuvnJ.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "../_libs/class-variance-authority.mjs";
const mockDiscussions = {
  "mock-t1": {
    thread: {
      id: "mock-t1",
      title: "Actualizare Server v0.9.5 - Note de Patch (Lansare Moduri Noi)",
      is_pinned: true,
      is_locked: false,
      forum_slug: "anunturi",
      forum_name: "Anunțuri Oficiale"
    },
    posts: [{
      id: "p1",
      user_name: "alexandru.r",
      avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      rank: "Fondator",
      reputation: 2840,
      content: "Salutare tuturor! Suntem încântați să vă prezentăm notele de patch pentru versiunea v0.9.5 a serverului de joc.\n\nÎn acest update, am implementat:\n1. O nouă gamă de mașini de patrulare pentru Poliție și SMURD.\n2. Optimizări majore ale bazei de date (latența a scăzut la 28ms).\n3. Noul sistem avansat de inventar cu drag-and-drop și sloturi rapide.\n\nVă așteptăm la joc! Lăsați feedback-ul vostru mai jos.",
      created_at: "2026-05-28T10:00:00.000Z",
      likes: 42,
      liked: true
    }, {
      id: "p2",
      user_name: "cristian.b",
      avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      rank: "Moderator",
      reputation: 1741,
      content: "Superb update! Noul inventar arată demențial și sloturile rapide ajută foarte mult în scenariile tensionate de roleplay. Felicitări developerilor!",
      created_at: "2026-05-28T11:20:00.000Z",
      likes: 12
    }, {
      id: "p3",
      user_name: "andreea.v",
      avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
      rank: "Veteran",
      reputation: 1503,
      content: "Latența scăzută se simte perfect în zonele aglomerate din Los Santos. Jobul de mecanic funcționează acum mult mai fluid! Keep up the good work!",
      created_at: "2026-05-28T12:05:00.000Z",
      likes: 8
    }]
  },
  "mock-t4": {
    thread: {
      id: "mock-t4",
      title: "Regulament Oficial Jucători FiveM FLOW ROMÂNIA (Obligatoriu Citit)",
      is_pinned: true,
      is_locked: true,
      forum_slug: "regulamente",
      forum_name: "Regulamente"
    },
    posts: [{
      id: "p4",
      user_name: "mirela.s",
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
      rank: "Administrator",
      reputation: 1920,
      content: "Regulamentul oficial al comunității de roleplay FLOW ROMÂNIA.\n\nFiecare jucător este rugat să citească și să asimileze regulile de mai jos:\n1. **Meta-gaming (MG):** Este interzisă utilizarea informațiilor OOC în scopuri IC.\n2. **Power-gaming (PG):** Este interzis roleplay-ul nerealist în care nu dai șanse egale celeilalte persoane.\n3. **Deathmatch (DM):** Uciderea sau rănirea altui jucător fără un motiv solid IC (RP bun) este strict interzisă.\n\nNerespectarea acestor reguli va atrage sancțiuni administrative.",
      created_at: "2026-05-20T12:00:00.000Z",
      likes: 104,
      liked: false
    }]
  },
  "mock-t9": {
    thread: {
      id: "mock-t9",
      title: "Recrutări Academia de Poliție deschise (Sesiunea Q2)",
      is_pinned: true,
      is_locked: false,
      forum_slug: "politia-romana",
      forum_name: "Poliția Română"
    },
    posts: [{
      id: "p5",
      user_name: "andrei.p",
      avatar_url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80",
      rank: "Inspector Poliție",
      reputation: 840,
      content: "Inspectoratul de Poliție FLOW anunță deschiderea oficială a sesiunii de recrutare Q2!\n\nCăutăm cetățeni responsabili, disciplinați și dornici de carieră militară.\nCerințe:\n- Vârstă minimă IRL: 16 ani.\n- Minim 20 de ore de joc pe server.\n- Cunoașterea perfectă a codului penal și a regulamentului de poliție.\n\nDepuneți CV-ul (Aplicația) direct prin Panoul de Control al Profilului de pe acest site!",
      created_at: "2026-05-28T08:00:00.000Z",
      likes: 35
    }]
  }
};
const genericThreadFallback = {
  thread: {
    id: "mock-generic",
    title: "Subiect Forum",
    is_pinned: false,
    is_locked: false,
    forum_slug: "discutii-generale",
    forum_name: "Discuții Generale"
  },
  posts: [{
    id: "p-g1",
    user_name: "alexandru.r",
    avatar_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    rank: "Fondator",
    reputation: 2840,
    content: "Bine ai venit pe noul forum oficial FLOW ROMÂNIA! Acesta este un subiect demonstrativ deschis pentru a arăta funcționalitatea live a noului sistem de forum.",
    created_at: "2026-05-30T10:00:00.000Z",
    likes: 5
  }]
};
function ThreadDetailPage() {
  const {
    threadId
  } = Route$1.useParams();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [threadDetails, setThreadDetails] = reactExports.useState(null);
  const [posts, setPosts] = reactExports.useState([]);
  const [currentUserProfile, setCurrentUserProfile] = reactExports.useState(null);
  const [replyContent, setReplyContent] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(true);
  const [submittingReply, setSubmittingReply] = reactExports.useState(false);
  const [modifyingThread, setModifyingThread] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (user) {
      supabase.from("profiles").select("username, display_name, avatar_url, reputation, faction").eq("id", user.id).single().then(({
        data
      }) => {
        if (data) setCurrentUserProfile(data);
      });
    }
  }, [user]);
  const loadThreadData = async () => {
    setLoading(true);
    if (user && !currentUserProfile) {
      try {
        const {
          data
        } = await supabase.from("profiles").select("username, display_name, avatar_url, reputation, faction").eq("id", user.id).single();
        if (data) {
          setCurrentUserProfile(data);
        }
      } catch (e) {
        console.warn("Could not load user profile inside thread load:", e);
      }
    }
    if (threadId.startsWith("local-t-")) {
      try {
        const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
        const th = localThreads.find((t) => t.id === threadId);
        if (th) {
          const getForumName = (slug) => {
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
            forum_name: getForumName(th.forum_slug),
            forum_slug: th.forum_slug
          });
          const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]").filter((p) => p.thread_id === threadId);
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
      const {
        data: th,
        error: thError
      } = await supabase.from("forum_threads").select("id, title, is_pinned, is_locked, forum_id, user_id").eq("id", threadId).single();
      if (thError) throw thError;
      const {
        data: fm
      } = await supabase.from("forums").select("title, slug").eq("id", th.forum_id).single();
      const threadMeta = {
        ...th,
        forum_name: fm?.title || "Forum",
        forum_slug: fm?.slug || "general"
      };
      setThreadDetails(threadMeta);
      supabase.rpc("increment_thread_views", {
        thread_id: threadId
      }).then();
      const {
        data: pts,
        error: ptsError
      } = await supabase.from("forum_posts").select("id, content, created_at, user_id").eq("thread_id", th.id).order("created_at", {
        ascending: true
      });
      if (ptsError) throw ptsError;
      if (pts && pts.length > 0) {
        const userIds = pts.map((p) => p.user_id);
        const {
          data: prfs
        } = await supabase.from("profiles").select("id, username, display_name, avatar_url, reputation, faction, fivem_connected, fivem_username, fivem_playtime, fivem_job").in("id", userIds);
        const joinedPosts = pts.map((p) => {
          const prf = prfs?.find((u) => u.id === p.user_id);
          return {
            id: p.id,
            content: p.content,
            created_at: p.created_at,
            user_name: prf?.display_name || prf?.username || "Jucător",
            avatar_url: prf?.avatar_url || "",
            rank: prf?.faction || (prf?.reputation && prf.reputation >= 1e3 ? "Veteran" : "Jucător"),
            reputation: prf?.reputation || 0,
            fivem_connected: prf?.fivem_connected || false,
            fivem_username: prf?.fivem_username || "",
            fivem_playtime: prf?.fivem_playtime || 0,
            fivem_job: prf?.fivem_job || "",
            likes: Math.floor(Math.random() * 5),
            // Simplified local mock likes representation
            liked: false
          };
        });
        setPosts(joinedPosts);
      }
    } catch (err) {
      console.warn("Failed to load live thread data. Loading fallback mock discussion:", err);
      const fallback = mockDiscussions[threadId] || genericThreadFallback;
      setThreadDetails(fallback.thread);
      const localReplies = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]").filter((p) => p.thread_id === threadId);
      setPosts([...fallback.posts, ...localReplies]);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    loadThreadData();
  }, [threadId]);
  const handlePostReply = async (e) => {
    e.preventDefault();
    if (!user || !replyContent.trim()) return;
    setSubmittingReply(true);
    if (String(threadDetails?.id).startsWith("local-t-")) {
      try {
        const userDisplayName = currentUserProfile?.display_name || currentUserProfile?.username || user.email?.split("@")[0] || "Jucător";
        const newMockReply = {
          id: `local-p-${Date.now()}`,
          thread_id: threadDetails.id,
          user_name: userDisplayName,
          avatar_url: currentUserProfile?.avatar_url || "",
          rank: currentUserProfile?.faction || "Jucător",
          reputation: currentUserProfile?.reputation || 0,
          content: replyContent,
          created_at: (/* @__PURE__ */ new Date()).toISOString(),
          likes: 0,
          liked: false
        };
        const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
        localPosts.push(newMockReply);
        localStorage.setItem("flowro_local_posts", JSON.stringify(localPosts));
        const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
        const idx = localThreads.findIndex((t) => t.id === threadDetails.id);
        if (idx !== -1) {
          localThreads[idx].replies_count = (localThreads[idx].replies_count || 0) + 1;
          localStorage.setItem("flowro_local_threads", JSON.stringify(localThreads));
        }
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
      const {
        error
      } = await supabase.from("forum_posts").insert({
        thread_id: threadDetails.id,
        user_id: user.id,
        content: replyContent
      });
      if (error) throw error;
      if (currentUserProfile) {
        const currentReputation = currentUserProfile.reputation || 0;
        await supabase.from("profiles").update({
          reputation: currentReputation + 5
        }).eq("id", user.id);
      }
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());
      toast.success("Răspunsul tău a fost adăugat!");
      setReplyContent("");
      loadThreadData();
    } catch (err) {
      const userDisplayName = currentUserProfile?.display_name || currentUserProfile?.username || user.email?.split("@")[0] || "Jucător";
      const newMockReply = {
        id: `local-p-${Date.now()}`,
        thread_id: threadDetails.id,
        user_name: userDisplayName,
        avatar_url: currentUserProfile?.avatar_url || "",
        rank: currentUserProfile?.faction || "Jucător",
        reputation: currentUserProfile?.reputation || 0,
        content: replyContent,
        created_at: (/* @__PURE__ */ new Date()).toISOString(),
        likes: 0,
        liked: false
      };
      const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
      localPosts.push(newMockReply);
      localStorage.setItem("flowro_local_posts", JSON.stringify(localPosts));
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());
      toast.success("Răspunsul tău a fost adăugat (Simulare locală)!");
      setReplyContent("");
      loadThreadData();
    } finally {
      setSubmittingReply(false);
    }
  };
  const handleLikePost = (postId) => {
    setPosts(posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
    toast.success("Ai apreciat postarea!");
  };
  const handleTogglePin = async () => {
    if (!threadDetails) return;
    setModifyingThread(true);
    try {
      const nextPinState = !threadDetails.is_pinned;
      const {
        error
      } = await supabase.from("forum_threads").update({
        is_pinned: nextPinState
      }).eq("id", threadDetails.id);
      if (error) throw error;
      setThreadDetails({
        ...threadDetails,
        is_pinned: nextPinState
      });
      toast.success(nextPinState ? "Subiectul a fost FIXAT pe prima pagină!" : "Subiectul a fost DEZFIXAT!");
    } catch (err) {
      const nextPinState = !threadDetails.is_pinned;
      setThreadDetails({
        ...threadDetails,
        is_pinned: nextPinState
      });
      toast.success(nextPinState ? "Subiectul a fost FIXAT (Simulare locală)!" : "Subiectul a fost DEZFIXAT!");
    } finally {
      setModifyingThread(false);
    }
  };
  const handleToggleLock = async () => {
    if (!threadDetails) return;
    setModifyingThread(true);
    try {
      const nextLockState = !threadDetails.is_locked;
      const {
        error
      } = await supabase.from("forum_threads").update({
        is_locked: nextLockState
      }).eq("id", threadDetails.id);
      if (error) throw error;
      setThreadDetails({
        ...threadDetails,
        is_locked: nextLockState
      });
      toast.success(nextLockState ? "Subiectul a fost ÎNCHIS (Blocat de la comentarii)!" : "Subiectul a fost DEBLOCAT!");
    } catch (err) {
      const nextLockState = !threadDetails.is_locked;
      setThreadDetails({
        ...threadDetails,
        is_locked: nextLockState
      });
      toast.success(nextLockState ? "Subiectul a fost ÎNCHIS (Simulare locală)!" : "Subiectul a fost DEBLOCAT!");
    } finally {
      setModifyingThread(false);
    }
  };
  const handleDeleteThread = async () => {
    if (!window.confirm("Ești sigur că vrei să ștergi definitiv acest subiect de pe forum? Această acțiune este ireversibilă.")) return;
    setModifyingThread(true);
    try {
      const {
        error
      } = await supabase.from("forum_threads").delete().eq("id", threadDetails.id);
      if (error) throw error;
      toast.success("Subiectul a fost șters cu succes!");
      navigate({
        to: `/forum/${threadDetails.forum_slug}`
      });
    } catch (err) {
      toast.success("Subiectul a fost șters de pe forum (Simulare locală)!");
      navigate({
        to: `/forum/${threadDetails.forum_slug}`
      });
    } finally {
      setModifyingThread(false);
    }
  };
  const handleDeleteReply = async (postId) => {
    if (!window.confirm("Ești sigur că vrei să ștergi acest răspuns? Acțiunea este ireversibilă.")) return;
    try {
      if (String(postId).startsWith("local-p-")) {
        const localPosts = JSON.parse(localStorage.getItem("flowro_local_posts") || "[]");
        const newLocalPosts = localPosts.filter((p) => p.id !== postId);
        localStorage.setItem("flowro_local_posts", JSON.stringify(newLocalPosts));
        const localThreads = JSON.parse(localStorage.getItem("flowro_local_threads") || "[]");
        const idx = localThreads.findIndex((t) => t.id === threadDetails?.id);
        if (idx !== -1 && localThreads[idx].replies_count > 0) {
          localThreads[idx].replies_count -= 1;
          localStorage.setItem("flowro_local_threads", JSON.stringify(localThreads));
        }
        toast.success("Răspunsul a fost șters!");
        loadThreadData();
        return;
      }
      const {
        error
      } = await supabase.from("forum_posts").delete().eq("id", postId);
      if (error) throw error;
      toast.success("Răspunsul a fost șters din baza de date!");
      loadThreadData();
    } catch (err) {
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
    if (userRank === "Chestor General") isStaff = true;
    canReply = isAuthor || userRank === "Chestor General" || isSuperAdmin;
  } else if (initialForumSlug.includes("medic") || initialForumSlug.includes("smurd") || initialForumSlug === "spitalul-general" || initialForumSlug === "aplicatii-smurd" || initialForumSlug === "regulament-smurd") {
    if (userRank === "Director General") isStaff = true;
    canReply = isAuthor || userRank === "Director General" || isSuperAdmin;
  }
  const isMockThread = String(threadId).startsWith("mock-");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10", children: [
      threadDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "ACASĂ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "FORUM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forum/$forumSlug", params: {
          forumSlug: initialForumSlug
        }, className: "hover:text-foreground transition-colors uppercase", children: threadDetails.forum_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold truncate max-w-[200px] md:max-w-md", children: threadDetails.title })
      ] }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-96 flex flex-col items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-12 h-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-t-2 border-white animate-spin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground tracking-[0.2em] animate-pulse", children: "SE ÎNCARCĂ DISCUȚIA..." })
      ] }) : !threadDetails ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-16 border-white/5 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-10 w-10 text-rose-500 mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground mb-1", children: "Subiectul nu a fost găsit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-6", children: "Acest subiect nu există în sistem sau a fost șters de un administrator." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
          to: "/"
        }), className: "bg-white text-black font-semibold px-6 rounded-full", children: "Înapoi la Forum" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
              threadDetails.is_pinned && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest bg-amber-400/10 border border-amber-400/20 text-amber-400 px-2 py-0.5 rounded uppercase", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-2.5 w-2.5 shrink-0 fill-amber-400" }),
                "Fixat"
              ] }),
              threadDetails.is_locked && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[9px] font-bold tracking-widest bg-rose-400/10 border border-rose-400/20 text-rose-400 px-2 py-0.5 rounded uppercase", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-2.5 w-2.5 shrink-0" }),
                "Închis"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl md:text-2xl font-medium tracking-wide text-foreground leading-tight", children: threadDetails.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: [
              "Categorie: ",
              threadDetails.forum_name
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/forum/$forumSlug", params: {
            forumSlug: initialForumSlug
          }, className: "inline-flex items-center justify-center rounded-full border border-white/10 px-5 py-2 text-xs text-silver hover:bg-white/5 hover:text-foreground transition-colors gap-1.5 font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
            "ÎNAPOI LA LISTĂ"
          ] }) })
        ] }),
        isStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-400/[0.02] border border-amber-400/15 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-wider text-amber-400 uppercase", children: "PANOU MODERARE STAFF" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: "Drepturi speciale active pentru administrarea acestui subiect." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: handleTogglePin, disabled: modifyingThread, className: "border-amber-400/20 hover:bg-amber-400/5 text-amber-400 text-[10px] tracking-wider font-semibold gap-1.5 h-8 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-3 w-3" }),
              threadDetails.is_pinned ? "DEZFIXEAZĂ" : "FIXEAZĂ TOPIC"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: handleToggleLock, disabled: modifyingThread, className: "border-amber-400/20 hover:bg-amber-400/5 text-amber-400 text-[10px] tracking-wider font-semibold gap-1.5 h-8 cursor-pointer", children: [
              threadDetails.is_locked ? /* @__PURE__ */ jsxRuntimeExports.jsx(LockOpen, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3 w-3" }),
              threadDetails.is_locked ? "DEBLOCHEAZĂ" : "ÎNCHIDE TOPIC"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: handleDeleteThread, disabled: modifyingThread, className: "border-rose-500/20 hover:bg-rose-500/5 text-rose-400 text-[10px] tracking-wider font-semibold gap-1.5 h-8 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
              "ȘTERGE TOPIC"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 pt-2", children: posts.map((p, index) => {
          const isCurrentUser = user && (p.user_name === currentUserProfile?.display_name || p.user_name === currentUserProfile?.username || p.user_name === `@${currentUserProfile?.username}` || p.user_name?.replace("@", "") === currentUserProfile?.username);
          const post = isCurrentUser && currentUserProfile ? {
            ...p,
            user_name: currentUserProfile.display_name || currentUserProfile.username,
            avatar_url: currentUserProfile.avatar_url || "",
            rank: currentUserProfile.faction || "Jucător",
            reputation: currentUserProfile.reputation || 0
          } : p;
          const isOp = index === 0;
          const mappedRank = post.rank === "Administrator" || post.rank?.includes("Admin") ? "Fondator" : post.rank || "Jucător";
          const isAuthorStaff = mappedRank === "Fondator" || mappedRank === "Moderator" || mappedRank?.includes("Poliț");
          const initialChar = post.user_name ? post.user_name.charAt(0).toUpperCase() : "C";
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `glass rounded-2xl border transition-all ${isAuthorStaff ? "border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent shadow-[0_5px_30px_rgba(255,255,255,0.01)]" : "border-white/5"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-px bg-white/5 overflow-hidden rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-3 bg-background/50 p-6 flex md:flex-col items-center gap-4 text-center md:border-r border-white/5 min-w-[200px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                isAuthorStaff && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full border border-white/20 animate-ping pointer-events-none scale-105" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center text-silver text-2xl font-light shrink-0", children: post.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: post.avatar_url, alt: "Avatar", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: initialChar }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:space-y-1.5 text-left md:text-center flex-1 md:flex-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-sm font-semibold text-foreground tracking-wide flex items-center gap-1 md:justify-center", children: [
                  "@",
                  post.user_name
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] tracking-wider font-bold uppercase px-2 py-0.5 rounded-full inline-block ${isAuthorStaff ? "bg-white text-black font-semibold" : "bg-white/5 text-silver border border-white/5"}`, children: mappedRank }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-widest text-muted-foreground uppercase pt-1 font-mono", children: [
                  "REPUTAȚIE: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-silver font-semibold", children: [
                    post.reputation,
                    " REP"
                  ] })
                ] }),
                post.fivem_connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] tracking-wider text-emerald-400 font-bold uppercase flex items-center justify-center gap-1.5 mt-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.08)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-3 w-3" }),
                  "🎮 FIVEM SYNC"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-9 bg-background/20 p-6 flex flex-col justify-between gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground font-mono pb-3 border-b border-white/5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isOp ? "SUBIECT DESCHIS" : `RĂSPUNS #${index}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(post.created_at).toLocaleString("ro-RO") })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/90 leading-relaxed font-light whitespace-pre-line flex-1", children: post.content }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-white/5 mt-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleLikePost(post.id), className: `flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer ${post.liked ? "text-emerald-400" : "text-muted-foreground hover:text-foreground"}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: `h-3.5 w-3.5 ${post.liked ? "fill-emerald-400/20" : ""}` }),
                    post.likes > 0 ? `${post.likes} aprecieri` : "Apreciază"
                  ] }),
                  isStaff && !isOp && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleDeleteReply(post.id), className: "flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase transition cursor-pointer text-rose-500/60 hover:text-rose-500", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }),
                    "Șterge"
                  ] })
                ] }),
                isOp && isMockThread && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] tracking-widest bg-amber-400/5 text-amber-400 border border-amber-400/10 px-2 py-0.5 rounded uppercase font-bold font-mono", children: "Subiect MOCK" })
              ] })
            ] })
          ] }) }, post.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-6 border-white/5", children: threadDetails.is_locked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex flex-col items-center justify-center text-center space-y-2 bg-rose-500/5 border border-rose-500/10 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-6 w-6 text-rose-400 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-widest text-rose-400 uppercase", children: "SUBIECT ÎNCHIS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground max-w-xs leading-normal", children: "Conducerea a închis această discuție. Nu se mai pot adăuga mesaje noi." })
        ] }) : !user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex flex-col items-center justify-center text-center space-y-3 bg-white/[0.01] border border-white/5 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-6 w-6 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-widest text-muted-foreground uppercase", children: "CONECTARE OBLIGATORIE" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground max-w-xs leading-normal", children: "Trebuie să fii conectat pe platformă pentru a putea posta un răspuns în această secțiune." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth", className: "inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2 text-xs tracking-widest font-bold hover:bg-white/90 transition h-8", children: "CONECTEAZĂ-TE ACUM" })
        ] }) : !canReply ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex flex-col items-center justify-center text-center space-y-3 bg-white/[0.01] border border-white/5 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-6 w-6 text-amber-500/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold tracking-widest text-amber-500 uppercase", children: "ACȚIUNE RESTRICȚIONATĂ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground max-w-xs leading-normal", children: "Doar liderul facțiunii (Chestor General / Director General) sau autorul topicului pot scrie în această secțiune." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs tracking-wider text-silver uppercase font-semibold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4 text-silver" }),
            "ADĂUGĂ UN RĂSPUNS RAPID"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePostReply, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, required: true, value: replyContent, onChange: (e) => setReplyContent(e.target.value), placeholder: "Scrie mesajul tău de răspuns aici. Fii respectuos și urmează regulamentul comunității...", className: "w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none leading-relaxed" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2 border-t border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: submittingReply || !replyContent.trim(), className: "bg-white text-black hover:bg-white/90 text-xs font-bold tracking-widest px-8 py-3 rounded-full transition gap-1.5 cursor-pointer", children: [
              submittingReply ? "SE TRIMITE..." : "TRIMITE RĂSPUNS",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" })
            ] }) })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ThreadDetailPage as component
};
