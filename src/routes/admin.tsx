import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getSiteContent, updateSiteContent } from "@/lib/api/content.server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfile } from "@/lib/api/profile.server";
import { getAllProfiles, adminUpdateProfile, getViewsStatistics } from "@/lib/api/admin.server";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { 
  ShieldAlert, 
  Users, 
  Search, 
  Save,
  UserCheck,
  X,
  Edit,
  Ban,
  Database,
  Clock,
  Briefcase,
  BarChart3
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panou Administrare · FLOW ROMANIA" },
      { name: "description", content: "Panou administrativ pentru gestionarea comunității FLOW." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  const [profiles, setProfiles] = useState<any[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [editingProfile, setEditingProfile] = useState<any>(null);
  const [editFaction, setEditFaction] = useState("");
  const [editBio, setEditBio] = useState("");
  const [saving, setSaving] = useState(false);
  const [currentUserFaction, setCurrentUserFaction] = useState("");
  const [viewsStats, setViewsStats] = useState<{pages: any[], threads: any[]} | null>(null);

  const [activeTab, setActiveTab] = useState("users");
  const [contentSelector, setContentSelector] = useState("regulament");
  const [siteContentJson, setSiteContentJson] = useState("");
  const [loadingContent, setLoadingContent] = useState(false);
  const [savingContent, setSavingContent] = useState(false);

  // Fetch site content when tab changes to 'content' or selector changes
  useEffect(() => {
    if (activeTab === "content" && isAdmin) {
      loadSiteContent();
    }
  }, [activeTab, contentSelector, isAdmin]);

  const loadSiteContent = async () => {
    setLoadingContent(true);
    try {
      const data = await getSiteContent({ data: { id: contentSelector } });
      if (data) {
        setSiteContentJson(JSON.stringify(data, null, 2));
      } else {
        setSiteContentJson("{\n  // Nu a fost găsit conținut. Apasă Salvare pentru a inițializa.\n}");
      }
    } catch (err) {
      toast.error("Eroare la încărcarea conținutului.");
    } finally {
      setLoadingContent(false);
    }
  };

  const handleSaveContent = async () => {
    if (currentUserFaction !== "Fondator") {
      toast.error("Doar Fondatorii pot modifica conținutul site-ului.");
      return;
    }
    setSavingContent(true);
    try {
      const parsed = JSON.parse(siteContentJson);
      await updateSiteContent({ data: { id: contentSelector, content: parsed } });
      toast.success("Conținutul a fost salvat cu succes!");
    } catch (err: any) {
      toast.error("JSON invalid sau eroare la salvare: " + err.message);
    } finally {
      setSavingContent(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate({ to: "/auth" });
      return;
    }

    // Check if user is admin
    const checkAdmin = async () => {
      try {
        const data = await getUserProfile({ data: { userId: user.id } });
        if (!data) throw new Error("Profile not found");

        const rawFaction = data.faction || "Jucător";
        setCurrentUserFaction(rawFaction);

        const isStaff = rawFaction === "Fondator" || rawFaction === "Moderator" || data.username === "19mariuss48";

        if (isStaff) {
          setIsAdmin(true);
          fetchProfiles();
        } else {
          toast.error("Nu ai acces la această pagină!");
          navigate({ to: "/" });
        }
      } catch (err) {
        toast.error("Eroare la verificarea accesului.");
        navigate({ to: "/" });
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdmin();
  }, [user, authLoading]);

    const fetchProfiles = async () => {
      setLoadingProfiles(true);
      try {
        const data = await getAllProfiles();
        setProfiles(data || []);
        
        const stats = await getViewsStatistics();
        setViewsStats(stats as any);
      } catch (err: any) {
        console.error("Fetch profiles error:", err);
        toast.error("Eroare la preluarea utilizatorilor: " + (err.message || "Eroare necunoscută"));
      } finally {
        setLoadingProfiles(false);
      }
    };

  const handleEditClick = (profile: any) => {
    // Basic protection: Non-Fondator cannot edit a Fondator or Administrator
    const targetFaction = profile.faction || "Jucător";
    const isTargetAdmin = targetFaction === "Fondator" ;
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
      return ["Jucător", "Polițist", "Tester Poliție", "Chestor General", "Medic", "Tester Medic", "Director General", "Moderator", "Fondator"];
    }
    if (currentUserFaction === "Chestor General") {
      return ["Jucător", "Polițist", "Tester Poliție", "Chestor General"];
    }
    if (currentUserFaction === "Director General") {
      return ["Jucător", "Medic", "Tester Medic", "Director General"];
    }
    if (currentUserFaction === "Moderator") {
      return ["Jucător", "Moderator"];
    }
    return ["Jucător"];
  };

  const handleSaveProfile = async () => {
    if (!editingProfile) return;
    setSaving(true);
    try {
      await adminUpdateProfile({
        data: {
          userId: editingProfile.id,
          updates: {
            faction: editFaction,
            bio: editBio
          }
        }
      });
      toast.success("Profilul a fost actualizat cu succes în baza de date!");

      setEditingProfile(null);
      fetchProfiles();
    } catch (err: any) {
      toast.error("Eroare la salvare: " + (err.message || "Eroare necunoscută"));
    } finally {
      setSaving(false);
    }
  };

  const handleToggleBan = async (profile: any) => {
    // Basic protection
    const targetFaction = profile.faction || "Jucător";
    const isTargetAdmin = targetFaction === "Fondator" ;
    if (currentUserFaction !== "Fondator" && isTargetAdmin) {
      toast.error("Nu ai permisiunea de a bana un membru Staff superior.");
      return;
    }
    if (profile.id === user?.id) {
      toast.error("Nu te poți bana pe tine însuți.");
      return;
    }

    const newBanStatus = !profile.is_banned;
    const confirmMsg = newBanStatus 
      ? `Ești sigur că vrei să banezi pe ${profile.username}?` 
      : `Ești sigur că vrei să debanezi pe ${profile.username}?`;
      
    if (!window.confirm(confirmMsg)) return;

    try {
      await adminUpdateProfile({
        data: {
          userId: profile.id,
          updates: {
            is_banned: newBanStatus
          }
        }
      });
      toast.success(`Jucătorul a fost ${newBanStatus ? "banat" : "debanat"} în baza de date!`);
    } catch (err: any) {
      toast.error("Eroare la acțiunea de ban: " + (err.message || "Eroare necunoscută"));
    } finally {
      fetchProfiles();
    }
  };

  const filteredProfiles = profiles.filter(p => 
    (p.username && p.username.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (p.display_name && p.display_name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (authLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
          </div>
          <p className="text-xs tracking-[0.3em] text-silver animate-pulse">VERIFICARE ACCES...</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] tracking-[0.4em] text-amber-400 uppercase">ZONĂ RESTRICȚIONATĂ</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-light tracking-[0.1em] text-silver-gradient flex items-center gap-3">
              <ShieldAlert className="h-8 w-8 text-amber-400" />
              PANOU ADMINISTRARE
            </h1>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-2xl mb-8 bg-white/5 border border-white/10 rounded-xl p-1">
            <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-amber-400 data-[state=active]:text-black text-xs font-bold tracking-wider uppercase transition-all">Jucători</TabsTrigger>
            <TabsTrigger value="content" className="rounded-lg data-[state=active]:bg-amber-400 data-[state=active]:text-black text-xs font-bold tracking-wider uppercase transition-all">Conținut Site</TabsTrigger>
            <TabsTrigger value="views" className="rounded-lg data-[state=active]:bg-amber-400 data-[state=active]:text-black text-xs font-bold tracking-wider uppercase transition-all">Statistici Vizualizări</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Users List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Caută utilizatori după nume..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-white/[0.02] border-white/10 focus:border-amber-400/40 text-sm h-9"
                />
              </div>
              <div className="text-xs text-muted-foreground tracking-widest font-mono ml-4">
                TOTAL: {filteredProfiles.length}
              </div>
            </div>

            <div className="glass rounded-xl border border-white/5 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground">
                  <thead className="bg-white/5 text-[10px] uppercase tracking-wider text-silver">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Jucător</th>
                      <th className="px-6 py-4 font-semibold">Grad / Faction</th>
                      <th className="px-6 py-4 font-semibold text-right">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {loadingProfiles ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-xs animate-pulse">Se încarcă jucătorii...</td>
                      </tr>
                    ) : filteredProfiles.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-xs">Niciun utilizator găsit.</td>
                      </tr>
                    ) : (
                      filteredProfiles.map((p) => (
                        <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                                {p.avatar_url ? (
                                  <img src={p.avatar_url} alt="" className="h-full w-full object-cover" />
                                ) : (
                                  <Users className="h-4 w-4 text-silver/50" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-foreground flex items-center gap-2">
                                  {p.display_name || p.username}
                                  {p.is_banned && <span className="bg-red-500/20 text-red-500 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">BANAT</span>}
                                </div>
                                <div className="text-[10px] text-muted-foreground">@{p.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${
                              p.faction === 'Fondator' 
                                ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20' 
                                : 'bg-white/5 text-silver border border-white/5'
                            }`}>
                              {(p.faction === "Administrator" || p.faction?.includes("Admin")) ? "Fondator" : (p.faction || "Jucător")}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleEditClick(p)}
                                className="h-7 text-[10px] border-white/10 hover:bg-amber-400/10 hover:text-amber-400 hover:border-amber-400/20 gap-1.5"
                              >
                                <Edit className="h-3 w-3" />
                                Editează
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleToggleBan(p)}
                                className={`h-7 text-[10px] border-white/10 gap-1.5 ${p.is_banned ? 'hover:bg-green-500/10 hover:text-green-500 hover:border-green-500/20' : 'hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20'}`}
                              >
                                <Ban className="h-3 w-3" />
                                {p.is_banned ? "Debanează" : "Ban"}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Edit Panel */}
          <div className="lg:col-span-4">
            {editingProfile ? (
              <div className="glass rounded-2xl p-6 border-amber-400/20 relative">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <UserCheck className="h-24 w-24 text-amber-400" />
                </div>
                
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                  <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase">
                    Modificare Jucător
                  </h3>
                  <button onClick={() => setEditingProfile(null)} className="text-muted-foreground hover:text-white transition">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-full bg-white/10 overflow-hidden">
                      {editingProfile.avatar_url && <img src={editingProfile.avatar_url} className="h-full w-full object-cover" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{editingProfile.display_name || editingProfile.username}</div>
                      <div className="text-[10px] text-muted-foreground">@{editingProfile.username}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] tracking-wider text-silver uppercase">Grad / Faction</Label>
                    <select
                      value={editFaction}
                      onChange={(e) => setEditFaction(e.target.value)}
                      className="w-full bg-black/40 border border-white/10 focus:border-amber-400/40 text-sm h-9 px-3 rounded-md text-foreground outline-none"
                    >
                      {getAvailableRanks().map(rank => (
                        <option key={rank} value={rank} className="bg-[#0B0B0B] text-foreground">{rank}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] tracking-wider text-silver uppercase">Descriere / Bio</Label>
                    <textarea 
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Descrierea jucătorului..."
                      className="w-full rounded-md border border-white/10 bg-black/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-amber-400/40 focus:outline-none"
                    />
                  </div>

                  {editingProfile.fivem_connected && (
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                      <h4 className="text-[10px] tracking-widest text-amber-400/80 uppercase font-semibold flex items-center gap-1.5 mb-2">
                        <Database className="h-3 w-3" />
                        Date FiveM Sincronizate
                      </h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Identitate</div>
                          <div className="text-silver">{editingProfile.fivem_username || "-"}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Job / Ocupație</div>
                          <div className="text-silver flex items-center gap-1.5"><Briefcase className="h-3 w-3 text-muted-foreground"/> {editingProfile.fivem_job || "-"}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Finanțe (Cash + Bancă)</div>
                          <div className="text-emerald-400 font-mono">${((editingProfile.fivem_cash || 0) + (editingProfile.fivem_bank || 0)).toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Timp Jucat</div>
                          <div className="text-silver flex items-center gap-1.5"><Clock className="h-3 w-3 text-muted-foreground"/> {Math.floor((editingProfile.fivem_playtime || 0) / 60)} Ore</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black font-bold tracking-widest text-xs h-10 mt-2"
                  >
                    {saving ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 border-white/5 text-center flex flex-col items-center justify-center h-full min-h-[300px]">
                <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-sm font-semibold text-silver mb-2">Niciun jucător selectat</h3>
                <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                  Selectează "Editează" din tabel pentru a modifica gradul sau descrierea unui jucător.
                </p>
              </div>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="content">
        <div className="glass rounded-2xl p-6 border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-6">
            <div>
              <h2 className="text-xl font-light tracking-wide text-silver-gradient">Editare Conținut (CMS)</h2>
              <p className="text-xs text-muted-foreground mt-1">Atenție: Acest editor modifică direct datele în format JSON. Asigurați-vă că structura este corectă.</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={contentSelector}
                onChange={(e) => setContentSelector(e.target.value)}
                className="bg-black/40 border border-white/10 focus:border-amber-400/40 text-sm h-10 px-4 rounded-md text-foreground outline-none"
              >
                <option value="regulament" className="bg-[#0B0B0B]">Regulament & Termeni</option>
                <option value="cod_penal" className="bg-[#0B0B0B]">Cod Penal</option>
              </select>
              <Button 
                onClick={handleSaveContent}
                disabled={savingContent || currentUserFaction !== "Fondator"}
                className="bg-amber-400 hover:bg-amber-500 text-black font-bold tracking-widest text-xs h-10 gap-2"
              >
                <Save className="h-4 w-4" />
                {savingContent ? "SE SALVEAZĂ..." : "SALVEAZĂ"}
              </Button>
            </div>
          </div>

          <div className="relative">
            {loadingContent && (
              <div className="absolute inset-0 bg-black/60 z-10 flex flex-col items-center justify-center rounded-xl">
                <div className="w-8 h-8 rounded-full border-t-2 border-amber-400 animate-spin mb-2" />
                <span className="text-xs tracking-widest text-amber-400 animate-pulse">SE ÎNCARCĂ...</span>
              </div>
            )}
            <textarea
              value={siteContentJson}
              onChange={(e) => setSiteContentJson(e.target.value)}
              className="w-full h-[600px] bg-[#0A0A0A] border border-white/10 rounded-xl p-4 font-mono text-sm text-silver focus:border-amber-400/40 focus:outline-none resize-y"
              spellCheck={false}
            />
          </div>
        </div>
      </TabsContent>

      {/* Views Statistics Tab */}
      <TabsContent value="views" className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* General Pages Views */}
          <div className="glass rounded-2xl p-6 border-white/10">
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase flex items-center gap-2 mb-6">
              <BarChart3 className="h-4 w-4" />
              Vizualizări Pagini (Regulamente, etc.)
            </h3>
            <div className="space-y-3">
              {viewsStats?.pages?.length ? viewsStats.pages.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-sm font-medium text-silver capitalize">{p.id.replace(/-/g, ' ')}</span>
                  <span className="text-sm font-bold text-amber-400 px-3 py-1 bg-amber-400/10 rounded-md border border-amber-400/20">{p.views_count} views</span>
                </div>
              )) : (
                <div className="text-sm text-muted-foreground italic p-4 text-center">Nicio pagină nu are vizualizări momentan.</div>
              )}
            </div>
          </div>

          {/* Forum Topics Views */}
          <div className="glass rounded-2xl p-6 border-white/10">
            <h3 className="text-sm font-bold tracking-wider text-amber-400 uppercase flex items-center gap-2 mb-6">
              <BarChart3 className="h-4 w-4" />
              Vizualizări Topicuri Forum
            </h3>
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {viewsStats?.threads?.length ? viewsStats.threads.map((t, i) => (
                <div key={i} className="flex flex-col gap-2 p-3 rounded-lg bg-black/40 border border-white/5">
                  <div className="flex items-start justify-between gap-4">
                    <Link to="/forum/thread/$threadId" params={{ threadId: t.id }} className="text-sm font-medium text-silver hover:text-amber-400 transition-colors line-clamp-2">
                      {t.title}
                    </Link>
                    <span className="shrink-0 text-xs font-bold text-emerald-400 px-2 py-0.5 bg-emerald-400/10 rounded border border-emerald-400/20">{t.views_count} views</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{t.category}</div>
                </div>
              )) : (
                <div className="text-sm text-muted-foreground italic p-4 text-center">Niciun topic creat sau vizualizat încă.</div>
              )}
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
      </main>
      <SiteFooter />
    </div>
  );
}
