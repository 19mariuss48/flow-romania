const fs = require('fs');
const mysql = require('mysql2/promise');

async function apply() {
  const sql = fs.readFileSync('drizzle/0000_curved_rocket_racer.sql', 'utf8');
  const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s.length > 0);
  
  // Connect without specifying a database first
  const connection = await mysql.createConnection({
    uri: 'mysql://dbpgf35443969:4SEOQ8xA5Ckj77wdN0(4Q9@serverless-europe-west2.sysp0000.db2.skysql.com:4078',
    ssl: { rejectUnauthorized: false } 
  });
  
  console.log('Connected to SkySQL! Creating database flowro...');
  await connection.query('CREATE DATABASE IF NOT EXISTS flowro;');
  await connection.query('USE flowro;');
  
  console.log('Applying ' + statements.length + ' statements...');
  
  for (let i = 0; i < statements.length; i++) {
    try {
      await connection.query(statements[i]);
      console.log(`Statement ${i + 1} applied successfully.`);
    } catch (err) {
      if (!err.message.includes("already exists") && !err.message.includes("Duplicate FOREIGN KEY")) {
        console.error(`Error on statement ${i + 1}:`, err.message);
      } else {
        console.log(`Statement ${i + 1} skipped (already exists).`);
      }
    }
  }
  
  await connection.end();
  console.log('Done!');
}

apply().catch(console.error);
