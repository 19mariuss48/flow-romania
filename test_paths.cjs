const fs = require('fs');
const text = fs.readFileSync('node_modules/better-auth/dist/index.js', 'utf8');
const matches = text.match(/path:\s*['"`](.*?)['"`]/g);
console.log(matches ? matches.filter(m => m.toLowerCase().includes('password')) : 'no matches');
