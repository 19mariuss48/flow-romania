import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { a as SiteHeader, S as SiteFooter } from "./SiteFooter-DnBv3itI.mjs";
import { B as Button } from "./button-DY0TMOSU.mjs";
import { L as Label, I as Input } from "./label-BIUJpyM6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as createServerFn } from "./server-DCcggY1z.mjs";
import "../_libs/seroval.mjs";
import { M as Mail, q as LogOut, O as User, K as Key, N as Upload, L as Lock, m as EyeOff, E as Eye, G as Gamepad2, k as Coins, j as Clock, u as Shield, R as RefreshCw, U as Unlink, Q as UserCheck, b as Briefcase, D as Database, c as Car, F as FileText, x as Sparkles, h as CircleCheckBig } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const sendApplicationEmailFn = createServerFn("POST", async (payload) => {
  const { toEmail, username, characterName, factionType, status, adminResponse } = payload;
  const factionNames = {
    police: "Poliția Română",
    medic: "S.M.U.R.D. (Medici)",
    staff: "Echipa Staff FLOW ROMÂNIA"
  };
  const factionName = factionNames[factionType] || factionType;
  const subject = status === "acceptat" ? `🎉 Felicitări! Aplicația ta pentru ${factionName} a fost ACCEPTATĂ` : `📋 Rezultat Aplicație - ${factionName}`;
  const emailHtml = `
    <div style="background-color: #0c0c0c; color: #e5e5e5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; min-height: 100%; box-sizing: border-box;">
      <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        
        <!-- Header Banner -->
        <div style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <span style="font-size: 26px; font-weight: 300; letter-spacing: 6px; color: #ffffff; text-transform: uppercase;">
            FLOW <span style="color: #a3a3a3; font-weight: 400;">ROMANIA</span>
          </span>
          <div style="font-size: 10px; letter-spacing: 4px; color: #737373; margin-top: 8px; text-transform: uppercase; font-weight: 500;">
            PORTAL COMUNITATE · RECRUTARE
          </div>
        </div>

        <!-- Main Body Content -->
        <div style="padding: 40px;">
          <h2 style="font-weight: 300; font-size: 20px; color: ${status === "acceptat" ? "#34d399" : "#f87171"}; margin-top: 0; margin-bottom: 20px; letter-spacing: 0.5px;">
            Salutare, @${username}!
          </h2>
          
          <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 16px;">
            Îți mulțumim pentru interesul manifestat față de comunitatea <strong>FLOW ROMÂNIA</strong> și pentru timpul acordat completării aplicației în vederea alăturării structurii noastre: <strong>${factionName}</strong> (pentru personajul tău de joc <em>${characterName}</em>).
          </p>
          
          <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 24px;">
            Liderii de departament și membrii din conducere au analizat cu atenție dosarul tău de recrutare, istoricul tău general de joc, orele acumulate și răspunsurile oferite în secțiunea de motivație. În urma acestei evaluări complete, statutul aplicației tale a fost actualizat în sistem:
          </p>
          
          <!-- Status Badge -->
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: ${status === "acceptat" ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)"}; 
                        color: ${status === "acceptat" ? "#34d399" : "#f87171"}; 
                        border: 1px solid ${status === "acceptat" ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}; 
                        padding: 12px 30px; border-radius: 9999px; font-weight: 600; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; display: inline-block; box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
              ${status === "acceptat" ? "🟢 Aplicație ACCEPTATĂ" : "🔴 Aplicație RESPINSĂ"}
            </div>
          </div>
          
          <!-- Admin Response Section -->
          <div style="background-color: rgba(255,255,255,0.01); border-left: 3px solid ${status === "acceptat" ? "#34d399" : "#f87171"}; padding: 20px; border-radius: 0 12px 12px 0; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03);">
            <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #a3a3a3; margin-bottom: 10px; font-weight: 600;">
              Răspunsul Oficial al Conducerii:
            </div>
            <p style="font-size: 13px; line-height: 1.6; color: #e5e5e5; margin: 0; font-style: italic; font-weight: 300;">
              „${adminResponse}”
            </p>
          </div>
          
          <!-- Next Steps -->
          ${status === "acceptat" ? `
            <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
              <h4 style="font-size: 13px; color: #ffffff; margin-top: 0; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Următorii Pași de Urmat:</h4>
              <p style="font-size: 13px; line-height: 1.6; color: #a3a3a3; margin: 0; font-weight: 300;">
                Te rugăm să te conectezi pe serverul nostru oficial de Discord și să deschizi un ticket în canalul <strong>#recrutare-${factionType}</strong>. Un membru din conducere te va prelua în cel mai scurt timp pentru a programa interviul verbal și testul practic. Asigură-te că recitești regulamentul general și cel intern înainte de testare. Succes!
              </p>
            </div>
          ` : `
            <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
              <h4 style="font-size: 13px; color: #ffffff; margin-top: 0; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Notă privind Recrutarea:</h4>
              <p style="font-size: 13px; line-height: 1.6; color: #a3a3a3; margin: 0; font-weight: 300;">
                Nu te descuraja! Îți recomandăm să iei în considerare sugestiile oferite de lideri în răspunsul de mai sus, să continui să acumulezi experiență de joc pe server și să corectezi eventualele greșeli. Vei putea depune o nouă aplicație (CV) după trecerea unei perioade de 7 zile.
              </p>
            </div>
          `}
        </div>

        <!-- Footer -->
        <div style="padding: 24px 40px; text-align: center; font-size: 9px; color: #525252; letter-spacing: 1.5px; border-top: 1px solid rgba(255,255,255,0.05); background-color: rgba(0,0,0,0.2);">
          © 2026 FLOW ROMÂNIA · TOATE DREPTURILE REZERVATE <br>
          <span style="color: #404040; font-size: 8px;">FĂRĂ AFILIERE CU ROCKSTAR GAMES SAU TAKE-TWO INTERACTIVE</span> <br>
          <div style="margin-top: 8px; color: #404040;">Acesta este un email generat automat. Te rugăm să nu răspunzi direct la acest mesaj.</div>
        </div>

      </div>
    </div>
  `;
  console.log(`[EMAIL SERVICE] Pregătit email pentru ${toEmail}`);
  console.log(`[EMAIL SERVICE] Subiect: ${subject}`);
  const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
  if (resendApiKey) {
    try {
      console.log("[EMAIL SERVICE] Se încearcă trimiterea prin Resend...");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: "FLOW ROMANIA <recrutare@flowromania.ro>",
          to: [toEmail],
          subject,
          html: emailHtml
        })
      });
      if (response.ok) {
        console.log("[EMAIL SERVICE] Email expediat cu succes prin Resend API.");
        return { success: true, method: "resend", subject, html: emailHtml };
      } else {
        const errorDetail = await response.text();
        console.error("[EMAIL SERVICE] Eroare Resend:", errorDetail);
      }
    } catch (err) {
      console.error("[EMAIL SERVICE] Excepție la expedierea prin Resend:", err);
    }
  }
  return {
    success: true,
    method: "simulated",
    subject,
    html: emailHtml
  };
});
const mockFiveMCharacters = [{
  name: "Andrei Popescu",
  job: "Poliția Română - Inspector",
  jobShort: "Agent de Poliție",
  faction: "Poliția Română",
  cash: 45e3,
  bank: 28e4,
  playtime: 7440,
  // 124 hours
  vehicles: [{
    model: "BMW M5 F90 (PD)",
    type: "Intercepție",
    plate: "B 999 MAI"
  }, {
    model: "Dacia Logan MCV (PD)",
    type: "Patrulare",
    plate: "B 112 MAI"
  }, {
    model: "Mercedes-Benz G-Class",
    type: "Personal",
    plate: "B 777 FLO"
  }],
  inventory: [{
    name: "Pistol Glock-17",
    qty: 1,
    type: "weapon"
  }, {
    name: "Insignă de Polițist #142",
    qty: 1,
    type: "item"
  }, {
    name: "Stație Emisie-Recepție",
    qty: 1,
    type: "item"
  }, {
    name: "Permis de Conducere",
    qty: 1,
    type: "card"
  }, {
    name: "Trusă Prim Ajutor",
    qty: 3,
    type: "medical"
  }, {
    name: "Apă",
    qty: 4,
    type: "food"
  }]
}, {
  name: "Vito Scaletta",
  job: "Mecanic - Șef de Atelier",
  jobShort: "Mecanic",
  faction: "Mecanici",
  cash: 12500,
  bank: 64200,
  playtime: 1920,
  // 32 hours
  vehicles: [{
    model: "Platformă Dodge Charger",
    type: "Utilitară",
    plate: "B 12 TUA"
  }, {
    model: "Nissan GT-R R35",
    type: "Personal",
    plate: "B 88 VIT"
  }],
  inventory: [{
    name: "Trusă Reparații",
    qty: 10,
    type: "item"
  }, {
    name: "Petice Anvelope",
    qty: 5,
    type: "item"
  }, {
    name: "Cheie Fixă Grea",
    qty: 1,
    type: "tool"
  }, {
    name: "Permis de Conducere",
    qty: 1,
    type: "card"
  }, {
    name: "Sandviș",
    qty: 2,
    type: "food"
  }, {
    name: "Băutură Energizantă",
    qty: 3,
    type: "food"
  }]
}];
function ProfilePage() {
  const navigate = useNavigate();
  const {
    user,
    loading: authLoading,
    signOut
  } = useAuth();
  const [profile, setProfile] = reactExports.useState(null);
  const [profileLoading, setProfileLoading] = reactExports.useState(true);
  const [updatingProfile, setUpdatingProfile] = reactExports.useState(false);
  const [syncingFiveM, setSyncingFiveM] = reactExports.useState(false);
  const [displayName, setDisplayName] = reactExports.useState("");
  const [bio, setBio] = reactExports.useState("");
  const [charName, setCharName] = reactExports.useState("");
  const [faction, setFaction] = reactExports.useState("");
  const [avatarUrl, setAvatarUrl] = reactExports.useState("");
  const [uploadingPhoto, setUploadingPhoto] = reactExports.useState(false);
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [updatingPassword, setUpdatingPassword] = reactExports.useState(false);
  const [showNewPassword, setShowNewPassword] = reactExports.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = reactExports.useState(false);
  const [applications, setApplications] = reactExports.useState([]);
  const [appsLoading, setAppsLoading] = reactExports.useState(true);
  const [submittingApp, setSubmittingApp] = reactExports.useState(false);
  const [appType, setAppType] = reactExports.useState("police");
  const [appAge, setAppAge] = reactExports.useState("");
  const [appMotivation, setAppMotivation] = reactExports.useState("");
  const [showSimulateModal, setShowSimulateModal] = reactExports.useState(false);
  const [simulatingAppId, setSimulatingAppId] = reactExports.useState(null);
  const [simStatus, setSimStatus] = reactExports.useState("acceptat");
  const [simResponseText, setSimResponseText] = reactExports.useState("");
  const [simulatingSubmit, setSimulatingSubmit] = reactExports.useState(false);
  const [receivedEmail, setReceivedEmail] = reactExports.useState(null);
  const [showSyncModal, setShowSyncModal] = reactExports.useState(false);
  const [syncStep, setSyncStep] = reactExports.useState(1);
  const [syncInputs, setSyncInputs] = reactExports.useState({
    username: "",
    license: "",
    discord: "",
    steam: ""
  });
  const [syncStepText, setSyncStepText] = reactExports.useState("");
  const [activeCharIndex, setActiveCharIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      navigate({
        to: "/auth"
      });
    }
  }, [user, authLoading, navigate]);
  const fetchProfile = async () => {
    if (!user) return;
    try {
      setProfileLoading(true);
      const {
        data,
        error
      } = await supabase.from("profiles").select(`
          id, username, display_name, avatar_url, character_name, faction, reputation, bio,
          fivem_connected, fivem_username, fivem_license, fivem_discord_id, fivem_steam_hex,
          fivem_cash, fivem_bank, fivem_job, fivem_playtime, fivem_character_data, fivem_synced_at
        `).eq("id", user.id).single();
      if (error) throw error;
      const dbProfile = {
        id: data.id,
        username: data.username,
        display_name: data.display_name,
        avatar_url: data.avatar_url,
        character_name: data.character_name,
        faction: data.faction,
        reputation: data.reputation || 0,
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
        fivem_synced_at: data.fivem_synced_at ?? null
      };
      if (!dbProfile.fivem_connected && typeof window !== "undefined") {
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
      if (typeof window !== "undefined") {
        const localAvatar = localStorage.getItem(`flowro_avatar_${user.id}`);
        setAvatarUrl(localAvatar || dbProfile.avatar_url || "");
      } else {
        setAvatarUrl(dbProfile.avatar_url || "");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      const mockProfile = {
        id: user.id,
        username: user.email?.split("@")[0] || "jucator",
        display_name: user.email?.split("@")[0] || "Jucător",
        avatar_url: localStorage.getItem(`flowro_avatar_${user.id}`) || "",
        reputation: 0,
        fivem_connected: false
      };
      setProfile(mockProfile);
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
      const {
        data,
        error
      } = await supabase.from("applications").select("*").eq("user_id", user.id).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.warn("Failed to fetch applications:", err);
    } finally {
      setAppsLoading(false);
    }
  };
  reactExports.useEffect(() => {
    if (user) {
      fetchProfile();
      fetchApplications();
    }
  }, [user]);
  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Fotografia de profil trebuie să fie mai mică de 5MB.");
      return;
    }
    setUploadingPhoto(true);
    const toastId = toast.loading("Se procesează fotografia de profil...");
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      const {
        data,
        error
      } = await supabase.storage.from("avatars").upload(filePath, file, {
        upsert: true
      });
      if (error) {
        throw error;
      }
      const {
        data: {
          publicUrl
        }
      } = supabase.storage.from("avatars").getPublicUrl(filePath);
      setAvatarUrl(publicUrl);
      toast.success("Fotografia de profil a fost încărcată cu succes!", {
        id: toastId
      });
    } catch (err) {
      console.warn("Storage bucket upload failed, falling back to base64 encoding:", err);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64Url = uploadEvent.target?.result;
        setAvatarUrl(base64Url);
        toast.success("Fotografia de profil a fost actualizată!", {
          id: toastId
        });
      };
      reader.onerror = () => {
        toast.error("Eroare la citirea fișierului imagine.", {
          id: toastId
        });
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingPhoto(false);
    }
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;
    setUpdatingProfile(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(`flowro_avatar_${user.id}`, avatarUrl);
      }
      const {
        error
      } = await supabase.from("profiles").update({
        display_name: displayName,
        bio,
        character_name: charName,
        faction,
        avatar_url: avatarUrl,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", user.id);
      if (error) throw error;
      toast.success("Profilul a fost actualizat cu succes!");
      fetchProfile();
    } catch (err) {
      toast.error(err.message || "Eroare la actualizarea profilului.");
    } finally {
      setUpdatingProfile(false);
    }
  };
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      return toast.error("Parola trebuie să aibă cel puțin 8 caractere.");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Parolele introduse nu coincid.");
    }
    setUpdatingPassword(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      toast.success("Parola a fost actualizată cu succes!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.message || "Eroare la actualizarea parolei.");
    } finally {
      setUpdatingPassword(false);
    }
  };
  const handleSubmittingApp = async (e) => {
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
      const {
        error
      } = await supabase.from("applications").insert({
        user_id: user.id,
        type: appType,
        character_name: charNameValue,
        age: Number(appAge),
        playtime_hours: hours,
        motivation: appMotivation,
        status: "in_asteptare"
      });
      if (error) throw error;
      toast.success("Aplicația ta a fost înregistrată cu succes în stare: În așteptare.");
      setAppAge("");
      setAppMotivation("");
      fetchApplications();
    } catch (err) {
      toast.error(err.message || "Eroare la depunerea aplicației.");
    } finally {
      setSubmittingApp(false);
    }
  };
  const handleSimulateAdminResponse = async (e) => {
    e.preventDefault();
    if (!user || !simulatingAppId || !simResponseText.trim()) return;
    setSimulatingSubmit(true);
    try {
      const app = applications.find((a) => a.id === simulatingAppId);
      if (!app) throw new Error("Aplicația nu a fost găsită.");
      const {
        error
      } = await supabase.from("applications").update({
        status: simStatus,
        admin_response: simResponseText,
        updated_at: (/* @__PURE__ */ new Date()).toISOString()
      }).eq("id", simulatingAppId);
      if (error) throw error;
      toast.success(`Aplicația a fost ${simStatus === "acceptat" ? "ACCEPTATĂ" : "RESPINSĂ"}! Se trimite email-ul...`);
      const result = await sendApplicationEmailFn({
        toEmail: user.email,
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
    } catch (err) {
      toast.error(err.message || "Eroare la simularea răspunsului.");
    } finally {
      setSimulatingSubmit(false);
    }
  };
  const handleAutoGenerateResponse = () => {
    const app = applications.find((a) => a.id === simulatingAppId);
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
            const fUsername = syncInputs.username || `Cfx_${Math.random().toString(36).substring(2, 8)}`;
            const fLicense = syncInputs.license || `license:cfx_${Math.random().toString(36).substring(2, 12)}`;
            const fDiscord = syncInputs.discord || `382${Math.floor(1e8 + Math.random() * 9e8)}`;
            const fSteam = syncInputs.steam || `steam:1100001${Math.random().toString(16).substring(2, 10)}`;
            const primaryChar = mockFiveMCharacters[0];
            try {
              const {
                error
              } = await supabase.from("profiles").update({
                fivem_connected: true,
                fivem_username: fUsername,
                fivem_license: fLicense,
                fivem_discord_id: fDiscord,
                fivem_steam_hex: fSteam,
                fivem_cash: mockFiveMCharacters.reduce((acc, char) => acc + char.cash, 0),
                fivem_bank: mockFiveMCharacters.reduce((acc, char) => acc + char.bank, 0),
                fivem_job: primaryChar.jobShort,
                fivem_playtime: mockFiveMCharacters.reduce((acc, char) => acc + char.playtime, 0),
                fivem_character_data: mockFiveMCharacters,
                character_name: primaryChar.name,
                faction: primaryChar.faction,
                fivem_synced_at: (/* @__PURE__ */ new Date()).toISOString()
              }).eq("id", user.id);
              if (error) throw error;
              setSyncStep(3);
              toast.success("Profilul FiveM a fost conectat cu succes!");
              fetchProfile();
            } catch (err) {
              console.warn("Could not write sync to Supabase (columns might be missing). Saving to browser local storage instead.", err);
              if (typeof window !== "undefined") {
                const syncData = {
                  fivem_connected: true,
                  fivem_username: fUsername,
                  fivem_license: fLicense,
                  fivem_discord_id: fDiscord,
                  fivem_steam_hex: fSteam,
                  fivem_cash: mockFiveMCharacters.reduce((acc, char) => acc + char.cash, 0),
                  fivem_bank: mockFiveMCharacters.reduce((acc, char) => acc + char.bank, 0),
                  fivem_job: primaryChar.jobShort,
                  fivem_playtime: mockFiveMCharacters.reduce((acc, char) => acc + char.playtime, 0),
                  fivem_character_data: mockFiveMCharacters,
                  character_name: primaryChar.name,
                  faction: primaryChar.faction,
                  fivem_synced_at: (/* @__PURE__ */ new Date()).toISOString()
                };
                localStorage.setItem(`flowro_fivem_sync_${user.id}`, JSON.stringify(syncData));
              }
              setSyncStep(3);
              toast.success("Profilul FiveM a fost conectat cu succes (Cache local)!");
              fetchProfile();
            }
          }, 1e3);
        }, 1e3);
      }, 1e3);
    }, 1e3);
  };
  const handleDisconnectFiveM = async () => {
    if (!window.confirm("Ești sigur că vrei să deconectezi profilul FiveM? Datele din joc vor rămâne în siguranță, dar nu vor mai fi afișate pe forum.")) return;
    setSyncingFiveM(true);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(`flowro_fivem_sync_${user.id}`);
      }
      const {
        error
      } = await supabase.from("profiles").update({
        fivem_connected: false,
        fivem_username: null,
        fivem_license: null,
        fivem_discord_id: null,
        fivem_steam_hex: null,
        fivem_cash: 0,
        fivem_bank: 0,
        fivem_job: null,
        fivem_playtime: 0,
        fivem_character_data: [],
        fivem_synced_at: null
      }).eq("id", user.id);
      if (error) throw error;
      toast.success("Profilul FiveM a fost deconectat.");
      fetchProfile();
    } catch (err) {
      toast.success("Profilul FiveM a fost deconectat.");
      fetchProfile();
    } finally {
      setSyncingFiveM(false);
    }
  };
  const handleForceRefreshSync = () => {
    setSyncingFiveM(true);
    toast.loading("Se interoghează serverul de joc FiveM...", {
      id: "refresh-sync"
    });
    setTimeout(async () => {
      try {
        if (typeof window !== "undefined") {
          const localSync = localStorage.getItem(`flowro_fivem_sync_${user.id}`);
          if (localSync) {
            const parsed = JSON.parse(localSync);
            parsed.fivem_synced_at = (/* @__PURE__ */ new Date()).toISOString();
            localStorage.setItem(`flowro_fivem_sync_${user.id}`, JSON.stringify(parsed));
          }
        }
        const {
          error
        } = await supabase.from("profiles").update({
          fivem_synced_at: (/* @__PURE__ */ new Date()).toISOString()
        }).eq("id", user.id);
        if (error) throw error;
        toast.success("Datele profilului FiveM au fost reîmprospătate!", {
          id: "refresh-sync"
        });
        fetchProfile();
      } catch (err) {
        toast.success("Datele profilului FiveM au fost reîmprospătate!", {
          id: "refresh-sync"
        });
        fetchProfile();
      } finally {
        setSyncingFiveM(false);
      }
    }, 1500);
  };
  if (authLoading || profileLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-t-2 border-white animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-2 rounded-full border-b-2 border-white/20 animate-spin", style: {
            animationDirection: "reverse"
          } })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-[0.3em] text-silver animate-pulse", children: "SE CONECTEAZĂ LA BAZA DE DATE..." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
    ] });
  }
  if (!user || !profile) {
    return null;
  }
  const connectedChars = Array.isArray(profile.fivem_character_data) ? profile.fivem_character_data : [];
  const factionNamesEnToRo = {
    police: "Poliția Română",
    medic: "S.M.U.R.D. (Medici)",
    staff: "Echipa Staff (Helper/Admin)"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0B0B0B] text-foreground flex flex-col justify-between relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.04),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,255,255,0.02),transparent_70%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 max-w-7xl w-full mx-auto px-6 pt-32 pb-24 relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between mb-12 pb-6 border-b border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] text-silver uppercase", children: "PROFIL JUCĂTOR" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.4em] text-muted-foreground", children: "FLOW ROMÂNIA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-3xl md:text-5xl font-light tracking-[0.1em] text-silver-gradient", children: [
            "BINE AI VENIT, ",
            profile.display_name || profile.username
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 md:mt-0 flex gap-3", children: [
          receivedEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => setReceivedEmail(null), className: "border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 text-xs tracking-widest gap-2 animate-bounce", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3.5 w-3.5" }),
            "VEZI EMAIL NOU"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", onClick: () => signOut(), className: "border-white/5 hover:bg-white/5 text-silver text-xs tracking-widest gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-3 w-3" }),
            "DECONECTARE"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-12 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-6 opacity-5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-32 w-32" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xs tracking-[0.3em] text-silver mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-white" }),
              "DETALII CONT FORUM"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-email", className: "text-xs text-muted-foreground tracking-wider uppercase", children: "Adresă de Email" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-email", type: "text", value: user.email, disabled: true, className: "bg-white/[0.02] border-white/5 text-muted-foreground pl-10 cursor-not-allowed text-sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground block", children: "Adresa ta de email înregistrată pe care o folosești la conectare." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-username", className: "text-xs text-muted-foreground tracking-wider uppercase", children: "Nume de Utilizator în Sistem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-username", type: "text", value: profile.username, disabled: true, className: "bg-white/[0.02] border-white/5 text-muted-foreground pl-10 cursor-not-allowed text-sm" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "absolute left-3.5 top-3 h-4 w-4 text-muted-foreground/60" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 bg-white/[0.01] border border-white/5 rounded-xl p-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-silver tracking-wider uppercase", children: "Fotografie de Profil" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative group h-16 w-16 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center", children: avatarUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: avatarUrl, alt: "Preview", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-8 w-8 text-silver/40" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-avatar", type: "text", value: avatarUrl, onChange: (e) => setAvatarUrl(e.target.value), placeholder: "Lipește URL-ul imaginii", className: "bg-white/5 border-white/10 text-foreground focus:border-white/40 text-xs h-8 flex-1" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "photo-upload-input", className: `h-8 px-3 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 text-silver hover:text-foreground text-[10px] tracking-wider font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${uploadingPhoto ? "opacity-50 pointer-events-none" : ""}`, children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3" }),
                        uploadingPhoto ? "..." : "ÎNCARCĂ"
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "photo-upload-input", type: "file", accept: "image/*", onChange: handlePhotoUpload, className: "hidden" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground block", children: "Introdu un URL public al imaginii sau încarcă un fișier de pe PC." })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1 items-center", children: [
                  [{
                    name: "Agent 1",
                    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  }, {
                    name: "Agent 2",
                    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
                  }, {
                    name: "Agent 3",
                    url: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80"
                  }, {
                    name: "Agent 4",
                    url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80"
                  }].map((preset, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setAvatarUrl(preset.url), className: `h-8 w-8 rounded-full overflow-hidden border transition-all ${avatarUrl === preset.url ? "border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.3)]" : "border-white/10 hover:border-white/40"}`, title: `Selectează Preset ${idx + 1}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preset.url, alt: preset.name, className: "h-full w-full object-cover" }) }, idx)),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setAvatarUrl(""), className: "text-[9px] text-muted-foreground hover:text-foreground transition-colors ml-auto underline", children: "Șterge" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-display", className: "text-xs text-silver tracking-wider uppercase", children: "Nume Afișat pe Forum" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-display", type: "text", value: displayName, onChange: (e) => setDisplayName(e.target.value), placeholder: "Introdu numele tău afișat", className: "bg-white/5 border-white/10 text-foreground focus:border-white/40 text-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-bio", className: "text-xs text-silver tracking-wider uppercase", children: "Biografie / Descriere" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "prof-bio", rows: 3, value: bio, onChange: (e) => setBio(e.target.value), placeholder: "Spune-le cetățenilor FLOW România câteva cuvinte despre tine...", className: "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-white/40 focus:outline-none" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-charname", className: "text-xs text-silver tracking-wider uppercase", children: "Nume Personaj RP" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-charname", type: "text", value: charName, onChange: (e) => setCharName(e.target.value), placeholder: "ex. Andrei Popescu", className: "bg-white/5 border-white/10 text-foreground text-sm" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-faction", className: "text-xs text-silver tracking-wider uppercase", children: "Facțiune / Grup" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-faction", type: "text", value: faction, onChange: (e) => setFaction(e.target.value), placeholder: "ex. Poliția Română", className: "bg-white/5 border-white/10 text-foreground text-sm" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-white/5 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground tracking-wider", children: "REPUTAȚIE COMUNITATE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-light text-silver-gradient", children: [
                    profile.reputation,
                    " REP"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: updatingProfile, className: "bg-white text-black hover:bg-white/90 text-xs tracking-widest font-semibold px-6 py-2 rounded-full transition", children: updatingProfile ? "SE SALVEAZĂ..." : "SALVEAZĂ MODIFICĂRILE" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-6 opacity-5 pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-32 w-32" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xs tracking-[0.3em] text-silver mb-6 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-white" }),
              "SECURITATE CONT / SCHIMBĂ PAROLA"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleUpdatePassword, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-new-pw", className: "text-xs text-muted-foreground tracking-wider uppercase", children: "Noua Parolă" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-new-pw", type: showNewPassword ? "text" : "password", required: true, minLength: 8, value: newPassword, onChange: (e) => setNewPassword(e.target.value), placeholder: "Minim 8 caractere", className: "bg-white/5 border-white/10 text-foreground pr-10 text-sm focus:border-white/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowNewPassword(!showNewPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center", children: showNewPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "prof-confirm-pw", className: "text-xs text-muted-foreground tracking-wider uppercase", children: "Confirmă Noua Parolă" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "prof-confirm-pw", type: showConfirmPassword ? "text" : "password", required: true, minLength: 8, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Reintroduce parola", className: "bg-white/5 border-white/10 text-foreground pr-10 text-sm focus:border-white/40" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowConfirmPassword(!showConfirmPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center", children: showConfirmPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-white/5 flex items-center justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: updatingPassword, className: "bg-white text-black hover:bg-white/90 text-xs tracking-widest font-semibold px-6 py-2 rounded-full transition", children: updatingPassword ? "SE SCHIMBĂ..." : "SCHIMBĂ PAROLA" }) })
            ] })
          ] }),
          profile.fivem_connected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs tracking-[0.35em] text-silver mb-4 uppercase font-semibold", children: "DETALII SINCRONIZARE" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Nume Profil Sincronizat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
                  "@",
                  profile.fivem_username
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Licență Rockstar" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono truncate max-w-[200px]", children: profile.fivem_license })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "ID Discord Asociat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono", children: profile.fivem_discord_id || "Niciunul" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between border-b border-white/5 pb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Steam Hex Asociat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-mono truncate max-w-[200px]", children: profile.fivem_steam_hex || "Niciunul" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Ultima Sincronizare" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: profile.fivem_synced_at ? new Date(profile.fivem_synced_at).toLocaleString("ro-RO") : "Niciodată" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-7 space-y-8", children: [
          !profile.fivem_connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[460px] border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.4)_100%)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[-50px] right-[-50px] w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl shadow-[0_0_40px_rgba(255,255,255,0.05)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-8 w-8 text-silver animate-pulse" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold tracking-[0.4em] text-silver", children: "INTEGRARE FIVEM" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-light tracking-wide text-silver-gradient", children: "CONECTEAZĂ PROFILUL DIN JOC" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-xl", children: "Asociază datele personajului tău de pe serverul FiveM FLOW ROMÂNIA cu contul tău de pe forum. Afișează-ți automat rangul de facțiune, statisticile personajului, soldul bancar, timpul de joc, bunurile deținute și inventarul pe profilul tău public din comunitate." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4 pt-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] border border-white/5 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-5 w-5 text-silver mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs text-foreground font-semibold mb-1", children: "Avere Sincronizată" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Sincronizează soldul de bani cash și din bancă din baza de date a serverului." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] border border-white/5 rounded-xl p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-silver mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs text-foreground font-semibold mb-1", children: "Contor Ore de Joc" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Ține-ți comunitatea la curent cu orele reale petrecute de tine în Los Santos." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] border border-white/5 rounded-xl p-4 col-span-2 md:col-span-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-5 w-5 text-silver mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs text-foreground font-semibold mb-1", children: "Facțiune & Rang" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Afișează rangul oficial din Poliție, S.M.U.R.D. sau organizații mafiote." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
                setSyncStep(1);
                setShowSyncModal(true);
              }, className: "w-full sm:w-auto bg-white text-black hover:bg-white/90 text-xs tracking-widest font-bold px-8 py-4 rounded-full transition shadow-[0_0_30px_rgba(255,255,255,0.2)] cursor-pointer", children: "CONECTEAZĂ PROFILUL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground tracking-wider uppercase text-center sm:text-left", children: "Durează mai puțin de 1 minut" })
            ] })
          ] }) : (
            // If FiveM profile IS connected
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.1)]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold tracking-widest text-emerald-400", children: "SINCRONIZAT LIVE" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-silver text-lg font-light tracking-widest", children: "CFX" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-lg font-medium text-foreground", children: [
                      "@",
                      profile.fivem_username
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] tracking-wider text-muted-foreground mt-0.5", children: [
                      "Conectat prin Licența Rockstar · ",
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
                        profile.fivem_license?.slice(0, 18),
                        "..."
                      ] })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground uppercase mb-1", children: "Avere Totală" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-light text-silver-gradient", children: [
                      "€",
                      ((profile.fivem_cash || 0) + (profile.fivem_bank || 0)).toLocaleString()
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground uppercase mb-1", children: "Ore de Joc" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-light text-silver-gradient", children: [
                      Math.floor((profile.fivem_playtime || 0) / 60),
                      "h"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] rounded-xl p-4 text-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-widest text-muted-foreground uppercase mb-1", children: "Personaje" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xl font-light text-silver-gradient", children: [
                      connectedChars.length,
                      " Active"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end mt-6 pt-4 border-t border-white/5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleForceRefreshSync, disabled: syncingFiveM, className: "border-white/5 hover:bg-white/5 text-silver text-[10px] tracking-widest gap-2 h-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `h-3 w-3 ${syncingFiveM ? "animate-spin" : ""}` }),
                    "FORȚEAZĂ REÎMPROSPĂTAREA"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleDisconnectFiveM, disabled: syncingFiveM, className: "border-white/5 hover:bg-destructive/10 hover:border-destructive/20 hover:text-destructive text-silver text-[10px] tracking-widest gap-2 h-8", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Unlink, { className: "h-3 w-3" }),
                    "DECONECTEAZĂ"
                  ] })
                ] })
              ] }),
              connectedChars.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 border-white/10 relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6 border-b border-white/5 pb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs tracking-[0.35em] text-silver uppercase flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "h-4 w-4" }),
                    "STATISTICI PROFIL PERSONAJ"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: connectedChars.map((char, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setActiveCharIndex(idx), className: `px-3 py-1.5 rounded-lg text-xs tracking-wider border transition-all cursor-pointer ${activeCharIndex === idx ? "bg-white text-black border-white" : "bg-white/5 text-silver border-white/5 hover:bg-white/10"}`, children: char.name }, char.name)) })
                ] }),
                connectedChars[activeCharIndex] && (() => {
                  const char = connectedChars[activeCharIndex];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 bg-white/[0.01] border border-white/5 rounded-xl p-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Nume Personaj RP" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-base text-foreground font-semibold", children: char.name })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: "Grad / Facțiune din Joc" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-base text-silver-gradient font-medium flex items-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4 text-silver" }),
                          char.job
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-4", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Coins, { className: "h-4 w-4 text-foreground/80" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground tracking-widest uppercase", children: "BANI CASH" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground", children: [
                            "€",
                            char.cash.toLocaleString()
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex items-center gap-3", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-4 w-4 text-foreground/80" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground tracking-widest uppercase", children: "BANCĂ" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground", children: [
                            "€",
                            char.bank.toLocaleString()
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/5 rounded-xl p-4 flex items-center gap-3 col-span-2 md:col-span-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 bg-white/5 border border-white/5 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-foreground/80" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground tracking-widest uppercase", children: "TIMP DE JOC" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-semibold text-foreground", children: [
                            Math.floor(char.playtime / 60),
                            "h ",
                            char.playtime % 60,
                            "m"
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6 pt-4 border-t border-white/5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs text-silver tracking-widest uppercase mb-3 flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-white/60 animate-ping" }),
                          "Inventar Sincronizat"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar", children: Array.isArray(char.inventory) ? char.inventory.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center bg-white/[0.02] border border-white/5 px-3 py-2 rounded-lg text-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground tracking-wide font-medium", children: item.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-silver bg-white/5 px-2 py-0.5 rounded border border-white/5 font-mono", children: [
                            "x",
                            item.qty
                          ] })
                        ] }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Inventar gol" }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs text-silver tracking-widest uppercase mb-3 flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Car, { className: "h-4 w-4 text-silver" }),
                          "Vehicule Deținute"
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-[220px] overflow-y-auto pr-2", children: Array.isArray(char.vehicles) ? char.vehicles.map((veh, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] border border-white/5 px-3 py-2.5 rounded-lg text-xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center font-medium mb-1 text-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: veh.model }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-silver font-mono bg-white/5 px-1.5 py-0.5 rounded border border-white/5", children: veh.plate })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest", children: [
                            "Divizia ",
                            veh.type
                          ] })
                        ] }, i)) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Niciun vehicul înregistrat" }) })
                      ] })
                    ] })
                  ] });
                })()
              ] })
            ] })
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 border-white/10 relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-white/5 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-xs tracking-[0.35em] text-silver uppercase flex items-center gap-2 font-semibold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-4 w-4" }),
                "RECRUTARE & APLICAȚII FACȚIUNI / STAFF"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: "Aplică pentru a deveni membru în Poliție, S.M.U.R.D. sau Helper în staff." })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-7 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs tracking-wider text-silver uppercase font-semibold", children: "DEPUNE UN CV NOU" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmittingApp, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "app-type", className: "text-[10px] text-muted-foreground tracking-wider uppercase", children: "Alege Departamentul" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "app-type", value: appType, onChange: (e) => setAppType(e.target.value), className: "w-full rounded-md border border-white/10 bg-[#161616] px-3 py-2 text-xs text-foreground focus:border-white/40 focus:outline-none", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "police", children: "Poliția Română (Police Academy)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "medic", children: "S.M.U.R.D. (Serviciul Medical)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "staff", children: "Echipa Staff FLOW (Helper în Teste)" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "app-age", className: "text-[10px] text-muted-foreground tracking-wider uppercase", children: "Vârstă IRL (Minim 14 ani)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "app-age", type: "number", min: 14, max: 99, required: true, value: appAge, onChange: (e) => setAppAge(e.target.value ? Number(e.target.value) : ""), placeholder: "Vârsta ta reală", className: "bg-white/5 border-white/10 text-xs h-9" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "app-motivation", className: "text-[10px] text-muted-foreground tracking-wider uppercase", children: "De ce dorești să te alături? (Minim 50 caractere)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground font-mono", children: [
                        appMotivation.length,
                        "/50"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "app-motivation", rows: 4, required: true, value: appMotivation, onChange: (e) => setAppMotivation(e.target.value), placeholder: "Redactează o motivație convingătoare, descrie experiența ta anterioară de roleplay și de ce ar trebui să te selectăm în această structură...", className: "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground bg-white/[0.01] border border-white/5 rounded-lg p-2 leading-relaxed", children: [
                    "💡 ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Notă automată:" }),
                    " Numele tău din joc (",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("em", { children: profile.character_name || "Nesincronizat" }),
                    ") și orele de joc acumulate (",
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("em", { children: [
                      profile.fivem_playtime ? Math.floor(profile.fivem_playtime / 60) : 0,
                      "h"
                    ] }),
                    ") vor fi trimise și salvate automat odată cu această aplicație."
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submittingApp, className: "w-full bg-white text-black hover:bg-white/90 text-[10px] tracking-widest font-bold py-2 rounded-xl transition", children: submittingApp ? "SE TRIMITE CV-UL..." : "DEPUNE APLICAȚIA" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5 space-y-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs tracking-wider text-silver uppercase font-semibold flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "APLICAȚIILE MELE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] bg-white/5 text-silver px-1.5 py-0.5 rounded font-mono font-normal", children: applications.length })
                ] }),
                appsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center text-muted-foreground text-xs animate-pulse", children: "Se încarcă aplicațiile..." }) : applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-32 border border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center p-4 text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-muted-foreground/30 mb-2" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Nu ai nicio aplicație depusă încă. Completează formularul alăturat." })
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[380px] overflow-y-auto pr-1", children: applications.map((app) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.02] border border-white/5 p-3.5 rounded-xl space-y-2 relative group hover:border-white/10 transition-colors", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-foreground tracking-wide", children: factionNamesEnToRo[app.type] || app.type }),
                    app.status === "in_asteptare" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-400/10 animate-pulse", children: "ÎN AȘTEPTARE" }),
                    app.status === "acceptat" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-emerald-400 bg-emerald-400/5 px-2 py-0.5 rounded border border-emerald-400/10", children: "ACCEPTAT" }),
                    app.status === "respins" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-rose-400 bg-rose-400/5 px-2 py-0.5 rounded border border-rose-400/10", children: "RESPINS" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[9px] text-muted-foreground font-mono", children: [
                    "Trimis la: ",
                    new Date(app.created_at).toLocaleDateString("ro-RO")
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground/80 line-clamp-2 italic leading-relaxed pt-1 border-t border-white/[0.03]", children: [
                    "„",
                    app.motivation,
                    "”"
                  ] }),
                  app.admin_response && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white/[0.01] border-l-2 border-white/20 p-2 rounded-r-lg mt-1 space-y-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[8px] uppercase tracking-wider text-muted-foreground font-bold font-mono", children: "Răspuns Conducere:" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-foreground leading-normal font-sans italic", children: app.admin_response })
                  ] }),
                  app.status === "in_asteptare" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => {
                    setSimulatingAppId(app.id);
                    setSimStatus("acceptat");
                    setSimResponseText("");
                    setShowSimulateModal(true);
                  }, className: "w-full border-white/10 hover:bg-white/5 text-[9px] tracking-wider text-silver hover:text-foreground h-7 flex items-center justify-center gap-1 cursor-pointer", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3 w-3 text-amber-400" }),
                    "SIMULEAZĂ RĂSPUNS"
                  ] }) })
                ] }, app.id)) })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    showSyncModal && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md glass rounded-2xl p-6 border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] text-left relative", children: [
      syncStep === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-lg font-medium tracking-wide text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gamepad2, { className: "h-5 w-5 text-silver" }),
            "CONECTEAZĂ CONTUL FIVEM"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Alege o metodă de identificare asociată cu contul tău de pe server." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-silver tracking-wider uppercase", children: "Nume de Utilizator Cfx.re" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: syncInputs.username, onChange: (e) => setSyncInputs({
              ...syncInputs,
              username: e.target.value
            }), placeholder: "ex. FlowRomania", className: "bg-white/5 border-white/10 text-foreground text-sm focus:border-white/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-silver tracking-wider uppercase", children: "Cheie Licență Rockstar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: syncInputs.license, onChange: (e) => setSyncInputs({
              ...syncInputs,
              license: e.target.value
            }), placeholder: "license:4a6b8c8d...", className: "bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-silver tracking-wider uppercase", children: "ID Utilizator Discord" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: syncInputs.discord, onChange: (e) => setSyncInputs({
              ...syncInputs,
              discord: e.target.value
            }), placeholder: "ex. 1928374928192847", className: "bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-silver tracking-wider uppercase", children: "ID Steam Hex" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: syncInputs.steam, onChange: (e) => setSyncInputs({
              ...syncInputs,
              steam: e.target.value
            }), placeholder: "steam:11000010abcde12", className: "bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground leading-normal mt-2", children: "Te rugăm să completezi identificatorii pe care dorești să îi asociezi cu profilul tău de pe forum." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => setShowSyncModal(false), className: "flex-1 border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider", children: "ANULEAZĂ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleStartSync, className: "flex-1 bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-wider", children: "INIȚIAZĂ SINCRONIZAREA" })
        ] })
      ] }),
      syncStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-8 flex flex-col items-center justify-center text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16 flex items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-t-2 border-white animate-spin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "h-6 w-6 text-silver animate-pulse" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold tracking-widest text-foreground uppercase animate-pulse", children: "SE SINCRONIZEAZĂ CONTUL" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono transition-all", children: syncStepText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground uppercase tracking-widest font-semibold", children: "SE STABILEȘTE O CONEXIUNE SECURIZATĂ..." })
      ] }),
      syncStep === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-6 flex flex-col items-center justify-center text-center space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-8 w-8" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-base font-semibold tracking-wide text-foreground", children: "SINCRONIZARE FINALIZATĂ CU SUCCES" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed", children: "Personajele tale de pe serverul FiveM au fost asociate în siguranță cu profilul tău de pe forumul FLOW ROMÂNIA." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setShowSyncModal(false), className: "w-full bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-widest py-3 rounded-xl cursor-pointer", children: "ÎNCHIDE ȘI VEZI PROFILUL" })
      ] })
    ] }) }),
    showSimulateModal && simulatingAppId && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg glass rounded-2xl p-6 border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.05)] text-left relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 pb-2 border-b border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-widest text-foreground uppercase flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4.5 w-4.5 text-amber-400" }),
          "SIMULATOR DECIZIE CONDUCERE (ADMIN)"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setShowSimulateModal(false);
          setSimulatingAppId(null);
        }, className: "text-xs text-muted-foreground hover:text-foreground transition-colors font-semibold", children: "ÎNCHIDE" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSimulateAdminResponse, className: "space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-silver tracking-wider uppercase block", children: "Stabilește Rezultatul" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSimStatus("acceptat"), className: `py-2.5 rounded-xl border font-bold text-xs tracking-widest transition-all cursor-pointer ${simStatus === "acceptat" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]" : "bg-white/5 text-silver border-white/5 hover:bg-white/10"}`, children: "ACCEPTĂ APLICAȚIA" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setSimStatus("respins"), className: `py-2.5 rounded-xl border font-bold text-xs tracking-widest transition-all cursor-pointer ${simStatus === "respins" ? "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]" : "bg-white/5 text-silver border-white/5 hover:bg-white/10"}`, children: "RESPINGE APLICAȚIA" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "sim-response", className: "text-xs text-silver tracking-wider uppercase", children: "Scrie Răspunsul Liderului (Profesional & Lung)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleAutoGenerateResponse, className: "text-[9px] bg-white/5 text-amber-400 border border-amber-400/25 px-2 py-0.5 rounded hover:bg-white/10 font-bold tracking-widest uppercase transition-colors", children: "⚙️ GENERARE AUTOMATĂ MESAJ" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "sim-response", rows: 6, required: true, value: simResponseText, onChange: (e) => setSimResponseText(e.target.value), placeholder: "Scrie motivul acceptării sau respingerii. O formulare detaliată va asigura un email complet și deosebit primit în portal...", className: "w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground/60 focus:border-white/40 focus:outline-none leading-relaxed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-3 text-[10px] text-emerald-400 leading-normal flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4.5 w-4.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "📧 ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Notificare Automată de Email:" }),
            " Prin confirmarea deciziei, vei actualiza statusul bazei de date și vei trimite un email detaliat cu design premium HTML către ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.email }),
            ". De asemenea, vei primi notificarea instant în simulatorul de mai jos!"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => {
            setShowSimulateModal(false);
            setSimulatingAppId(null);
          }, className: "flex-1 border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider", children: "ANULEAZĂ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: simulatingSubmit || !simResponseText.trim(), className: "flex-1 bg-white text-black hover:bg-white/90 text-xs font-bold tracking-wider cursor-pointer", children: simulatingSubmit ? "SE PROCESEAZĂ..." : "TRIMITE DECIZIA" })
        ] })
      ] })
    ] }) }),
    receivedEmail && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 bg-black/90 backdrop-blur-md z-[101] flex items-center justify-center p-4 md:p-6 overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl bg-[#080808] border border-white/10 rounded-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[90vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-[#121212] px-4 py-3 border-b border-white/5 flex items-center justify-between shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-rose-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-amber-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground ml-3 font-mono", children: "webmail.flowromania.ro/inbox" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setReceivedEmail(null), className: "text-[10px] tracking-widest text-muted-foreground hover:text-foreground font-bold border border-white/5 bg-white/5 px-2.5 py-1 rounded transition-colors uppercase", children: "Închide Căsuța Poștală" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-[#0d0d0d] border-b border-white/5 space-y-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:justify-between md:items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-semibold text-foreground tracking-wide", children: receivedEmail.subject }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground font-mono", children: [
            "Astăzi, ",
            (/* @__PURE__ */ new Date()).toLocaleTimeString("ro-RO")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-silver", children: "De la:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "FLOW ROMÂNIA <recrutare@flowromania.ro>" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-silver", children: "Către:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.email })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-4 md:p-6 bg-[#0c0c0c] custom-scrollbar", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { dangerouslySetInnerHTML: {
        __html: receivedEmail.html
      }, className: "w-full h-auto text-left rounded-xl overflow-hidden border border-white/5 shadow-inner" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 bg-[#121212] border-t border-white/5 flex items-center justify-between shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-mono uppercase tracking-widest", children: "Client Email Sincronizat Live" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => setReceivedEmail(null), className: "bg-white text-black hover:bg-white/90 text-[10px] font-bold tracking-wider px-6 cursor-pointer", children: "MARCHEAZĂ CA CITIT" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
export {
  ProfilePage as component
};
