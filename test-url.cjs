const mysql = require('mysql2/promise');

async function test() {
  try {
    const url = "mysql://dbpgf35443969:4SEOQ8xA5Ckj77wdN0(4Q9@serverless-europe-west2.sysp0000.db2.skysql.com:4078/flowro";
    const connection = await mysql.createConnection({
      uri: url,
      ssl: { rejectUnauthorized: false }
    });
    console.log('Successfully connected using URI!');
    await connection.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

test();
