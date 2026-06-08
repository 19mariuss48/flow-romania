import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { B as Button } from "./button-DY0TMOSU.mjs";
import { I as Input, L as Label } from "./label-BIUJpyM6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { v as ShieldAlert, s as Search, V as Users, y as SquarePen, B as Ban, Q as UserCheck, X, D as Database, b as Briefcase, j as Clock } from "../_libs/lucide-react.mjs";
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
function AdminPage() {
  const navigate = useNavigate();
  const {
    user,
    loading: authLoading
  } = useAuth();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  const [checkingAdmin, setCheckingAdmin] = reactExports.useState(true);
  const [profiles, setProfiles] = reactExports.useState([]);
  const [loadingProfiles, setLoadingProfiles] = reactExports.useState(false);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [editingProfile, setEditingProfile] = reactExports.useState(null);
  const [editFaction, setEditFaction] = reactExports.useState("");
  const [editBio, setEditBio] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const [currentUserFaction, setCurrentUserFaction] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate({
        to: "/auth"
      });
      return;
    }
    const checkAdmin = async () => {
      try {
        const {
          data,
          error
        } = await supabase.from("profiles").select("username, faction").eq("id", user.id).single();
        if (error) throw error;
        const rawFaction = data.faction || "Jucător";
        const isSuperAdmin = data.username === "19mariuss48" || rawFaction === "Administrator" || rawFaction?.includes("Admin") || rawFaction === "Fondator";
        const finalUserFaction = isSuperAdmin ? "Fondator" : rawFaction;
        setCurrentUserFaction(finalUserFaction);
        const isStaff = isSuperAdmin || finalUserFaction === "Chestor General" || finalUserFaction === "Director General" || finalUserFaction === "Moderator" || rawFaction?.includes("Poliți");
        if (isStaff) {
          setIsAdmin(true);
          fetchProfiles();
        } else {
          toast.error("Nu ai acces la această pagină!");
          navigate({
            to: "/"
          });
        }
      } catch (err) {
        toast.error("Eroare la verificarea accesului.");
        navigate({
          to: "/"
        });
      } finally {
        setCheckingAdmin(false);
      }
    };
    checkAdmin();
  }, [user, authLoading]);
  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const {
        data,
        error
      } = await supabase.from("profiles").select("id, username, display_name, avatar_url, faction, bio, created_at, reputation").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      const localEdits = JSON.parse(localStorage.getItem("flowro_mock_profiles") || "{}");
      const bannedList = JSON.parse(localStorage.getItem("flowro_banned_users") || "[]");
      const mergedProfiles = (data || []).map((p) => ({
        ...p,
        faction: localEdits[p.id]?.faction || p.faction,
        bio: localEdits[p.id]?.bio || p.bio,
        is_banned: bannedList.includes(p.id)
      }));
      setProfiles(mergedProfiles);
    } catch (err) {
      console.error("Fetch profiles error:", err);
      toast.error("Eroare la preluarea utilizatorilor: " + (err.message || "Eroare necunoscută"));
    } finally {
      setLoadingProfiles(false);
    }
  };
  const handleEditClick = (profile) => {
    const targetFaction = profile.faction || "Jucător";
    const isTargetAdmin = targetFaction === "Fondator" || targetFaction === "Administrator" || targetFaction?.includes("Admin");
    if (currentUserFaction !== "Fondator" && isTargetAdmin) {
      toast.error("Nu ai permisiunea de a edita un membru Staff superior.");
      return;
    }
    setEditingProfile(profile);
    setEditFaction(profile.faction || "Jucător");
    setEditBio(profile.bio || "");
  };
  const getAvailableRanks = () => {
    if (currentUserFaction === "Fondator") {
      return ["Jucător", "Polițist", "Tester Poliție", "Chestor General", "Medic", "Tester Medic", "Director General", "Moderator", "Administrator", "Fondator"];
    }
    if (currentUserFaction === "Chestor General") {
      return ["Jucător", "Polițist", "Tester Poliție"];
    }
    if (currentUserFaction === "Director General") {
      return ["Jucător", "Medic", "Tester Medic"];
    }
    return ["Jucător"];
  };
  const handleSaveProfile = async () => {
    if (!editingProfile) return;
    setSaving(true);
    try {
      const {
        error
      } = await supabase.rpc("admin_update_profile", {
        p_target_id: editingProfile.id,
        p_new_faction: editFaction,
        p_new_bio: editBio
      });
      if (error) {
        console.warn("RPC admin_update_profile failed, using local simulation:", error);
        const localEdits = JSON.parse(localStorage.getItem("flowro_mock_profiles") || "{}");
        localEdits[editingProfile.id] = {
          faction: editFaction,
          bio: editBio
        };
        localStorage.setItem("flowro_mock_profiles", JSON.stringify(localEdits));
        toast.success("Profilul a fost actualizat (Simulare Locală)!");
      } else {
        toast.success("Profilul a fost actualizat cu succes în baza de date!");
      }
      setEditingProfile(null);
      fetchProfiles();
    } catch (err) {
      const localEdits = JSON.parse(localStorage.getItem("flowro_mock_profiles") || "{}");
      localEdits[editingProfile.id] = {
        faction: editFaction,
        bio: editBio
      };
      localStorage.setItem("flowro_mock_profiles", JSON.stringify(localEdits));
      toast.success("Profilul a fost actualizat (Simulare Locală)!");
      setEditingProfile(null);
      fetchProfiles();
    } finally {
      setSaving(false);
    }
  };
  const handleToggleBan = async (profile) => {
    const targetFaction = profile.faction || "Jucător";
    const isTargetAdmin = targetFaction === "Fondator" || targetFaction === "Administrator" || targetFaction?.includes("Admin");
    if (currentUserFaction !== "Fondator" && isTargetAdmin) {
      toast.error("Nu ai permisiunea de a bana un membru Staff superior.");
      return;
    }
    if (profile.id === user?.id) {
      toast.error("Nu te poți bana pe tine însuți.");
      return;
    }
    const newBanStatus = !profile.is_banned;
    const confirmMsg = newBanStatus ? `Ești sigur că vrei să banezi pe ${profile.username}?` : `Ești sigur că vrei să debanezi pe ${profile.username}?`;
    if (!window.confirm(confirmMsg)) return;
    try {
      const {
        error
      } = await supabase.rpc("admin_ban_user", {
        p_target_id: profile.id,
        p_is_banned: newBanStatus
      });
      if (error) {
        throw error;
      }
      toast.success(`Jucătorul a fost ${newBanStatus ? "banat" : "debanat"} cu succes din baza de date!`);
    } catch (err) {
      console.warn("RPC ban failed, using local fallback", err);
      let bannedList = JSON.parse(localStorage.getItem("flowro_banned_users") || "[]");
      if (newBanStatus) {
        if (!bannedList.includes(profile.id)) bannedList.push(profile.id);
      } else {
        bannedList = bannedList.filter((id) => id !== profile.id);
      }
      localStorage.setItem("flowro_banned_users", JSON.stringify(bannedList));
      toast.success(`Jucătorul a fost ${newBanStatus ? "banat" : "debanat"} (Simulare Locală)!`);
    } finally {
      fetchProfiles();
    }
  };
  const filteredProfiles = profiles.filter((p) => p.username && p.username.toLowerCase().includes(searchQuery.toLowerCase()) || p.display_name && p.display_name.toLowerCase().includes(searchQuery.toLowerCase()));
  if (authLoading || checkingAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 h-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-t-2 border-white animate-spin" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.3em] text-silver animate-pulse", children: "VERIFICARE ACCES..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] });
  }
  if (!isAdmin) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 mb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] text-amber-400 uppercase", children: "ZONĂ RESTRICȚIONATĂ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-4xl font-light tracking-[0.1em] text-silver-gradient flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "h-8 w-8 text-amber-400" }),
          "PANOU ADMINISTRARE"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 max-w-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Caută utilizatori după nume...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-9 bg-white/[0.02] border-white/10 focus:border-amber-400/40 text-sm h-9" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground tracking-widest font-mono ml-4", children: [
              "TOTAL: ",
              filteredProfiles.length
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-xl border border-white/5 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/5 text-[10px] uppercase tracking-wider text-silver", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Jucător" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Grad / Faction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold", children: "Reputație" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4 font-semibold text-right", children: "Acțiuni" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-white/5", children: loadingProfiles ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-xs animate-pulse", children: "Se încarcă jucătorii..." }) }) : filteredProfiles.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-6 py-8 text-center text-xs", children: "Niciun utilizator găsit." }) }) : filteredProfiles.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-white/[0.02] transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0", children: p.avatar_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.avatar_url, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-silver/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-foreground flex items-center gap-2", children: [
                    p.display_name || p.username,
                    p.is_banned && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-red-500/20 text-red-500 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider", children: "BANAT" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                    "@",
                    p.username
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${p.faction === "Fondator" || p.faction === "Administrator" || p.faction?.includes("Admin") ? "bg-amber-400/10 text-amber-400 border border-amber-400/20" : "bg-white/5 text-silver border border-white/5"}`, children: p.faction === "Administrator" || p.faction?.includes("Admin") ? "Fondator" : p.faction || "Jucător" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 font-mono text-[10px]", children: [
                p.reputation || 0,
                " REP"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleEditClick(p), className: "h-7 text-[10px] border-white/10 hover:bg-amber-400/10 hover:text-amber-400 hover:border-amber-400/20 gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-3 w-3" }),
                  "Editează"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => handleToggleBan(p), className: `h-7 text-[10px] border-white/10 gap-1.5 ${p.is_banned ? "hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20" : "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Ban, { className: "h-3 w-3" }),
                  p.is_banned ? "Debanează" : "Ban"
                ] })
              ] }) })
            ] }, p.id)) })
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-4", children: editingProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 border-amber-400/20 relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-4 opacity-10 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-24 w-24 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 border-b border-white/5 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-bold tracking-wider text-amber-400 uppercase", children: "Modificare Jucător" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setEditingProfile(null), className: "text-muted-foreground hover:text-white transition", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 relative z-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-full bg-white/10 overflow-hidden", children: editingProfile.avatar_url && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: editingProfile.avatar_url, className: "h-full w-full object-cover" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-foreground", children: editingProfile.display_name || editingProfile.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                  "@",
                  editingProfile.username
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] tracking-wider text-silver uppercase", children: "Grad / Faction" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: editFaction, onChange: (e) => setEditFaction(e.target.value), className: "w-full bg-black/40 border border-white/10 focus:border-amber-400/40 text-sm h-9 px-3 rounded-md text-foreground outline-none", children: getAvailableRanks().map((rank) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: rank, className: "bg-[#0B0B0B] text-foreground", children: rank }, rank)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[10px] tracking-wider text-silver uppercase", children: "Descriere / Bio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editBio, onChange: (e) => setEditBio(e.target.value), placeholder: "Descrierea jucătorului...", className: "w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-400/40 focus:outline-none" })
            ] }),
            editingProfile.fivem_connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-[10px] tracking-widest text-amber-400/80 uppercase font-semibold flex items-center gap-1.5 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-3 w-3" }),
                "Date FiveM Sincronizate"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5", children: "Identitate" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-silver", children: editingProfile.fivem_username || "-" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5", children: "Job / Ocupație" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-silver flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-3 w-3 text-muted-foreground" }),
                    " ",
                    editingProfile.fivem_job || "-"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5", children: "Finanțe (Cash + Bancă)" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-emerald-400 font-mono", children: [
                    "$",
                    ((editingProfile.fivem_cash || 0) + (editingProfile.fivem_bank || 0)).toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5", children: "Timp Jucat" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-silver flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }),
                    " ",
                    Math.floor((editingProfile.fivem_playtime || 0) / 60),
                    " Ore"
                  ] })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSaveProfile, disabled: saving, className: "w-full bg-amber-400 hover:bg-amber-500 text-black font-bold tracking-widest text-xs h-10 mt-2", children: saving ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 border-white/5 text-center flex flex-col items-center justify-center h-full min-h-[300px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-12 w-12 text-muted-foreground/30 mb-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-silver mb-2", children: "Niciun jucător selectat" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-[200px] leading-relaxed", children: 'Selectează "Editează" din tabel pentru a modifica gradul sau descrierea unui jucător.' })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  AdminPage as component
};
