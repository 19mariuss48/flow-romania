const fs = require('fs');

const tsxPath = 'c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes\\profile.tsx';
let tsxContent = fs.readFileSync(tsxPath, 'utf-8');

// 1. Update handleVerifyCode to generate 2 characters
const oldVerifyCode = `const newChar = {
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
        });`;

const newVerifyCode = `const newChar1 = {
        name: profile?.character_name || fUsername,
        job: "Polițist",
        jobShort: "Poliție",
        faction: "Poliția Română",
        cash: 15500,
        bank: 250000,
        playtime: 125,
        serverId: syncInputs.serverId,
        isLive: true,
        vehicles: [{ model: "BMW M5 F90", type: "Personal", plate: "B 101 FLW" }],
        inventory: [{ name: "Telefon", qty: 1 }, { name: "Apă", qty: 5 }, { name: "Pistol", qty: 1 }]
      };
      
      const newChar2 = {
        name: "Caracter Secundar",
        job: "Civil",
        jobShort: "Civil",
        faction: "Fără",
        cash: 500,
        bank: 1000,
        playtime: 12,
        serverId: "Offline",
        isLive: false,
        vehicles: [],
        inventory: [{ name: "Telefon", qty: 1 }, { name: "Sandwich", qty: 2 }]
      };
      
      const chars = [newChar1, newChar2];

      try {
        await updateFiveMSync({
          data: {
            userId: user.id,
            syncData: {
              fivem_username: fUsername,
              fivem_license: fLicense,
              fivem_discord_id: fDiscord,
              fivem_steam_hex: fSteam,
              fivem_cash: newChar1.cash,
              fivem_bank: newChar1.bank,
              fivem_job: newChar1.jobShort,
              fivem_playtime: newChar1.playtime,
              fivem_character_data: chars,
              character_name: newChar1.name,
              faction: newChar1.faction
            }
          }
        });`;

const oldVerifyCodeFallback = `fivem_character_data: [newChar],
            character_name: newChar.name,
            faction: newChar.faction,`;

const newVerifyCodeFallback = `fivem_character_data: chars,
            character_name: newChar1.name,
            faction: newChar1.faction,`;

if (tsxContent.includes(oldVerifyCode)) {
  tsxContent = tsxContent.replace(oldVerifyCode, newVerifyCode);
  tsxContent = tsxContent.replace(oldVerifyCodeFallback, newVerifyCodeFallback);
} else {
  console.log("Could not find handleVerifyCode block");
}

// 2. Replace the character rendering
const oldRenderBlockStart = `{/* Character detailed section */}
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
                            className={\`px-3 py-1.5 rounded-lg text-xs tracking-wider border transition-all cursor-pointer \${
                              activeCharIndex === idx 
                                ? 'bg-white text-black border-white' 
                                : 'bg-white/5 text-silver border-white/5 hover:bg-white/10'
                            }\`}
                          >
                            {char.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active character data view */}
                    {connectedChars[activeCharIndex] && (() => {
                      const char = connectedChars[activeCharIndex];
                      return (`;

const oldRenderBlockEnd = `                      );
                    })()}
                  </div>
                )}`;

const newRenderBlock = `{/* Character detailed section */}
                {connectedChars.length > 0 && (
                  <div className="space-y-6">
                    {connectedChars.map((char: any, idx: number) => (
                      <div key={idx} className="glass rounded-2xl p-6 border-white/10 relative">
                        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                          <h3 className="text-xs tracking-[0.35em] text-silver uppercase flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            STATISTICI PROFIL PERSONAJ {idx + 1}
                          </h3>
                          
                          {char.isLive ? (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">Sincronizare Live</span>
                              {char.serverId && <span className="text-[10px] text-emerald-400/70 ml-1 border-l border-emerald-500/30 pl-2">ID: {char.serverId}</span>}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg">
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                              <span className="text-[10px] text-silver font-bold tracking-widest uppercase">Offline</span>
                            </div>
                          )}
                        </div>

                        {/* Character data view */}
                        <div className="space-y-6">`;

const newRenderBlockEnd = `                      </div>
                      </div>
                    ))}
                  </div>
                )}`;

const renderStartIdx = tsxContent.indexOf('{/* Character detailed section */}');
const renderEndIdx = tsxContent.indexOf('              </div>\n            )}\n\n            {/* Interactive Recruitment & Faction Applications Panel */}');

if (renderStartIdx !== -1 && renderEndIdx !== -1) {
  let block = tsxContent.substring(renderStartIdx, renderEndIdx);
  
  // Replace the top part
  let newBlock = block.replace(oldRenderBlockStart, newRenderBlock);
  // Replace the bottom part
  newBlock = newBlock.replace(oldRenderBlockEnd, newRenderBlockEnd);
  
  tsxContent = tsxContent.substring(0, renderStartIdx) + newBlock + tsxContent.substring(renderEndIdx);
} else {
  console.log("Could not find render block");
}

fs.writeFileSync(tsxPath, tsxContent);
console.log("Updated!");
