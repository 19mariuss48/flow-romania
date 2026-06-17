const fs = require('fs');

const tsxPath = 'c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes\\profile.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');

// 1. Update syncInputs state
tsxContent = tsxContent.replace(
  `  const [syncInputs, setSyncInputs] = useState({
    username: "",
    license: "",
    discord: "",
    steam: ""
  });`,
  `  const [syncInputs, setSyncInputs] = useState({
    serverId: "",
    securityCode: ""
  });`
);

// 2. Replace handleStartSync function
const handleStartSyncStr = `  const handleStartSync = () => {
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
            const fUsername = syncInputs.username || profile?.username || \`Cfx_\${Math.random().toString(36).substring(2, 8)}\`;
            const fLicense = syncInputs.license || \`license:cfx_\${Math.random().toString(36).substring(2, 12)}\`;
            const fDiscord = syncInputs.discord || \`382\${Math.floor(100000000 + Math.random() * 900000000)}\`;
            const fSteam = syncInputs.steam || \`steam:1100001\${Math.random().toString(16).substring(2, 10)}\`;

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
                
                localStorage.setItem(\`flowro_fivem_sync_\${user!.id}\`, JSON.stringify(syncData));
              }
              
              setSyncStep(3);
              toast.success("Profilul FiveM a fost conectat cu succes (Cache local)!");
              fetchProfile();
            }
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };`;

const newFunctions = `  const handleStartSync = () => {
    if (!syncInputs.serverId) {
      toast.error("Te rugăm să introduci ID-ul tău de pe server.");
      return;
    }
    
    // Simulate checking if connected
    setSyncStep(1.5);
    setSyncStepText("Se verifică statusul conexiunii tale pe server...");
    
    setTimeout(() => {
      // Simulate error if ID is 999
      if (syncInputs.serverId === '999') {
        setSyncStep(1);
        toast.error("Nu ești conectat pe server! Te rugăm să intri pe serverul FLOW ROMANIA și să încerci din nou.", {
          duration: 5000,
        });
        return;
      }
      
      // Success: move to code step
      setSyncStep(2);
    }, 1500);
  };

  const handleVerifyCode = () => {
    if (syncInputs.securityCode !== '1234') {
      toast.error("Codul introdus este incorect! Încearcă din nou. (Pentru test folosește 1234)");
      return;
    }

    setSyncStep(3);
    setSyncStepText("Se sincronizează datele cu contul tău...");
    
    setTimeout(async () => {
      const fUsername = profile?.username || \`Jucator_\${syncInputs.serverId}\`;
      const fLicense = \`license:cfx_\${Math.random().toString(36).substring(2, 12)}\`;
      const fDiscord = \`382\${Math.floor(100000000 + Math.random() * 900000000)}\`;
      const fSteam = \`steam:1100001\${Math.random().toString(16).substring(2, 10)}\`;

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
        
        setSyncStep(4);
        toast.success("Profilul FiveM a fost sincronizat cu succes!");
        fetchProfile();
      } catch (err: any) {
        console.warn("Could not write sync to database. Saving to browser local storage instead.", err);
        
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
          
          localStorage.setItem(\`flowro_fivem_sync_\${user!.id}\`, JSON.stringify(syncData));
        }
        
        setSyncStep(4);
        toast.success("Profilul FiveM a fost sincronizat cu succes (Cache local)!");
        fetchProfile();
      }
    }, 1500);
  };`;

tsxContent = tsxContent.replace(handleStartSyncStr, newFunctions);

// 3. Replace the UI block for the Modal
const oldModalStr = `{/* Step 1: Input Identifier */}
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
            )}`;

const newModalStr = `{/* Step 1: Input Identifier */}
            {syncStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium tracking-wide text-foreground flex items-center gap-2">
                    <Gamepad2 className="h-5 w-5 text-silver" />
                    CONECTEAZĂ CONTUL FIVEM
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Pentru a-ți sincroniza profilul, trebuie să fii conectat pe serverul de joc chiar acum.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-silver tracking-wider uppercase">ID Jucător (Din Joc)</Label>
                    <Input 
                      value={syncInputs.serverId}
                      onChange={(e) => setSyncInputs({ ...syncInputs, serverId: e.target.value })}
                      placeholder="ex. 15"
                      className="bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-white/40"
                    />
                  </div>
                  
                  <p className="text-[9px] text-muted-foreground leading-normal mt-2">
                    Te rugăm să completezi ID-ul tău de pe server. Sistemul va verifica automat dacă ești online.
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
                    VERIFICĂ CONEXIUNEA
                  </Button>
                </div>
              </div>
            )}

            {/* Step 1.5: Checking connection */}
            {syncStep === 1.5 && (
              <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-t-2 border-white animate-spin" />
                  <Activity className="h-6 w-6 text-silver animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold tracking-widest text-foreground uppercase animate-pulse">
                    SE VERIFICĂ STATUSUL
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono transition-all">
                    {syncStepText}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Input Security Code */}
            {syncStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium tracking-wide text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    CONEXIUNE GĂSITĂ
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">
                    Te-am găsit pe server! Un cod de securitate a fost afișat acum pe ecranul tău din joc.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-silver tracking-wider uppercase">Cod Securitate de pe ecran</Label>
                    <Input 
                      value={syncInputs.securityCode}
                      onChange={(e) => setSyncInputs({ ...syncInputs, securityCode: e.target.value })}
                      placeholder="ex. 1234"
                      className="bg-white/5 border-white/10 text-foreground text-sm font-mono focus:border-emerald-500/40"
                    />
                  </div>
                  
                  <p className="text-[10px] text-amber-500/80 leading-normal mt-2 border border-amber-500/10 bg-amber-500/5 p-2 rounded">
                    Acest cod asigură că profilul îți aparține. Nu oferi acest cod nimănui.
                  </p>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={() => { setSyncStep(1); setSyncInputs({ ...syncInputs, securityCode: "" }) }}
                    className="flex-1 border-white/5 hover:bg-white/5 text-xs text-silver tracking-wider"
                  >
                    ÎNAPOI
                  </Button>
                  <Button
                    onClick={handleVerifyCode}
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold tracking-wider"
                  >
                    VERIFICĂ CODUL
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Animating Sync Connection */}
            {syncStep === 3 && (
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

            {/* Step 4: Connection Success */}
            {syncStep === 4 && (
              <div className="py-6 flex flex-col items-center justify-center text-center space-y-6">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-semibold tracking-wide text-foreground">
                    SINCRONIZARE FINALIZATĂ CU SUCCES
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                    Personajul tău de pe serverul FiveM a fost asociat în siguranță cu profilul tău de pe forumul FLOW ROMÂNIA.
                  </p>
                </div>
                <Button
                  onClick={() => setShowSyncModal(false)}
                  className="w-full bg-white text-black hover:bg-white/90 text-xs font-semibold tracking-widest py-3 rounded-xl cursor-pointer"
                >
                  ÎNCHIDE ȘI VEZI PROFILUL
                </Button>
              </div>
            )}`;

const s1 = '{/* Step 1: Input Identifier */}';
const s4 = 'ÎNCHIDE ȘI VEZI PROFILUL\n                </Button>\n              </div>\n            )}';

const start = tsxContent.indexOf(s1);
const end = tsxContent.indexOf(s4) + s4.length;

if (start !== -1 && end !== -1) {
  tsxContent = tsxContent.substring(0, start) + newModalStr + tsxContent.substring(end);
} else {
  console.error("Could not find the UI block to replace.");
}

fs.writeFileSync(tsxPath, tsxContent);
console.log("Update applied to profile.tsx");
