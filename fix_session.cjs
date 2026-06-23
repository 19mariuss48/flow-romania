const fs = require('fs');
const path = require('path');

const filePath = path.join('c:\\Users\\Nastase Marius\\Downloads\\flowro\\flow-romania-hub-main\\src\\lib', 'auth.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const sessionConfig = `
  session: {
    expiresIn: 60 * 60 * 24 * 2, // 2 zile
    updateAge: 60 * 60 * 24, // reînnoiește dacă e mai veche de o zi
  },
  databaseHooks: {`;

content = content.replace('  databaseHooks: {', sessionConfig);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Added session config to auth.ts');
