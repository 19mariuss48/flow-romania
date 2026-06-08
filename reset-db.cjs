const mysql = require('mysql2/promise');
const fs = require('fs');

async function reset() {
  const connection = await mysql.createConnection({
    uri: 'mysql://dbpgf35443969:4SEOQ8xA5Ckj77wdN0(4Q9@serverless-europe-west2.sysp0000.db2.skysql.com:4078/flowro',
    ssl: { rejectUnauthorized: false }
  });
  
  console.log('Connected to SkySQL! Resetting database...');
  
  // Disable foreign key checks
  await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
  
  // Get all tables
  const [rows] = await connection.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'flowro';
  `);
  
  if (rows.length > 0) {
    console.log(`Found ${rows.length} tables. Dropping them...`);
    for (const row of rows) {
      const tableName = row.TABLE_NAME || row.table_name;
      await connection.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
      console.log(`Dropped ${tableName}`);
    }
  } else {
    console.log('No tables found to drop.');
  }
  
  await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  console.log('Database reset complete!');
  
  // Now apply the schema
  console.log('Applying fresh schema...');
  const sql = fs.readFileSync('drizzle/0000_curved_rocket_racer.sql', 'utf8');
  const statements = sql.split('--> statement-breakpoint').map(s => s.trim()).filter(s => s.length > 0);
  
  for (let i = 0; i < statements.length; i++) {
    try {
      await connection.query(statements[i]);
      console.log(`Statement ${i + 1} applied successfully.`);
    } catch (err) {
      console.error(`Error on statement ${i + 1}:`, err.message);
    }
  }
  
  await connection.end();
  console.log('✅ Totul este gata! Baza de date a fost resetata si sincronizata!');
}

reset().catch(console.error);
