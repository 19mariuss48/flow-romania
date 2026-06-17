const fs = require('fs');
const path = require('path');

const contentPath = 'C:\\Users\\Nastase Marius\\.gemini\\antigravity\\brain\\d7d9fe29-1fb7-40b5-94c6-202559297d69\\.system_generated\\steps\\79\\content.md';
const tsxPath = 'c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes\\regulament.tsx';

const content = fs.readFileSync(contentPath, 'utf-8');
const lines = content.split('\n');

let cap1Rules = [];
let cap2Rules = [];
let currentCategory = null;
let currentRule = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  // Remove wrapping quotes if present
  if (line.startsWith('"') && line.endsWith('"')) {
    line = line.substring(1, line.length - 1).trim();
  }
  
  if (!line) continue;

  if (line.includes('CAP. 1 [REGULI GAMEPLAY]:')) {
    currentCategory = cap1Rules;
    continue;
  } else if (line.includes('CAP. 2 [REGULI OOC]:')) {
    currentCategory = cap2Rules;
    continue;
  }

  // Detect a rule start: starts with a number followed by a dot
  const ruleMatch = line.match(/^(\d+)\.\s+(.*)/);
  if (ruleMatch && currentCategory) {
    if (currentRule) {
      currentCategory.push(currentRule);
    }
    currentRule = {
      title: line.endsWith(':') ? line.slice(0, -1) : line, // remove trailing colon
      pedeapsa: "",
      description: "",
      details: []
    };
  } else if (currentRule) {
    currentRule.details.push(line);
  }
}

if (currentRule && currentCategory) {
  currentCategory.push(currentRule);
}

const generateRulesStr = (rules) => {
  return rules.map(r => `      {
        title: ${JSON.stringify(r.title)},
        pedeapsa: "",
        description: "",
        details: [
${r.details.map(d => `          ${JSON.stringify(d)}`).join(',\n')}
        ]
      }`).join(',\n');
};

const newRegulamenteData = `const regulamenteData: RuleCategory[] = [
  {
    id: "gameplay",
    name: "Reguli Gameplay (Cap. 1)",
    icon: Compass,
    description: "Normele oficiale legate de comportamentul în joc, mecanicile de Roleplay, interacțiuni și limite administrative.",
    rules: [
${generateRulesStr(cap1Rules)}
    ]
  },
  {
    id: "ooc",
    name: "Reguli OOC (Cap. 2)",
    icon: ShieldAlert,
    description: "Normele Out-Of-Character privind comportamentul comunitar, regulile tehnice, utilizarea bug-urilor și acumularea de sancțiuni.",
    rules: [
${generateRulesStr(cap2Rules)}
    ]
  }
];`;

let tsxContent = fs.readFileSync(tsxPath, 'utf-8');

// Replace the array
const startMarker = "const regulamenteData: RuleCategory[] = [";
const endMarker = "// 2. New Terms and Conditions data";
const startIndex = tsxContent.indexOf(startMarker);
const endIndex = tsxContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  tsxContent = tsxContent.slice(0, startIndex) + newRegulamenteData + "\n\n" + tsxContent.slice(endIndex);
}

// Remove pedeapsa rendering
// <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-rose-500/10 border border-rose-500/20 text-[10px] font-bold text-rose-400 tracking-widest uppercase font-mono">
//   Sancțiune standard / maximă: {rule.pedeapsa}
// </div>
const pedeapsaRegex = /\{\/\*\s*Penalty badge\s*\*\/\}\s*<div[^>]*>\s*Sancțiune standard \/ maximă: \{rule\.pedeapsa\}\s*<\/div>/g;
tsxContent = tsxContent.replace(pedeapsaRegex, '');

fs.writeFileSync(tsxPath, tsxContent);
console.log("Updated rules successfully.");
