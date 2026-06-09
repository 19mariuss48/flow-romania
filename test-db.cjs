const mysql = require('mysql2/promise');

async function test() {
  try {
    const connection = await mysql.createConnection({
      host: 'serverless-europe-west2.sysp0000.db2.skysql.com',
      port: 4078,
      user: 'dbpgf35443969',
      password: '4SEOQ8xA5Ckj77wdN0(4Q9',
      database: 'flowro',
      ssl: { rejectUnauthorized: false }
    });
    console.log('Successfully connected to database!');
    await connection.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

test();
