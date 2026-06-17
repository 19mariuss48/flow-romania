const fs = require('fs');
const tsxPath = 'c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes\\regulament.tsx';

let tsxContent = fs.readFileSync(tsxPath, 'utf-8');

// The array is hardcoded now. I'll parse it back with regex or just string replacement.
// Rule 23 is currently in "ooc" array. Let's find it.

const rule23Start = tsxContent.indexOf('title: "23. REGULI CARE IMPLICA CIVILII');
const rule23End = tsxContent.indexOf('},', rule23Start) + 2;

if (rule23Start !== -1) {
  const rule23Code = tsxContent.substring(rule23Start - 10, rule23End); // get the whole block
  
  // Remove it from current location
  tsxContent = tsxContent.replace(rule23Code, '');
  
  // Add it before the end of the first rules array.
  // The first array ends before: `id: "ooc",`
  const cap2Start = tsxContent.indexOf('id: "ooc",');
  const cap1End = tsxContent.lastIndexOf(']', cap2Start);
  
  // Insert rule 23 code before cap1End
  tsxContent = tsxContent.substring(0, cap1End) + rule23Code + "\n    " + tsxContent.substring(cap1End);
}

// Render Rule 17 nicely. We need to find the rendering logic.
// In regulament.tsx, around line 1012:
/*
{rule.details.map((detail, dIdx) => (
  <div key={dIdx} className="flex items-start gap-3">
    <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
      {detail}
    </p>
  </div>
))}
*/
// I will replace it with:
/*
{rule.details.map((detail, dIdx) => {
  if (detail.startsWith("ATENTIE!")) {
    return (
      <div key={dIdx} className="flex flex-col gap-4 mt-4 glass border-amber-500/10 bg-amber-500/[0.02] rounded-xl p-5">
        <div className="flex items-start gap-3">
          <p className="text-xs md:text-sm text-amber-500/90 leading-relaxed font-bold whitespace-pre-line font-sans">
            {detail}
          </p>
        </div>
        <img src="/harta.jpg" alt="Harta Zone" className="w-full rounded-lg border border-white/10" />
      </div>
    );
  }
  if (detail.startsWith("Acordati atentie")) {
    return (
      <div key={dIdx} className="flex items-start gap-3 glass border-rose-500/10 bg-rose-500/[0.02] rounded-xl p-5 mt-2">
        <p className="text-xs md:text-sm text-rose-400/90 leading-relaxed font-medium whitespace-pre-line font-sans">
          {detail}
        </p>
      </div>
    );
  }
  return (
    <div key={dIdx} className="flex items-start gap-3">
      <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
        {detail}
      </p>
    </div>
  );
})}
*/

const oldMapRender = `{rule.details.map((detail, dIdx) => (
                                  <div key={dIdx} className="flex items-start gap-3">
                                    <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
                                      {detail}
                                    </p>
                                  </div>
                                ))}`;

const newMapRender = `{rule.details.map((detail, dIdx) => {
                                  if (detail.startsWith("ATENTIE!")) {
                                    return (
                                      <div key={dIdx} className="flex flex-col gap-4 mt-6 glass border-amber-500/20 bg-amber-500/5 rounded-xl p-5 shadow-lg">
                                        <div className="flex items-start gap-3">
                                          <p className="text-xs md:text-sm text-amber-400 leading-relaxed font-bold whitespace-pre-line font-sans">
                                            ⚠️ {detail}
                                          </p>
                                        </div>
                                        <div className="relative rounded-lg overflow-hidden border border-white/10 mt-2">
                                          <img src="https://media.discordapp.net/attachments/1179471928629342308/1182740924254343188/Screenshot_2.png" alt="Harta Zone" className="w-full h-auto object-cover" />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                                        </div>
                                      </div>
                                    );
                                  }
                                  if (detail.startsWith("Acordati atentie")) {
                                    return (
                                      <div key={dIdx} className="flex items-start gap-3 glass border-rose-500/20 bg-rose-500/5 rounded-xl p-5 mt-2 shadow-lg">
                                        <p className="text-xs md:text-sm text-rose-300 leading-relaxed font-semibold whitespace-pre-line font-sans">
                                          🚨 {detail}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return (
                                    <div key={dIdx} className="flex items-start gap-3">
                                      <p className="text-xs md:text-sm text-foreground/80 leading-relaxed font-light whitespace-pre-line font-sans">
                                        {detail}
                                      </p>
                                    </div>
                                  );
                                })}`;

if (tsxContent.includes(oldMapRender)) {
  tsxContent = tsxContent.replace(oldMapRender, newMapRender);
} else {
  console.log("Could not find the map render section!");
}

fs.writeFileSync(tsxPath, tsxContent);
console.log("Fixed Rule 23 and styled Rule 17 warnings.");
