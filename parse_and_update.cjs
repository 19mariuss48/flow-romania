const fs = require('fs');
const https = require('https');

async function fetchCsv(gid) {
  return new Promise((resolve, reject) => {
    https.get(`https://docs.google.com/spreadsheets/d/1OV9rJMxKZbCJ2x3_wH91wIbJmrOhqVRknSvcuIAozkE/export?format=csv&gid=${gid}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  const termeniCsv = await fetchCsv('182055813');
  const jafuriCsv = await fetchCsv('128981093');
  const regulamentCsv = await fetchCsv('0');
  
  // Parse Termeni
  const termeniData = [];
  const tLines = termeniCsv.split('\n').map(l => l.trim()).filter(l => l);
  let currentTermen = null;
  for (const line of tLines) {
    if (line.match(/^\d+\./)) {
      if (currentTermen) termeniData.push(currentTermen);
      currentTermen = { title: line.replace(/"/g, ''), content: '' };
    } else if (currentTermen && line.startsWith('-')) {
      currentTermen.content += line.replace(/"/g, '') + '\n';
    }
  }
  if (currentTermen) termeniData.push(currentTermen);

  // Parse Jafuri
  const jLines = jafuriCsv.split('\n').map(l => l.trim()).filter(l => l);
  const jafuriData = { content: jLines.join('\n').replace(/"/g, '') };

  // Parse Regulament
  const rLines = regulamentCsv.split('\n').map(l => l.trim()).filter(l => l);
  const regulamenteData = [{
    id: "gameplay",
    name: "Reguli Oficiale",
    icon: "ShieldAlert",
    description: "Regulamentul oficial al comunitatii.",
    rules: []
  }];
  
  let currentRule = null;
  for (const line of rLines) {
    if (line.match(/^\d+\./)) {
      if (currentRule) regulamenteData[0].rules.push(currentRule);
      currentRule = { title: line.replace(/"/g, ''), pedeapsa: "", description: "", details: [] };
    } else if (currentRule && line) {
      currentRule.details.push(line.replace(/"/g, ''));
    }
  }
  if (currentRule) regulamenteData[0].rules.push(currentRule);

  const finalContent = {
    regulamenteData,
    termeniData,
    jafuriData
  };

  fs.writeFileSync('parsed_regulament.json', JSON.stringify(finalContent, null, 2));
  console.log("Done parsing.");
}

run();
