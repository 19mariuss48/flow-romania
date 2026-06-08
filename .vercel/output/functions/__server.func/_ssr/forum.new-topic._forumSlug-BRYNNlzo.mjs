import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as Route, u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { B as Button } from "./button-DY0TMOSU.mjs";
import { L as Label, I as Input } from "./label-BIUJpyM6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as ChevronRight, F as FileText, v as ShieldAlert, t as Send } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
function NewTopicPage() {
  const {
    forumSlug
  } = Route.useParams();
  const navigate = useNavigate();
  const {
    user,
    loading: authLoading
  } = useAuth();
  const [forumDetails, setForumDetails] = reactExports.useState(null);
  const [forumLoading, setForumLoading] = reactExports.useState(true);
  const [profile, setProfile] = reactExports.useState(null);
  const [title, setTitle] = reactExports.useState("");
  const [content, setContent] = reactExports.useState("");
  const [publishing, setPublishing] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Trebuie să te conectezi pentru a deschide un subiect nou!");
      navigate({
        to: "/auth"
      });
    }
  }, [user, authLoading, navigate]);
  reactExports.useEffect(() => {
    if (user) {
      supabase.from("profiles").select("username, display_name, avatar_url, reputation, faction").eq("id", user.id).single().then(({
        data
      }) => {
        if (data) setProfile(data);
      });
    }
  }, [user]);
  reactExports.useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        setForumLoading(true);
        const {
          data,
          error
        } = await supabase.from("forums").select("id, title, slug").eq("slug", forumSlug).single();
        if (error) throw error;
        setForumDetails(data);
      } catch (err) {
        console.warn("Failed to load forum details for new topic. Using slug fallback:", err);
        const fallbackTitle = forumSlug.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
  const handleSubmitTopic = async (e) => {
    e.preventDefault();
    if (!user || !forumDetails) return;
    if (title.trim().length < 5) {
      return toast.error("Titlul trebuie să conțină cel puțin 5 caractere.");
    }
    if (content.trim().length < 15) {
      return toast.error("Conținutul trebuie să conțină cel puțin 15 caractere.");
    }
    setPublishing(true);
    try {
      const {
        data: threadData,
        error: threadError
      } = await supabase.from("forum_threads").insert({
        forum_id: forumDetails.id,
        user_id: user.id,
        title: title.trim(),
        content: content.trim()
        // Duplicate content on thread directly as backup summary
      }).select().single();
      if (threadError) throw threadError;
      const {
        error: postError
      } = await supabase.from("forum_posts").insert({
        thread_id: threadData.id,
        user_id: user.id,
        content: content.trim()
      });
      if (postError) throw postError;
      if (profile) {
        const currentReputation = profile.reputation || 0;
        await supabase.from("profiles").update({
          reputation: currentReputation + 10
        }).eq("id", user.id);
      }
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());
      toast.success("Subiectul tău a fost publicat cu succes!");
      navigate({
        to: "/forum/thread/$threadId",
        params: {
          threadId: threadData.id
        }
      });
    } catch (err) {
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
        created_at: (/* @__PURE__ */ new Date()).toISOString()
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
      localStorage.setItem("flowro_last_action_timestamp", Date.now().toString());
      toast.success("Subiectul tău a fost publicat cu succes (Simulare locală)!");
      navigate({
        to: "/forum/thread/$threadId",
        params: {
          threadId: generatedId
        }
      });
    } finally {
      setPublishing(false);
    }
  };
  if (authLoading || forumLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-10 h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-t border-white animate-spin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground tracking-widest animate-pulse", children: "SE ÎNCARCĂ DATELE..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] });
  }
  if (!user) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-4xl w-full mx-auto px-6 pt-32 pb-24 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-8 font-medium", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "ACASĂ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors", children: "FORUM" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forum/$forumSlug", params: {
          forumSlug
        }, className: "hover:text-foreground transition-colors uppercase", children: forumDetails?.title || forumSlug }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold", children: "SUBIECT NOU" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 md:p-8 border-white/10 relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6 pb-4 border-b border-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-silver", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-light tracking-wide text-silver-gradient", children: "DESCHIDE SUBIECT NOU" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5 uppercase tracking-wider leading-relaxed", children: [
              "Publici în secțiunea: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-silver font-semibold", children: forumDetails?.title || forumSlug })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmitTopic, className: "space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "top-title", className: "text-xs text-silver tracking-wider uppercase", children: "Titlu Subiect (Sugestiv & Scurt)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "top-title", type: "text", required: true, minLength: 5, value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Introdu un titlu clar care rezumă subiectul", className: "bg-white/5 border-white/10 text-foreground text-sm focus:border-white/40 h-10" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "top-content", className: "text-xs text-silver tracking-wider uppercase", children: "Descrierea / Mesajul Subiectului" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "top-content", rows: 10, required: true, minLength: 15, value: content, onChange: (e) => setContent(e.target.value), placeholder: "Redactează mesajul tău de deschidere. Oferă cât mai multe detalii relevante, imagini sau scenarii de roleplay...", className: "w-full rounded-md border border-white/10 bg-white/5 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none leading-relaxed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.01] border border-white/5 rounded-xl p-4 text-[10px] text-muted-foreground leading-normal flex items-start gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-4.5 w-4.5 shrink-0 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "⚠️ ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Atenție!" }),
              " Prin publicarea acestui subiect de discuție, ești de acord cu regulamentul general al comunității FLOW ROMÂNIA. Te rugăm să păstrezi un limbaj civilizat, adecvat și OOC-constructiv. Subiectele care conțin injurii, link-uri neautorizate sau instigare vor fi închise și șterse de administratori, iar contul tău poate fi sancționat."
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-white/5 flex gap-3 justify-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => navigate({
              to: "/forum/$forumSlug",
              params: {
                forumSlug
              }
            }), className: "border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider px-6 h-10 rounded-full", children: "ANULEAZĂ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: publishing || !title.trim() || !content.trim(), className: "bg-white text-black hover:bg-white/90 text-xs font-bold tracking-widest px-8 h-10 rounded-full gap-1.5 cursor-pointer", children: [
              publishing ? "SE PUBLICĂ..." : "PUBLICĂ SUBIECTUL",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-3.5 w-3.5" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  NewTopicPage as component
};
