const fs = require('fs');
const mysql = require('mysql2/promise');

async function apply() {
  const connection = await mysql.createConnection({
    uri: 'mysql://dbpgf35443969:4SEOQ8xA5Ckj77wdN0(4Q9@serverless-europe-west2.sysp0000.db2.skysql.com:4078',
    ssl: { rejectUnauthorized: false } 
  });
  
  console.log('Connected to SkySQL! Creating database flowro...');
  await connection.query('CREATE DATABASE IF NOT EXISTS flowro;');
  await connection.query('USE flowro;');
  
  const files = fs.readdirSync('drizzle').filter(f => f.endsWith('.sql')).sort();
  console.log(`Found ${files.length} migration files.`);

  for (const file of files) {
    console.log(`\n--- Applying ${file} ---`);
    const sql = fs.readFileSync(`drizzle/${file}`, 'utf8');
    const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s.length > 0);
    console.log(`Applying ${statements.length} statements...`);
    
    for (let i = 0; i < statements.length; i++) {
      try {
        await connection.query(statements[i]);
        console.log(`Statement ${i + 1} applied successfully.`);
      } catch (err) {
        if (!err.message.includes("already exists") && !err.message.includes("Duplicate FOREIGN KEY") && !err.message.includes("Duplicate key on write or update") && !err.message.includes("Can't DROP COLUMN")) {
          console.error(`Error on statement ${i + 1}:`, err.message);
        } else {
          console.log(`Statement ${i + 1} skipped (already exists or safely ignored).`);
        }
      }
    }
  }
  
  await connection.end();
  console.log('\nDone!');
}

apply().catch(console.error);
