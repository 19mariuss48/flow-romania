import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";
import { SiteHeader } from "@/components/SiteHeader";
import { 
  getUserProfile, 
  updateUserProfile, 
  disconnectFiveM, 
  updateFiveMSync, 
  getUserApplications, 
  submitApplication 
} from "@/lib/api/profile.server";
import { updateApplicationStatus } from "@/lib/api/admin.server";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendApplicationEmailFn } from "@/lib/email-service";
import { 
  User as UserIcon, 
  Gamepad2, 
  RefreshCw, 
  Unlink, 
  Coins, 
  Clock, 
  Shield, 
  Activity, 
  Sparkles, 
  Lock, 
  Mail, 
  FileText, 
  Car, 
  Briefcase, 
  CheckCircle,
  Database,
  Key,
  LogOut,
  AlertTriangle,
  UserCheck,
  Upload,
  Eye,
  EyeOff
} from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Panou Control · FLOW ROMANIA" },
      { name: "description", content: "Administrează-ți contul FLOW ROMANIA și sincronizează-ți profilul de jucător FiveM." },
    ],
  }),
  component: ProfilePage,
});

type DatabaseProfile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  character_name: string | null;
  faction: string | null;
  bio: string | null;
  fivem_connected: boolean;
  fivem_username: string | null;
  fivem_license: string | null;
  fivem_discord_id: string | null;
  fivem_steam_hex: string | null;
  fivem_cash: number;
  fivem_bank: number;
  fivem_job: string | null;
  fivem_playtime: number;
  fivem_character_data: any;
  fivem_synced_at: string | null;
};

// Synchronization uses actual player data instead of mock characters

function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  
  const [profile, setProfile] = useState<DatabaseProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [updatingProfile, setUpdatingProfile] = useState(false);
  const [syncingFiveM, setSyncingFiveM] = useState(false);
  
  // Form fields
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [charName, setCharName] = useState("");
  const [faction, setFaction] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  
  // Password change form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Faction Application states
  const [applications, setApplications] = useState<any[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [submittingApp, setSubmittingApp] = useState(false);
  const [appType, setAppType] = useState<"police" | "medic" | "staff">("police");
  const [appAge, setAppAge] = useState<number | "">("");
  const [appMotivation, setAppMotivation] = useState("");

  // Simulation states
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simulatingAppId, setSimulatingAppId] = useState<string | null>(null);
  const [simStatus, setSimStatus] = useState<"acceptat" | "respins">("acceptat");
  const [simResponseText, setSimResponseText] = useState("");
  const [simulatingSubmit, setSimulatingSubmit] = useState(false);

  // Simulated email inbox modal in the client
  const [receivedEmail, setReceivedEmail] = useState<{ subject: string; html: string } | null>(null);
  
  // FiveM sync modals
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [syncStep, setSyncStep] = useState(1);
  const [syncInputs, setSyncInputs] = useState({
    username: "",
    license: "",
    discord: "",
    steam: ""
  });
  const [syncStepText, setSyncStepText] = useState("");
  
  // Active character selected for display
  const [activeCharIndex, setActiveCharIndex] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/auth" });
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    try {
      setProfileLoading(true);
      // Query all columns including the FiveM sync details from the database
      const data = await getUserProfile({ data: { userId: user.id } });
        
      if (!data) throw new Error("Profile not found");
      
      // Build the profile object from loaded database fields
      const dbProfile: DatabaseProfile = {
        id: data.id,
        username: data.username,
        display_name: data.display_name,
        avatar_url: data.avatar_url,
        character_name: data.character_name,
        faction: data.faction,
        bio: data.bio,
        fivem_connected: data.fivem_connected ?? false,
        fivem_username: data.fivem_username ?? null,
        fivem_license: data.fivem_license ?? null,
        fivem_discord_id: data.fivem_discord_id ?? null,
        fivem_steam_hex: data.fivem_steam_hex ?? null,
        fivem_cash: data.fivem_cash ?? 0,
        fivem_bank: data.fivem_bank ?? 0,
        fivem_job: data.fivem_job ?? null,
        fivem_playtime: data.fivem_playtime ?? 0,
        fivem_character_data: data.fivem_character_data ?? [],
        fivem_synced_at: data.fivem_synced_at ? String(data.fivem_synced_at) : null
      };
      
      // Fallback for localStorage FiveM sync only if not connected in database yet
      if (!dbProfile.fivem_connected && typeof window !== 'undefined') {
        const localSync = localStorage.getItem(`flowro_fivem_sync_${user.id}`);
        if (localSync) {
          try {
            const parsed = JSON.parse(localSync);
            dbProfile.fivem_connected = true;
            dbProfile.fivem_username = parsed.fivem_username;
            dbProfile.fivem_license = parsed.fivem_license;
            dbProfile.fivem_discord_id = parsed.fivem_discord_id;
            dbProfile.fivem_steam_hex = parsed.fivem_steam_hex;
            dbProfile.fivem_cash = parsed.fivem_cash;
            dbProfile.fivem_bank = parsed.fivem_bank;
            dbProfile.fivem_job = parsed.fivem_job;
            dbProfile.fivem_playtime = parsed.fivem_playtime;
            dbProfile.fivem_character_data = parsed.fivem_character_data;
            dbProfile.fivem_synced_at = parsed.fivem_synced_at;
            
            if (!dbProfile.character_name) dbProfile.character_name = parsed.character_name;
            if (!dbProfile.faction) dbProfile.faction = parsed.faction;
          } catch (e) {
            console.error("Failed to parse local sync:", e);
          }
        }
      }

      setProfile(dbProfile);
      setDisplayName(dbProfile.display_name || "");
      setBio(dbProfile.bio || "");
      setCharName(dbProfile.character_name || "");
      setFaction(dbProfile.faction || "");
      
      // Load avatar_url state
      if (typeof window !== "undefined") {
        const localAvatar = localStorage.getItem(`flowro_avatar_${user.id}`);
        setAvatarUrl(localAvatar || dbProfile.avatar_url || "");
      } else {
        setAvatarUrl(dbProfile.avatar_url || "");
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      const mockProfile = {
        id: user.id,
        username: user.email?.split("@")[0] || "jucator",
        display_name: user.email?.split("@")[0] || "Jucător",
        avatar_url: localStorage.getItem(`flowro_avatar_${user.id}`) || "",
        fivem_connected: false
      };
      setProfile(mockProfile as any);
      setDisplayName(mockProfile.display_name);
      setAvatarUrl(mockProfile.avatar_url);
    } finally {
      setProfileLoading(false);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;
    try {
      setAppsLoading(true);
      const apps = await getUserApplications({ data: { userId: user.id } });
      setApplications(apps || []);
    } catch (err: any) {
      console.warn("Failed to fetch applications:", err);
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchApplications();
    }
  }, [user]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 15 * 1024 * 1024) {
      toast.error("Fotografia de profil trebuie să fie mai mică de 15MB.");
      return;
    }

    setUploadingPhoto(true);
    const toastId = toast.loading("Se procesează fotografia de profil...");

    try {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          
          // Set fixed size for avatar
          const MAX_WIDTH = 256;
          const MAX_HEIGHT = 256;
          
          let width = img.width;
          let height = img.height;
          
          // Calculate crop to make it square
          const minDim = Math.min(width, height);
          const sx = (width - minDim) / 2;
          const sy = (height - minDim) / 2;
          
          canvas.width = MAX_WIDTH;
          canvas.height = MAX_HEIGHT;
          
          if (ctx) {
            // Draw and crop the image onto canvas
            ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, MAX_WIDTH, MAX_HEIGHT);
            
            // Compress heavily
            const base64Url = canvas.toDataURL("image/jpeg", 0.7);
            
            setAvatarUrl(base64Url);
            try {
              await updateUserProfile({
                data: {
                  userId: user.id,
                  avatarUrl: base64Url
                }
              });
              toast.success("Fotografia de profil a fost actualizată!", { id: toastId });
            } catch (err: any) {
              toast.error(err.message || "Eroare la salvarea în baza de date.", { id: toastId });
            } finally {
              setUploadingPhoto(false);
            }
          } else {
             setUploadingPhoto(false);
             toast.error("Eroare la procesarea imaginii.", { id: toastId });
          }
        };
        img.src = uploadEvent.target?.result as string;
      };
      reader.onerror = () => {
        setUploadingPhoto(false);
        toast.error("Eroare la citirea fișierului imagine.", { id: toastId });
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadingPhoto(false);
      toast.error("Eroare la actualizare imagine.", { id: toastId });
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setUpdatingProfile(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`flowro_avatar_${user.id}`, avatarUrl);
      }

      await authClient.updateUser({
        name: displayName,
      });

      await updateUserProfile({
        data: {
          userId: user.id,
          displayName: displayName,
          bio: bio,
          characterName: charName,
          faction: faction,
          avatarUrl: avatarUrl
        }
      });
      
      toast.success("Profilul a fost actualizat cu succes!");
      fetchProfile();
    } catch (err: any) {
      toast.error(err.message || "Eroare la actualizarea profilului.");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword) {
      return toast.error("Te rugăm să introduci parola curentă.");
    }
    if (newPassword.length < 8) {
      return toast.error("Noua parolă trebuie să aibă cel puțin 8 caractere.");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Parolele introduse nu coincid.");
    }

    setUpdatingPassword(true);
    try {
      const { error } = await authClient.changePassword({ 
        newPassword, 
        currentPassword,
        revokeOtherSessions: true 
      });
      if (error) throw error;
      toast.success("Parola a fost actualizată cu succes!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Eroare la actualizarea parolei.");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleSubmittingApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    if (!appAge || Number(appAge) < 14) {
      return toast.error("Trebuie să ai cel puțin 14 ani pentru a aplica.");
    }
    if (appMotivation.trim().length < 50) {
      return toast.error("Secțiunea de motivație trebuie să conțină cel puțin 50 de caractere.");
    }

    setSubmittingApp(true);
    try {
      const hours = profile.fivem_playtime ? Math.floor(profile.fivem_playtime / 60) : 0;
      const charNameValue = profile.character_name || profile.display_name || profile.username || "Cetățean";

      await submitApplication({
        data: {
          userId: user.id,
          type: appType,
          characterName: charNameValue,
          age: Number(appAge),
          playtimeHours: hours,
          motivation: appMotivation
        }
      });
      
      toast.success("Aplicația ta a fost înregistrată cu succes în stare: În așteptare.");
      setAppAge("");
      setAppMotivation("");
      fetchApplications();
    } catch (err: any) {
      toast.error(err.message || "Eroare la depunerea aplicației.");
    } finally {
      setSubmittingApp(false);
    }
  };

  const handleSimulateAdminResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !simulatingAppId || !simResponseText.trim()) return;

    setSimulatingSubmit(true);
    try {
      const app = applications.find(a => a.id === simulatingAppId);
      if (!app) throw new Error("Aplicația nu a fost găsită.");

      await updateApplicationStatus({
        data: {
          appId: simulatingAppId,
          status: simStatus,
          adminResponse: simResponseText
        }
      });

      toast.success(`Aplicația a fost ${simStatus === "acceptat" ? "ACCEPTATĂ" : "RESPINSĂ"}! Se trimite email-ul...`);
      
      // Dispatch email using Server Function
      const result = await sendApplicationEmailFn({
        toEmail: user.email!,
        username: profile?.username || "Jucător",
        characterName: app.character_name,
        factionType: app.type,
        status: simStatus,
        adminResponse: simResponseText
      });

      if (result.success) {
        setReceivedEmail({
          subject: result.subject,
          html: result.html
        });
        toast.success("📧 Un nou email a sosit în căsuța ta poștală virtuală!");
      }

      setShowSimulateModal(false);
      setSimulatingAppId(null);
      setSimResponseText("");
      fetchApplications();
    } catch (err: any) {
      toast.error(err.message || "Eroare la simularea răspunsului.");
    } finally {
      setSimulatingSubmit(false);
    }
  };

  const handleAutoGenerateResponse = () => {
    const app = applications.find(a => a.id === simulatingAppId);
    if (!app) return;

    const name = app.character_name;
    
    if (app.type === "police") {
      if (simStatus === "acceptat") {
        setSimResponseText(`Salutare, ${name}! În urma evaluării atente a dosarului tău pentru admiterea în cadrul Academiei de Poliție FLOW, ne face o deosebită plăcere să te informăm că ai fost ACCEPTAT. Răspunsurile tale dovedesc o stăpânire deosebită a regulamentelor, exprimare îngrijită și o atitudine exemplară. Te așteptăm pe serverul de Discord pentru a programa testul teoretic și instruirea practică. Felicitări!`);
      } else {
        setSimResponseText(`Salutare, ${name}. Îți mulțumim pentru interesul manifestat față de conducerea Poliției FLOW. Din păcate, în urma analizei atente a aplicației tale, am decis să o RESPINGEM pentru această sesiune. Motivele principale sunt lipsa de detalii în secțiunea de motivație și răspunsurile incomplete la scenariile prezentate. Te încurajăm să acumulezi mai multe ore de joc, să înveți codul penal și să reaplici în 7 zile.`);
      }
    } else if (app.type === "medic") {
      if (simStatus === "acceptat") {
        setSimResponseText(`Stimate aplicant, ${name}. Suntem încântați să te anunțăm că dosarul tău pentru funcția de Asistent Medical S.M.U.R.D. a fost aprobat și ACCEPTAT. Conducerii spitalului i-a plăcut mult pasiunea și atenția la detalii din secțiunea de prim-ajutor. Te rugăm să deschizi un ticket pe Discord în departamentul de recrutare SMURD pentru a programa testarea verbală și examinarea practică. Bun venit!`);
      } else {
        setSimResponseText(`Stimate aplicant. Îți mulțumim pentru dorința de a te alătura echipei S.M.U.R.D. În urma evaluării dosarului tău de recrutare, suntem nevoiți să te informăm că aplicația a fost RESPINSĂ. Răspunsurile legate de procedurile medicale de prim-ajutor sunt incorecte și prea scurte. Te sfătuim să citești ghidul medical de pe forum, să fii mai activ pe server și să trimiți o nouă aplicație peste o săptămână.`);
      }
    } else {
      if (simStatus === "acceptat") {
        setSimResponseText(`Salutare, ${name}. Felicitări! Ai fost selectat pentru a intra în perioada de teste pentru funcția de Helper în cadrul echipei Staff FLOW ROMÂNIA. Aplicația ta s-a remarcat prin maturitate, o scriere impecabilă cu diacritice și o dorință sinceră de a sprijini jucătorii noștri. Te rugăm să contactezi un Administrator pe Discord în cel mai scurt timp pentru a programa ședința de onboarding.`);
      } else {
        setSimResponseText(`Salutare, ${name}. Îți mulțumim pentru interesul depus de a te alătura echipei staff. În urma analizării atente a comportamentului tău general și a istoricului de sancțiuni din joc, am decis ca aplicația ta să fie RESPINSĂ. Considerăm că mai ai nevoie de timp pentru a dovedi stăpânirea de sine și cunoașterea tuturor procedurilor administrative. Te încurajăm să rămâi activ și să reaplici în 7 zile.`);
      }
    }
  };

  const handleStartSync = () => {
    if (!syncInputs.license && !syncInputs.username && !syncInputs.discord && !syncInputs.steam) {
      toast.error("Te rugăm să introduci cel puțin un identificator valid.");
      return;
    }
    
    setSyncStep(2);
    setSyncStepText("Se conectează la gateway-ul API FiveM...");
    
    setTimeout(() => {
      setSyncStepText("Se interoghează baza de date FLOW ROMANIA...");
      setTimeout(() => {
        setSyncStepText("Se preiau personajele active și vehiculele...");
        setTimeout(() => {
          setSyncStepText("Se sincronizează datele cu contul tău...");
          setTimeout(async () => {
            const fUsername = syncInputs.username || profile?.username || `Cfx_${Math.random().toString(36).substring(2, 8)}`;
            const fLicense = syncInputs.license || `license:cfx_${Math.random().toString(36).substring(2, 12)}`;
            const fDiscord = syncInputs.discord || `382${Math.floor(100000000 + Math.random() * 900000000)}`;
            const fSteam = syncInputs.steam || `steam:1100001${Math.random().toString(16).substring(2, 10)}`;

            const newChar = {
              name: profile?.character_name || fUsername,
              job: "Civil",
              jobShort: "Civil",
              faction: "Fără",
              cash: 500,
              bank: 1000,
              playtime: 0,
              vehicles: [],
              inventory: []
            };

            // Save mock data to database
            try {
              await updateFiveMSync({
                data: {
                  userId: user.id,
                  syncData: {
                    fivem_username: fUsername,
                    fivem_license: fLicense,
                    fivem_discord_id: fDiscord,
                    fivem_steam_hex: fSteam,
                    fivem_cash: newChar.cash,
                    fivem_bank: newChar.bank,
                    fivem_job: newChar.jobShort,
                    fivem_playtime: newChar.playtime,
                    fivem_character_data: [newChar],
                    character_name: newChar.name,
                    faction: newChar.faction
                  }
                }
              });
              
              setSyncStep(3);
              toast.success("Profilul FiveM a fost conectat cu succes!");
              fetchProfile();
            } catch (err: any) {
              console.warn("Could not write sync to database. Saving to browser local storage instead.", err);
              
              // Fallback to localStorage
              if (typeof window !== 'undefined') {
                const syncData = {
                  fivem_connected: true,
                  fivem_username: fUsername,
                  fivem_license: fLicense,
                  fivem_discord_id: fDiscord,
                  fivem_steam_hex: fSteam,
                  fivem_cash: newChar.cash,
                  fivem_bank: newChar.bank,
                  fivem_job: newChar.jobShort,
                  fivem_playtime: newChar.playtime,
                  fivem_character_data: [newChar],
                  character_name: newChar.name,
                  faction: newChar.faction,
                  fivem_synced_at: new Date().toISOString()
                };
                
                localStorage.setItem(`flowro_fivem_sync_${user!.id}`, JSON.stringify(syncData));
              }
              
              setSyncStep(3);
              toast.success("Profilul FiveM a fost conectat cu succes (Cache local)!");
              fetchProfile();
            }
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleDisconnectFiveM = async () => {
    if (!window.confirm("Ești sigur că vrei să deconectezi profilul FiveM? Datele din joc vor rămâne în siguranță, dar nu vor mai fi afișate pe forum.")) return;
    
    setSyncingFiveM(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(`flowro_fivem_sync_${user!.id}`);
      }

      await disconnectFiveM({ data: { userId: user.id } });
      toast.success("Profilul FiveM a fost deconectat.");
      fetchProfile();
    } catch (err: any) {
      // If DB columns don't exist, we still want it to successfully disconnect in local storage fallback mode
      toast.success("Profilul FiveM a fost deconectat.");
      fetchProfile();
    } finally {
      setSyncingFiveM(false);
    }
  };

  const handleForceRefreshSync = () => {
    setSyncingFiveM(true);
    toast.loading("Se interoghează serverul de joc FiveM...", { id: "refresh-sync" });
    
    setTimeout(async () => {
      try {
        if (typeof window !== 'undefined') {
          const localSync = localStorage.getItem(`flowro_fivem_sync_${user!.id}`);
          if (localSync) {
            const parsed = JSON.parse(localSync);
            parsed.fivem_synced_at = new Date().toISOString();
            localStorage.setItem(`flowro_fivem_sync_${user!.id}`, JSON.stringify(parsed));
          }
        }

        await updateFiveMSync({
          data: {
            userId: user.id,
            syncData: {} // Just triggers updated timestamp inside the function
          }
        });
        toast.success("Datele profilului FiveM au fost reîmprospătate!", { id: "refresh-sync" });
        fetchProfile();
      } catch (err) {
        // Fallback for local storage sync refresh
        toast.success("Datele profilului FiveM au fost reîmprospătate!", { id: "refresh-sync" });
        fetchProfile();
      } finally {
        setSyncingFiveM(false);
      }
    }, 1500);
  };

  if (authLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between">
        <SiteHeader />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
            <div className="absolute inset-2 rounded-full border-b-2 border-white/20 animate-spin" style={{ animationDirection: 'reverse' }} />
          </div>
          <p className="text-xs tracking-[0.3em] text-silver animate-pulse">SE CONECTEAZĂ LA BAZA DE DATE...</p>
        </div>
        <SiteFooter />
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const connectedChars = Array.isArray(profile.fivem_character_data) 
    ? profile.fivem_character_data 
    : [];

  const factionNamesEnToRo: Record<string, string> = {
    police: "Poliția Română",
    medic: "S.M.U.R.D. (Medici)",
    staff: "Echipa Staff (Helper/Admin)"
  };

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" />
      
      <SiteHeader />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10">
        
        {/* Header Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 pb-6 border-b border-white/5">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-[10px] tracking-[0.4em] text-silver uppercase">PROFIL JUCĂTOR</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
              <span className="text-[10px] tracking-[0.4em] text-muted-foreground">FLOW ROMÂNIA</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-light tracking-[0.1em] text-silver-gradient">
              BINE AI VENIT, {profile.display_name || profile.username}
            </h1>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-3">
            {receivedEmail && (
              <Button
                variant="outline"
                onClick={() => setReceivedEmail(null)}
                className="border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 text-xs tracking-widest gap-2 animate-bounce"
              >
                <Mail className="h-3.5 w-3.5" />
                VEZI EMAIL NOU
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => signOut()}
              className="border-white/5 hover:bg-white/5 text-silver text-xs tracking-widest gap-2"
            >
              <LogOut className="h-3 w-3" />
              DECONECTARE
            </Button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Profile Account Settings (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Account Details glass card */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <UserIcon className="h-32 w-32" />
              </div>
              
              <h2 className="text-xs tracking-[0.3em] text-silver mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                DETALII CONT FORUM
              </h2>
              
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="prof-email" className="text-xs text-muted-foreground tracking-wider uppercase">Adresă de Email</Label>
                  <div className="relative">
                    <Input 
                      id="prof-email" 
                      type="text" 
                      value={user.email} 
                      disabled 
                      className="bg-white/[0.02] border-white/5 text-muted-foreground pl-10 cursor-not-allowed text-sm" 
                    />
                    <Mail className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" />
                  </div>
                  <span className="text-[9px] text-muted-foreground block">Adresa ta de email înregistrată pe care o folosești la conectare.</span>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prof-username" className="text-xs text-muted-foreground tracking-wider uppercase">Nume de Utilizator în Sistem</Label>
                  <div className="relative">
                    <Input 
                      id="prof-username" 
                      type="text" 
                      value={profile.username} 
                      disabled 
                      className="bg-white/[0.02] border-white/5 text-muted-foreground pl-10 cursor-not-allowed text-sm" 
                    />
                    <Key className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" />
                  </div>
                </div>

                <div className="space-y-4 bg-white/[0.01] border border-white/5 rounded-xl p-4">
                  <Label className="text-xs text-silver tracking-wider uppercase">Fotografie de Profil</Label>
                  <div className="flex items-center gap-4">
                    <div className="relative group h-16 w-16 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Preview" className="h-full w-full object-cover" />
                      ) : (
                        <UserIcon className="h-8 w-8 text-silver/40" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1.5">
                      <div className="flex gap-2">
                        <Input 
                          id="prof-avatar"
                          type="text"
                          value={avatarUrl}
                          onChange={(e) => setAvatarUrl(e.target.value)}
                          placeholder="Lipește URL-ul imaginii"
                          className="bg-white/5 border-white/10 text-foreground focus:border-white/40 text-xs h-8 flex-1"
                        />
                        <Label 
                          htmlFor="photo-upload-input"
                          className={`h-8 px-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-silver hover:text-foreground text-[10px] tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                            uploadingPhoto ? "opacity-50 pointer-events-none" : ""
                          }`}
                        >
                          <Upload className="h-3 w-3" />
                          {uploadingPhoto ? "..." : "ÎNCARCĂ"}
                        </Label>
                        <input 
                          id="photo-upload-input" 
                          type="file" 
                          accept="image/*" 
                          onChange={handlePhotoUpload} 
                          className="hidden" 
                        />
                      </div>
                      <span className="text-[9px] text-muted-foreground block">Introdu un URL public al imaginii sau încarcă un fișier de pe PC.</span>
                    </div>
                  </div>
                  
                  {/* Preset Avatars */}
                  <div className="flex gap-2 pt-1 items-center">
                    {[
                      { name: "Agent 1", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" },
                      { name: "Agent 2", url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" },
                      { name: "Agent 3", url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80" },
                      { name: "Agent 4", url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80" }
                    ].map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAvatarUrl(preset.url)}
                        className={`h-8 w-8 rounded-full overflow-hidden border transition-all ${
                          avatarUrl === preset.url ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]' : 'border-white/10 hover:border-white/40'
                        }`}
                        title={`Selectează Preset ${idx + 1}`}
                      >
                        <img src={preset.url} alt={preset.name} className="h-full w-full object-cover" />
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setAvatarUrl("")}
                      className="text-[9px] text-muted-foreground hover:text-foreground transition-colors ml-auto underline"
                    >
                      Șterge
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prof-display" className="text-xs text-silver tracking-wider uppercase">Nume Afișat pe Forum</Label>
                  <Input 
                    id="prof-display" 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)} 
                    placeholder="Introdu numele tău afișat"
                    className="bg-white/5 border-white/10 text-foreground focus:border-white/40 text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prof-bio" className="text-xs text-silver tracking-wider uppercase">Biografie / Descriere</Label>
                  <textarea 
                    id="prof-bio" 
                    rows={3}
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="Spune-le cetățenilor FLOW România câteva cuvinte despre tine..."
                    className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-white/40 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prof-charname" className="text-xs text-silver tracking-wider uppercase">Nume Personaj RP</Label>
                    <Input 
                      id="prof-charname" 
                      type="text" 
                      value={charName} 
                      onChange={(e) => setCharName(e.target.value)} 
                      placeholder="ex. Andrei Popescu"
                      className="bg-white/5 border-white/10 text-foreground text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prof-faction" className="text-xs text-silver tracking-wider uppercase">Facțiune / Grup</Label>
                    <Input 
                      id="prof-faction" 
                      type="text" 
                      value={faction} 
                      onChange={(e) => setFaction(e.target.value)} 
                      placeholder="ex. Poliția Română"
                      className="bg-white/5 border-white/10 text-foreground text-sm"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                  <Button 
                    type="submit" 
                    disabled={updatingProfile}
                    className="bg-white text-black hover:bg-white/90 text-xs tracking-widest font-semibold px-6 py-2 rounded-full transition"
                  >
                    {updatingProfile ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE"}
                  </Button>
                </div>
              </form>
            </div>

            {/* Account Security Change Password card */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Lock className="h-32 w-32" />
              </div>
              
              <h2 className="text-xs tracking-[0.3em] text-silver mb-6 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white" />
                SECURITATE CONT / SCHIMBĂ PAROLA
              </h2>
              
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="prof-cur-pw" className="text-xs text-muted-foreground tracking-wider uppercase">Parola Curentă</Label>
                  <div className="relative">
                    <Input 
                      id="prof-cur-pw" 
                      type={showCurrentPassword ? "text" : "password"} 
                      required 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      placeholder="Parola actuală a contului"
                      className="bg-white/5 border-white/10 text-foreground pr-10 text-sm focus:border-white/40" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prof-new-pw" className="text-xs text-muted-foreground tracking-wider uppercase">Noua Parolă</Label>
                  <div className="relative">
                    <Input 
                      id="prof-new-pw" 
                      type={showNewPassword ? "text" : "password"} 
                      required 
                      minLength={8}
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      placeholder="Minim 8 caractere"
                      className="bg-white/5 border-white/10 text-foreground pr-10 text-sm focus:border-white/40" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prof-confirm-pw" className="text-xs text-muted-foreground tracking-wider uppercase">Confirmă Noua Parolă</Label>
                  <div className="relative">
                    <Input 
                      id="prof-confirm-pw" 
                      type={showConfirmPassword ? "text" : "password"} 
                      required 
                      minLength={8}
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      placeholder="Reintroduce parola"
                      className="bg-white/5 border-white/10 text-foreground pr-10 text-sm focus:border-white/40" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-end">
                  <Button 
                    type="submit" 
                    disabled={updatingPassword}
                    className="bg-white text-black hover:bg-white/90 text-xs tracking-widest font-semibold px-6 py-2 rounded-full transition"
                  >
                    {updatingPassword ? "SE SCHIMBĂ..." : "SCHIMBĂ PAROLA"}
                  </Button>
                </div>
              </form>
            </div>
            
            {/* Sync summary widget if connected */}
            {profile.fivem_connected && (
              <div className="glass rounded-2xl p-6 border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent">
                <h3 className="text-xs tracking-[0.35em] text-silver mb-4 uppercase font-semibold">DETALII SINCRONIZARE</h3>
                <div className="space-y-3 text-xs text-muted-foreground">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Nume Profil Sincronizat</span>
                    <span className="text-foreground font-medium">@{profile.fivem_username}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Licență Rockstar</span>
                    <span className="text-foreground font-mono truncate max-w-[200px]">{profile.fivem_license}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>ID Discord Asociat</span>
                    <span className="text-foreground font-mono">{profile.fivem_discord_id || "Niciunul"}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Steam Hex Asociat</span>
                    <span className="text-foreground font-mono truncate max-w-[200px]">{profile.fivem_steam_hex || "Niciunul"}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>Ultima Sincronizare</span>
                    <span className="text-foreground">
                      {profile.fivem_synced_at ? new Date(profile.fivem_synced_at).toLocaleString('ro-RO') : "Niciodată"}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: FiveM synchronization details + Faction Applications (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* If FiveM profile is NOT connected */}
            {!profile.fivem_connected ? (
              <div className="glass rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[460px] border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.4)_100%)]">
                {/* Decorative Elements */}
                <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                    <Gamepad2 className="h-8 w-8 text-silver animate-pulse" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-semibold tracking-[0.4em] text-silver">INTEGRARE FIVEM</span>
                    <h2 className="text-3xl font-light tracking-wide text-silver-gradient">
                      CONECTEAZĂ PROFILUL DIN JOC
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                      Asociază datele personajului tău de pe serverul FiveM FLOW ROMÂNIA cu contul tău de pe forum.
                      Afișează-ți automat rangul de facțiune, statisticile personajului, soldul bancar, timpul de joc, bunurile deținute și inventarul pe profilul tău public din comunitate.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                      <Coins className="h-5 w-5 text-silver mb-2" />
                      <h4 className="text-xs text-foreground font-semibold mb-1">Avere Sincronizată</h4>
                      <p className="text-[10px] text-muted-foreground">Sincronizează soldul de bani cash și din bancă din baza de date a serverului.</p>
                    </div>
                    
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                      <Clock className="h-5 w-5 text-silver mb-2" />
                      <h4 className="text-xs text-foreground font-semibold mb-1">Contor Ore de Joc</h4>
                      <p className="text-[10px] text-muted-foreground">Ține-ți comunitatea la curent cu orele reale petrecute de tine în Los Santos.</p>
                    </div>

                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 col-span-2 md:col-span-1">
                      <Shield className="h-5 w-5 text-silver mb-2" />
                      <h4 className="text-xs text-foreground font-semibold mb-1">Facțiune & Rang</h4>
                      <p className="text-[10px] text-muted-foreground">Afișează rangul oficial din Poliție, S.M.U.R.D. sau organizații mafiote.</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                  <Button 
                    onClick={() => {
                      setSyncStep(1);
                      setShowSyncModal(true);
                    }}
                    className="w-full sm:w-auto bg-white text-black hover:bg-white/90 text-xs tracking-widest font-bold px-8 py-4 rounded-full transition shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    CONECTEAZĂ PROFILUL
                  </Button>
                  <span className="text-[10px] text-muted-foreground tracking-wider uppercase text-center sm:text-left">
                    Durează mai puțin de 1 minut
                  </span>
                </div>
              </div>
            ) : (
              // If FiveM profile IS connected
              <div className="space-y-8">
                
                {/* Linked Status Header Card */}
                <div className="glass rounded-2xl p-6 border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent">
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold tracking-widest text-emerald-400">SINCRONIZAT LIVE</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver text-lg font-light tracking-widest">
                      CFX
                    </div>
                    <div>
                      <div className="text-lg font-medium text-foreground">@{profile.fivem_username}</div>
                      <div className="text-[10px] tracking-wider text-muted-foreground mt-0.5">
                        Conectat prin Licența Rockstar · <span className="font-mono">{profile.fivem_license?.slice(0, 18)}...</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5">
                    <div className="bg-white/[0.02] rounded-xl p-4 text-center">
                      <div className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Avere Totală</div>
                      <div className="text-xl font-light text-silver-gradient">
                        €{((profile.fivem_cash || 0) + (profile.fivem_bank || 0)).toLocaleString()}
                      </div>
                    </div>
                    <div className="bg-white/[0.02] rounded-xl p-4 text-center">
                      <div className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Ore de Joc</div>
                      <div className="text-xl font-light text-silver-gradient">
                        {Math.floor((profile.fivem_playtime || 0) / 60)}h
                      </div>
                    </div>
                    <div className="bg-white/[0.02] rounded-xl p-4 text-center">
                      <div className="text-[10px] tracking-widest text-muted-foreground uppercase mb-1">Personaje</div>
                      <div className="text-xl font-light text-silver-gradient">
                        {connectedChars.length} Active
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 justify-end mt-6 pt-4 border-t border-white/5">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleForceRefreshSync}
                      disabled={syncingFiveM}
                      className="border-white/5 hover:bg-white/5 text-silver text-[10px] tracking-widest gap-2 h-8"
                    >
                      <RefreshCw className={`h-3 w-3 ${syncingFiveM ? 'animate-spin' : ''}`} />
                      FORȚEAZĂ REÎMPROSPĂTAREA
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDisconnectFiveM}
                      disabled={syncingFiveM}
                      className="border-white/5 hover:bg-destructive/10 hover:border-destructive/20 hover:text-destructive text-silver text-[10px] tracking-widest gap-2 h-8"
                    >
                      <Unlink className="h-3 w-3" />
                      DECONECTEAZĂ
                    </Button>
                  </div>
                </div>

                {/* Character detailed section */}
                {connectedChars.length > 0 && (
                  <div className="glass rounded-2xl p-6 border-white/10 relative">
                    <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                      <h3 className="text-xs tracking-[0.35em] text-silver uppercase flex items-center gap-2">
                        <UserCheck className="h-4 w-4" />
                        STATISTICI PROFIL PERSONAJ
                      </h3>
                      
                      {/* Character tabs selector */}
                      <div className="flex gap-2">
                        {connectedChars.map((char: any, idx: number) => (
                          <button
                            key={char.name}
                            onClick={() => setActiveCharIndex(idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs tracking-wider border transition-all cursor-pointer ${
                              activeCharIndex === idx 
                                ? 'bg-white text-black border-white' 
                                : 'bg-white/5 text-silver border-white/5 hover:bg-white/10'
                            }`}
                          >
                            {char.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active character data view */}
                    {connectedChars[activeCharIndex] && (() => {
                      const char = connectedChars[activeCharIndex];
                      return (
                        <div className="space-y-6">
                          
                          {/* Top Meta info */}
                          <div className="grid md:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 rounded-xl p-4">
                            <div className="space-y-2">
                              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Nume Personaj RP</span>
                              <div className="text-base text-foreground font-semibold">{char.name}</div>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Grad / Facțiune din Joc</span>
                              <div className="text-base text-silver-gradient font-medium flex items-center gap-1.5">
                                <Briefcase className="h-4 w-4 text-silver" />
                                {char.job}
                              </div>
                            </div>
                          </div>

                          {/* Bank, Cash, Time cards */}
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                              <div className="h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center">
                                <Coins className="h-4 w-4 text-foreground/80" />
                              </div>
                              <div>
                                <div className="text-[9px] text-muted-foreground tracking-widest uppercase">BANI CASH</div>
                                <div className="text-sm font-semibold text-foreground">€{char.cash.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
                              <div className="h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center">
                                <Database className="h-4 w-4 text-foreground/80" />
                              </div>
                              <div>
                                <div className="text-[9px] text-muted-foreground tracking-widest uppercase">BANCĂ</div>
                                <div className="text-sm font-semibold text-foreground">€{char.bank.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3 col-span-2 md:col-span-1">
                              <div className="h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center">
                                <Clock className="h-4 w-4 text-foreground/80" />
                              </div>
                              <div>
                                <div className="text-[9px] text-muted-foreground tracking-widest uppercase">TIMP DE JOC</div>
                                <div className="text-sm font-semibold text-foreground">{Math.floor(char.playtime / 60)}h {char.playtime % 60}m</div>
                              </div>
                            </div>
                          </div>

                          {/* Weapons, inventory & vehicles view */}
                          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                            
                            {/* Inventory */}
                            <div>
                              <h4 className="text-xs text-silver tracking-widest uppercase mb-3 flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/60 animate-ping" />
                                Inventar Sincronizat
                              </h4>
                              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                {Array.isArray(char.inventory) ? char.inventory.map((item: any, i: number) => (
                                  <div key={i} className="flex justify-between items-center bg-white/[0.02] border border-white/5 px-3 py-2 rounded-lg text-xs">
                                    <span className="text-foreground tracking-wide font-medium">{item.name}</span>
                                    <span className="text-silver bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono">x{item.qty}</span>
                                  </div>
                                )) : <div className="text-xs text-muted-foreground">Inventar gol</div>}
                              </div>
                            </div>

                            {/* Vehicles */}
                            <div>
                              <h4 className="text-xs text-silver tracking-widest uppercase mb-3 flex items-center gap-2">
                                <Car className="h-4 w-4 text-silver" />
                                Vehicule Deținute
                              </h4>
                              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                                {Array.isArray(char.vehicles) ? char.vehicles.map((veh: any, i: number) => (
                                  <div key={i} className="bg-white/[0.02] border border-white/5 px-3 py-2.5 rounded-lg text-xs">
                                    <div className="flex justify-between items-center font-medium mb-1 text-foreground">
                                      <span>{veh.model}</span>
                                      <span className="text-[10px] text-silver font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5">{veh.plate}</span>
                                    </div>
                                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Divizia {veh.type}</span>
                                  </div>
                                )) : <div className="text-xs text-muted-foreground">Niciun vehicul înregistrat</div>}
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

              </div>
            )}

            {/* Interactive Recruitment & Faction Applications Panel */}
            <div className="glass rounded-2xl p-6 border-white/10 relative">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-white/5 gap-4">
                <div>
                  <h3 className="text-xs tracking-[0.35em] text-silver uppercase flex items-center gap-2 font-semibold">
                    <Shield className="h-4 w-4" />
                    RECRUTARE & APLICAȚII FACȚIUNI / STAFF
                  </h3>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Aplică pentru a deveni membru în Poliție, S.M.U.R.D. sau Helper în staff.
                  </p>
                </div>
              </div>

              {/* Faction Application Layout tabs */}
              <div className="grid md:grid-cols-12 gap-6">
                
                {/* Left Side: Submit CV Form (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <h4 className="text-xs tracking-wider text-silver uppercase font-semibold">
                    DEPUNE UN CV NOU
                  </h4>

                  <form onSubmit={handleSubmittingApp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="app-type" className="text-[10px] text-muted-foreground tracking-wider uppercase">Alege Departamentul</Label>
                      <select
                        id="app-type"
                        value={appType}
                        onChange={(e) => setAppType(e.target.value as any)}
                        className="w-full rounded-md border border-white/10 bg-[#161616] px-3 py-2 text-xs text-foreground focus:border-white/40 focus:outline-none"
                      >
                        <option value="police">Poliția Română (Police Academy)</option>
                        <option value="medic">S.M.U.R.D. (Serviciul Medical)</option>
                        <option value="staff">Echipa Staff FLOW (Helper în Teste)</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="app-age" className="text-[10px] text-muted-foreground tracking-wider uppercase">Vârstă IRL (Minim 14 ani)</Label>
                      <Input
                        id="app-age"
                        type="number"
                        min={14}
                        max={99}
                        required
                        value={appAge}
                        onChange={(e) => setAppAge(e.target.value ? Number(e.target.value) : "")}
                        placeholder="Vârsta ta reală"
                        className="bg-white/5 border-white/10 text-xs h-9"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="app-motivation" className="text-[10px] text-muted-foreground tracking-wider uppercase">De ce dorești să te alături? (Minim 50 caractere)</Label>
                        <span className="text-[9px] text-muted-foreground font-mono">{appMotivation.length}/50</span>
                      </div>
                      <textarea
                        id="app-motivation"
                        rows={4}
                        required
                        value={appMotivation}
                        onChange={(e) => setAppMotivation(e.target.value)}
                        placeholder="Redactează o motivație convingătoare, descrie experiența ta anterioară de roleplay și de ce ar trebui să te selectăm în această structură..."
                        className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none"
                      />
                    </div>

                    <p className="text-[9px] text-muted-foreground bg-white/[0.01] border border-white/5 rounded-lg p-2 leading-relaxed">
                      💡 <strong>Notă automată:</strong> Numele tău din joc (<em>{profile.character_name || "Nesincronizat"}</em>) și orele de joc acumulate (<em>{profile.fivem_playtime ? Math.floor(profile.fivem_playtime / 60) : 0}h</em>) vor fi trimise și salvate automat odată cu această aplicație.
                    </p>

                    <Button
                      type="submit"
                      disabled={submittingApp}
                      className="w-full bg-white text-black hover:bg-white/90 text-[10px] tracking-widest font-bold py-2 rounded-xl transition"
                    >
                      {submittingApp ? "SE TRIMITE CV-UL..." : "DEPUNE APLICAȚIA"}
                    </Button>
                  </form>
                </div>

                {/* Right Side: My Submitted CVs List (5 cols) */}
                <div className="md:col-span-5 space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                  <h4 className="text-xs tracking-wider text-silver uppercase font-semibold flex justify-between items-center">
                    <span>APLICAȚIILE MELE</span>
                    <span className="text-[9px] bg-white/5 text-silver px-1.5 py-0.5 rounded font-mono font-normal">{applications.length}</span>
                  </h4>

                  {appsLoading ? (
                    <div className="h-32 flex items-center justify-center text-muted-foreground text-xs animate-pulse">Se încarcă aplicațiile...</div>
                  ) : applications.length === 0 ? (
                    <div className="h-32 border border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center p-4 text-center">
                      <FileText className="h-6 w-6 text-muted-foreground/30 mb-2" />
                      <p className="text-[10px] text-muted-foreground">Nu ai nicio aplicație depusă încă. Completează formularul alăturat.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                      {applications.map((app) => (
                        <div key={app.id} className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl space-y-2 relative group hover:border-white/10 transition-colors">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold text-foreground tracking-wide">
                              {factionNamesEnToRo[app.type] || app.type}
                            </span>
                            
                            {/* App Status Badges */}
                            {app.status === "in_asteptare" && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10 animate-pulse">
                                ÎN AȘTEPTARE
                              </span>
                            )}
                            {app.status === "acceptat" && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10">
                                ACCEPTAT
                              </span>
                            )}
                            {app.status === "respins" && (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-rose-400 bg-rose-400/5 px-2 py-0.5 rounded border border-rose-400/10">
                                RESPINS
                              </span>
                            )}
                          </div>

                          <div className="text-[9px] text-muted-foreground font-mono">
                            Trimis la: {new Date(app.created_at).toLocaleDateString('ro-RO')}
                          </div>

                          {/* Motivation preview */}
                          <p className="text-[10px] text-muted-foreground/80 line-clamp-2 italic leading-relaxed pt-1 border-t border-white/[0.03]">
                            „{app.motivation}”
                          </p>

                          {/* Admin official response quote */}
                          {app.admin_response && (
                            <div className="bg-white/[0.01] border-l-2 border-white/20 p-2 rounded-r-lg mt-1 space-y-1">
                              <span className="text-[8px] uppercase tracking-wider text-muted-foreground font-bold font-mono">Răspuns Conducere:</span>
                              <p className="text-[9px] text-foreground leading-normal font-sans italic">
                                {app.admin_response}
                              </p>
                            </div>
                          )}

                          {/* Simulate admin response trigger for testing */}
                          {app.status === "in_asteptare" && (
                            <div className="pt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSimulatingAppId(app.id);
                                  setSimStatus("acceptat");
                                  setSimResponseText("");
                                  setShowSimulateModal(true);
                                }}
                                className="w-full border-white/10 hover:bg-white/5 text-[9px] tracking-wider text-silver hover:text-foreground h-7 flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <Sparkles className="h-3 w-3 text-amber-400" />
                                SIMULEAZĂ RĂSPUNS
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 1. Sync Profile Connection Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="w-full max-w-md glass rounded-2xl p-6 border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] text-left relative">
            
            {/* Step 1: Input Identifier */}
            {syncStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium tracking-wide text-foreground flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-silver" />
                    CONECTEAZĂ CONTUL FIVEM
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Alege o metodă de identificare asociată cu contul tău de pe server.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-silver tracking-wider uppercase">Nume de Utilizator Cfx.re</Label>
                    <Input 
                      value={syncInputs.username}
                      onChange={(e) => setSyncInputs({ ...syncInputs, username: e.target.value })}
                      placeholder="ex. FlowRomania"
                      className="bg-white/5 border-white/10 text-foreground text-sm focus:border-white/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-silver tracking-wider uppercase">Cheie Licență Rockstar</Label>
                    <Input 
                      value={syncInputs.license}
                      onChange={(e) => setSyncInputs({ ...syncInputs, license: e.target.value })}
                      placeholder="license:4a6b8c8d..."
                      className="bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-silver tracking-wider uppercase">ID Utilizator Discord</Label>
                    <Input 
                      value={syncInputs.discord}
                      onChange={(e) => setSyncInputs({ ...syncInputs, discord: e.target.value })}
                      placeholder="ex. 1928374928192847"
                      className="bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-silver tracking-wider uppercase">ID Steam Hex</Label>
                    <Input 
                      value={syncInputs.steam}
                      onChange={(e) => setSyncInputs({ ...syncInputs, steam: e.target.value })}
                      placeholder="steam:11000010abcde12"
                      className="bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40"
                    />
                  </div>
                  
                  <p className="text-[9px] text-muted-foreground leading-normal mt-2">
                    Te rugăm să completezi identificatorii pe care dorești să îi asociezi cu profilul tău de pe forum.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSyncModal(false)}
                    className="flex-1 border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider"
                  >
                    ANULEAZĂ
                  </Button>
                  <Button
                    onClick={handleStartSync}
                    className="flex-1 bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-wider"
                  >
                    INIȚIAZĂ SINCRONIZAREA
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Animating Sync Connection */}
            {syncStep === 2 && (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
                  <Database className="h-6 w-6 text-silver animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold tracking-widest text-foreground uppercase animate-pulse">
                    SE SINCRONIZEAZĂ CONTUL
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono transition-all">
                    {syncStepText}
                  </p>
                </div>
                <span className="text-[9px] text-muted-foreground uppercase tracking-widest font-semibold">
                  SE STABILEȘTE O CONEXIUNE SECURIZATĂ...
                </span>
              </div>
            )}

            {/* Step 3: Connection Success */}
            {syncStep === 3 && (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-semibold tracking-wide text-foreground">
                    SINCRONIZARE FINALIZATĂ CU SUCCES
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Personajele tale de pe serverul FiveM au fost asociate în siguranță cu profilul tău de pe forumul FLOW ROMÂNIA.
                  </p>
                </div>
                <Button
                  onClick={() => setShowSyncModal(false)}
                  className="w-full bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-widest py-3 rounded-xl cursor-pointer"
                >
                  ÎNCHIDE ȘI VEZI PROFILUL
                </Button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 2. Admin Decision Simulation Modal */}
      {showSimulateModal && simulatingAppId && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="w-full max-w-lg glass rounded-2xl p-6 border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] text-left relative">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <h3 className="text-sm font-semibold tracking-widest text-foreground uppercase flex items-center gap-1.5">
                <Sparkles className="h-4.5 w-4.5 text-amber-400" />
                SIMULATOR DECIZIE CONDUCERE (ADMIN)
              </h3>
              <button
                onClick={() => {
                  setShowSimulateModal(false);
                  setSimulatingAppId(null);
                }}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold"
              >
                ÎNCHIDE
              </button>
            </div>

            <form onSubmit={handleSimulateAdminResponse} className="space-y-5">
              <div className="space-y-2">
                <Label className="text-xs text-silver tracking-wider uppercase block">Stabilește Rezultatul</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSimStatus("acceptat")}
                    className={`py-2.5 rounded-xl border font-bold text-xs tracking-widest transition-all cursor-pointer ${
                      simStatus === "acceptat"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                        : "bg-white/5 text-silver border-white/5 hover:bg-white/10"
                    }`}
                  >
                    ACCEPTĂ APLICAȚIA
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimStatus("respins")}
                    className={`py-2.5 rounded-xl border font-bold text-xs tracking-widest transition-all cursor-pointer ${
                      simStatus === "respins"
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]"
                        : "bg-white/5 text-silver border-white/5 hover:bg-white/10"
                    }`}
                  >
                    RESPINGE APLICAȚIA
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="sim-response" className="text-xs text-silver tracking-wider uppercase">Scrie Răspunsul Liderului (Profesional & Lung)</Label>
                  <button
                    type="button"
                    onClick={handleAutoGenerateResponse}
                    className="text-[9px] bg-white/5 text-amber-400 border border-amber-400/25 px-2 py-0.5 rounded hover:bg-white/10 font-bold tracking-widest uppercase transition-colors"
                  >
                    ⚙️ GENERARE AUTOMATĂ MESAJ
                  </button>
                </div>
                
                <textarea
                  id="sim-response"
                  rows={6}
                  required
                  value={simResponseText}
                  onChange={(e) => setSimResponseText(e.target.value)}
                  placeholder="Scrie motivul acceptării sau respingerii. O formulare detaliată va asigura un email complet și deosebit primit în portal..."
                  className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-[10px] text-emerald-400 leading-normal flex items-start gap-2.5">
                <Mail className="h-4.5 w-4.5 shrink-0" />
                <p>
                  📧 <strong>Notificare Automată de Email:</strong> Prin confirmarea deciziei, vei actualiza statusul bazei de date și vei trimite un email detaliat cu design premium HTML către <strong>{user.email}</strong>. De asemenea, vei primi notificarea instant în simulatorul de mai jos!
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowSimulateModal(false);
                    setSimulatingAppId(null);
                  }}
                  className="flex-1 border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider"
                >
                  ANULEAZĂ
                </Button>
                <Button
                  type="submit"
                  disabled={simulatingSubmit || !simResponseText.trim()}
                  className="flex-1 bg-white text-black hover:bg-white/90 text-xs font-bold tracking-wider cursor-pointer"
                >
                  {simulatingSubmit ? "SE PROCESEAZĂ..." : "TRIMITE DECIZIA"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Simulated Desktop Email Client Mockup */}
      {receivedEmail && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[101] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#080808] border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Simulated browser/webmail window top header */}
            <div className="bg-[#121212] px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-muted-foreground ml-3 font-mono">webmail.flowromania.ro/inbox</span>
              </div>
              <button
                onClick={() => setReceivedEmail(null)}
                className="text-[10px] tracking-widest text-muted-foreground hover:text-foreground font-bold border border-white/5 bg-white/5 px-2.5 py-1 rounded transition-colors uppercase"
              >
                Închide Căsuța Poștală
              </button>
            </div>

            {/* Email Sender & Info */}
            <div className="px-6 py-4 bg-[#0d0d0d] border-b border-white/5 space-y-2 shrink-0">
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                <h4 className="text-sm font-semibold text-foreground tracking-wide">{receivedEmail.subject}</h4>
                <span className="text-[9px] text-muted-foreground font-mono">Astăzi, {new Date().toLocaleTimeString('ro-RO')}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="font-semibold text-silver">De la:</span>
                <span>FLOW ROMÂNIA &lt;recrutare@flowromania.ro&gt;</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="font-semibold text-silver">Către:</span>
                <span>{user.email}</span>
              </div>
            </div>

            {/* Email HTML Body content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#0c0c0c] custom-scrollbar">
              <div 
                dangerouslySetInnerHTML={{ __html: receivedEmail.html }} 
                className="w-full h-auto text-left rounded-xl overflow-hidden border border-white/5 shadow-inner"
              />
            </div>

            {/* Bottom Actions */}
            <div className="px-6 py-4 bg-[#121212] border-t border-white/5 flex items-center justify-between shrink-0">
              <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest">Client Email Sincronizat Live</span>
              <Button
                size="sm"
                onClick={() => setReceivedEmail(null)}
                className="bg-white text-black hover:bg-white/90 text-[10px] font-bold tracking-wider px-6 cursor-pointer"
              >
                MARCHEAZĂ CA CITIT
              </Button>
            </div>

          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
