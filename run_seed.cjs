const mariadb = require('mariadb');
const fs = require('fs');
const path = require('path');

async function main() {
  let conn;
  try {
    conn = await mariadb.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'flowro'
    });
    const sqlContent = fs.readFileSync(path.join(__dirname, 'insert_forums.sql'), 'utf8');
    
    // Split queries by semicolon, being careful about semicolons inside strings
    // A simple split(';') might break content, so we execute it in chunks or whole.
    // wait, mariadb supports multiple statements.
    conn.query({ sql: sqlContent, multipleStatements: true });
    console.log('Seed executed successfully.');
  } catch (err) {
    console.error('Error executing seed:', err);
  } finally {
    if (conn) {
      setTimeout(() => conn.end(), 1000);
    }
  }
}

main();
