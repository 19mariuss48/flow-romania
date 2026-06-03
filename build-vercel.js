import fs from 'fs';
import path from 'path';

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  let entries = fs.readdirSync(src, { withFileTypes: true });
  for (let entry of entries) {
    let srcPath = path.join(src, entry.name);
    let destPath = path.join(dest, entry.name);
    entry.isDirectory() ? copyDir(srcPath, destPath) : fs.copyFileSync(srcPath, destPath);
  }
}

// Nitro automatically creates .vercel/output/config.json, so we just add to it.
fs.mkdirSync('.vercel/output/functions/__server.func', { recursive: true });
fs.mkdirSync('.vercel/output/static', { recursive: true });

copyDir('dist/server', '.vercel/output/functions/__server.func');
copyDir('dist/client', '.vercel/output/static');

console.log('Vercel output structure generated successfully!');
