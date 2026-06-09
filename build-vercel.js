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

// Patch Vercel function configuration to use supported Node.js version
const vcConfigPath = '.vercel/output/functions/__server.func/.vc-config.json';
let vcConfig = {
  "runtime": "nodejs20.x",
  "handler": "index.mjs",
  "launcherType": "Nodejs"
};

if (fs.existsSync(vcConfigPath)) {
  vcConfig = JSON.parse(fs.readFileSync(vcConfigPath, 'utf8'));
  if (vcConfig.runtime && vcConfig.runtime.startsWith('nodejs24')) {
    vcConfig.runtime = 'nodejs20.x';
    console.log('Patched Vercel runtime to nodejs20.x');
  }
} else {
  console.log('Created .vc-config.json for Vercel');
}

fs.writeFileSync(vcConfigPath, JSON.stringify(vcConfig, null, 2));

console.log('Vercel output structure generated successfully!');
