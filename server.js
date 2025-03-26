require('dotenv').config();
const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
app.use(cors());

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING
};

app.get('/api/players', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT first_name || ' ' || last_name AS name, position, nationality 
       FROM Players`
    );
    res.json(result.rows.map(row => ({
      name: row[0],
      position: row[1],
      nationality: row[2]
    })));
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));