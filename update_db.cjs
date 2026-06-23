const mysql = require('mysql2/promise');
const fs = require('fs');

async function run() {
  const connection = await mysql.createConnection({
    uri: 'mysql://dbpgf35443969:4SEOQ8xA5Ckj77wdN0(4Q9@serverless-europe-west2.sysp0000.db2.skysql.com:4078/flowro',
    ssl: { rejectUnauthorized: false }
  });
  
  const content = fs.readFileSync('parsed_regulament.json', 'utf8');
  await connection.query('UPDATE site_content SET content = ? WHERE id = "regulament"', [content]);
  console.log('Database updated successfully!');
  process.exit(0);
}
run();
