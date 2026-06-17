const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes', 'profile.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

const oldFactionInput = `<Input 
                      id="prof-faction" 
                      type="text" 
                      value={faction} 
                      onChange={(e) => setFaction(e.target.value)} 
                      placeholder="ex. Poliția Română"
                      className="bg-white/5 border-white/10 text-foreground text-sm"
                    />`;

const newFactionInput = `                    {profile?.faction && ["fondator", "moderator", "administrator", "admin", "staff"].some(r => profile.faction.toLowerCase().includes(r)) ? (
                      <div className="bg-white/5 border border-white/10 text-foreground/50 text-sm px-3 py-2 rounded-md flex items-center justify-between cursor-not-allowed" title="Gradul administrativ nu poate fi modificat de aici.">
                        <span>{profile.faction}</span>
                        <Lock className="h-3 w-3" />
                      </div>
                    ) : (
                      <Input 
                        id="prof-faction" 
                        type="text" 
                        value={faction} 
                        onChange={(e) => setFaction(e.target.value)} 
                        placeholder="ex. Poliția Română"
                        className="bg-white/5 border-white/10 text-foreground text-sm"
                      />
                    )}`;

content = content.replace(oldFactionInput, newFactionInput);
fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed profile.tsx frontend faction input lock.');
