require('dotenv').config();
const oracledb = require('oracledb');

async function testDB() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECTION_STRING
    });
    console.log('✅ Connected to Oracle DB!');
    await connection.close();
  } catch (err) {
    console.error('❌ DB connection failed:', err);
  }
}

testDB();
