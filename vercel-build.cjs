const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const vercelDir = path.join(__dirname, '.vercel', 'output');

// Create Vercel Output API directories
fs.mkdirSync(path.join(vercelDir, 'functions', '__server.func'), { recursive: true });
fs.mkdirSync(path.join(vercelDir, 'static'), { recursive: true });

// Copy server files to the function directory
fs.cpSync(path.join(distDir, 'server'), path.join(vercelDir, 'functions', '__server.func'), { recursive: true });

// Copy client files to the static directory
fs.cpSync(path.join(distDir, 'client'), path.join(vercelDir, 'static'), { recursive: true });

// Copy Vercel routing config
if (fs.existsSync(path.join(distDir, 'config.json'))) {
  fs.copyFileSync(path.join(distDir, 'config.json'), path.join(vercelDir, 'config.json'));
}

// Write the function configuration for Vercel Serverless
fs.writeFileSync(path.join(vercelDir, 'functions', '__server.func', '.vc-config.json'), JSON.stringify({
  runtime: "nodejs20.x",
  handler: "index.mjs",
  launcherType: "Nodejs"
}, null, 2));

console.log("Vercel Build Output API structure created successfully.");
