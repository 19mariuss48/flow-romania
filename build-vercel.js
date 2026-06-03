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

fs.rmSync('.vercel/output', { recursive: true, force: true });
fs.mkdirSync('.vercel/output/functions/__server.func', { recursive: true });
fs.mkdirSync('.vercel/output/static', { recursive: true });

fs.copyFileSync('dist/config.json', '.vercel/output/config.json');
copyDir('dist/server', '.vercel/output/functions/__server.func');
copyDir('dist/client', '.vercel/output/static');

console.log('Vercel output structure generated successfully!');
