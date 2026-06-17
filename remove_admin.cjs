const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\routes';

const filesToUpdate = [
  'admin.tsx',
  'forum.new-topic.$forumSlug.tsx',
  'forum.thread.$threadId.tsx',
  'profile.tsx',
  'regulament.tsx'
];

for (const file of filesToUpdate) {
  const filePath = path.join(srcDir, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // admin.tsx replacements
  if (file === 'admin.tsx') {
    content = content.replace(/rawFaction === "Administrator" \|\| rawFaction\?\.includes\("Admin"\) \|\| /g, '');
    content = content.replace(/\|\| targetFaction === "Administrator" \|\| targetFaction\?\.includes\("Admin"\)/g, '');
    content = content.replace(/"Moderator", "Administrator", "Fondator"/g, '"Moderator", "Fondator"');
    content = content.replace(/\|\| p\.faction === 'Administrator' \|\| p\.faction\?\.includes\('Admin'\)/g, '');
    content = content.replace(/\{\(p\.faction === "Administrator" \|\| p\.faction\?\.includes\("Admin"\)\) \? "Fondator" : \(p\.faction \|\| "Jucator"\)\}/g, '{p.faction || "Jucator"}');
  }

  // forum replacements
  if (file === 'forum.new-topic.$forumSlug.tsx' || file === 'forum.thread.$threadId.tsx') {
    content = content.replace(/\|\| userRank === "Administrator" \|\| userRank\?\.includes\("Admin"\)/g, '');
    if (file === 'forum.thread.$threadId.tsx') {
      content = content.replace(/const mappedRank = \(post\.rank === "Administrator" \|\| post\.rank\?\.includes\("Admin"\)\) \? "Fondator" : \(post\.rank \|\| "Jucator"\);/g, 'const mappedRank = post.rank || "Jucator";');
      content = content.replace(/rank: "Administrator"/g, 'rank: "Fondator"');
    }
  }

  // profile replacements
  if (file === 'profile.tsx') {
    content = content.replace(/contactezi un Administrator/g, 'contactezi un Fondator');
  }
  
  // regulament replacements
  if (file === 'regulament.tsx') {
    content = content.replace(/administratorul curent/g, 'membrul staff curent');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
