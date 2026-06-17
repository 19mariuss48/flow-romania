const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes', 'profile.tsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Fix the array parsing logic
const oldParsing = `  const connectedChars = Array.isArray(profile.fivem_character_data) 
    ? profile.fivem_character_data 
    : [];`;

const newParsing = `  let connectedChars: any[] = [];
  try {
    if (Array.isArray(profile.fivem_character_data)) {
      connectedChars = profile.fivem_character_data;
    } else if (typeof profile.fivem_character_data === 'string' && profile.fivem_character_data.trim() !== '') {
      const parsed = JSON.parse(profile.fivem_character_data);
      if (Array.isArray(parsed)) {
        connectedChars = parsed;
      } else if (parsed && typeof parsed === 'object') {
        connectedChars = [parsed]; // fallback for single object
      }
    } else if (profile.fivem_character_data && typeof profile.fivem_character_data === 'object') {
      connectedChars = [profile.fivem_character_data];
    }
  } catch(e) {
    console.error("Failed to parse fivem_character_data", e);
  }`;

content = content.replace(oldParsing, newParsing);

// 2. Fix the variable name in the catch block
content = content.replace(/fivem_cash: newChar\.cash,/g, 'fivem_cash: newChar1.cash,');
content = content.replace(/fivem_bank: newChar\.bank,/g, 'fivem_bank: newChar1.bank,');
content = content.replace(/fivem_job: newChar\.jobShort,/g, 'fivem_job: newChar1.jobShort,');
content = content.replace(/fivem_playtime: newChar\.playtime,/g, 'fivem_playtime: newChar1.playtime,');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed profile.tsx');
