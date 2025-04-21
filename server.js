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
app.get('/', (req, res) => {
  res.send('Hello from server!');
});
app.get('/api/club', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT * FROM Team ORDER BY team_points DESC`, // 🔥 Sorting teams by points
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('Result:', result.rows); // 👈 debug log
    res.json(result.rows);
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
app.get('/api/players', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT 
         p.PLAYER_FIRST_NAME || ' ' || p.PLAYER_LAST_NAME AS FULL_NAME,
         p.PLAYER_POSITION,
         p.PLAYER_NATIONALITY,
         p.PLAYER_FACE_ICON,
         t.TEAM_BADGE
       FROM 
         PLAYER p
       JOIN 
         TEAM t ON p.TEAM_ID = t.TEAM_ID`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    console.log('✅ Players + Team Badges:', result.rows);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('🔌 Error closing connection:', err);
      }
    }
  }
});
app.get('/api/matches', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `SELECT 
         m.match_id,
         TO_CHAR(m.match_date, 'YYYY-MM-DD') AS match_date,
         s.stadium_name,

         home_team.team_name AS home_team_name,
         home_team.team_badge AS home_team_badge,
         m.match_home_score,
         m.match_home_possession,

         away_team.team_name AS away_team_name,
         away_team.team_badge AS away_team_badge,
         m.match_away_score,
         m.match_away_possession,

         e.event_minute,
         p.player_first_name || ' ' || p.player_last_name AS scorer_name,
         scorer_team.team_badge AS scorer_team_badge

       FROM match m
       JOIN team home_team ON m.team_home_id = home_team.team_id
       JOIN team away_team ON m.team_away_id = away_team.team_id
       JOIN stadium s ON home_team.stadium_id = s.stadium_id
       LEFT JOIN event e ON m.match_id = e.match_id
       LEFT JOIN player p ON e.player_id = p.player_id
       LEFT JOIN team scorer_team ON p.team_id = scorer_team.team_id

       ORDER BY m.match_id, e.event_minute`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('🔌 Error closing connection:', err);
      }
    }
  }
});
app.get('/api/top-goal-scorers', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `
      SELECT
          p.player_first_name || ' ' || p.player_last_name AS full_name,
          p.player_face_icon as face,
          t.team_name AS club,
          t.team_badge AS club_badge,
          p.player_position AS position,
          p.player_nationality AS nationality,
          SUM(ps.stat_goals) AS total_goals
      FROM
          Player p
      JOIN
          Player_Stats ps ON p.player_id = ps.player_id
      JOIN
          Team t ON p.team_id = t.team_id
      GROUP BY
          p.player_id, p.player_first_name, p.player_last_name, p.player_face_icon, t.team_name, t.team_badge, p.player_position, p.player_nationality
      ORDER BY
          total_goals DESC,
          p.player_id
      FETCH FIRST 10 ROWS ONLY
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('🔌 Error closing connection:', err);
      }
    }
  }
});
app.get('/api/club-players', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `
      SELECT 
        t.team_id,
        t.team_name AS club_name,
        t.team_badge AS club_badge,
        t.team_founded_year AS founded_year,
        t.team_prev_prem_titles AS prev_titles,
        t.team_points,
        t.team_fans,
        
        s.stadium_name,
        s.stadium_capacity,
        s.stadium_image,
        s.stadium_avg_attendance,
        s.stadium_city,
        s.stadium_year_built,
        
        c.coach_id,
        c.coach_first_name || ' ' || c.coach_last_name AS coach_name,
        c.coach_age,
        c.coach_nationality,
        c.coach_prev_trophies,
        c.coach_experience,
        c.coach_face_icon,
        
        p.player_id,
        p.player_face_icon AS face,
        p.player_first_name || ' ' || p.player_last_name AS player_name,
        p.player_position AS position,
        p.player_nationality AS nationality
        
      FROM Team t
      JOIN Stadium s ON t.stadium_id = s.stadium_id
      JOIN Coach c ON t.coach_id = c.coach_id
      LEFT JOIN Player p ON t.team_id = p.team_id
      ORDER BY t.team_name, COALESCE(p.player_id, 0)
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('🔌 Error closing connection:', err);
      }
    }
  }
});


app.get('/api/standings', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `
      SELECT
        ROW_NUMBER() OVER (
          ORDER BY (3 * (COALESCE(stats.wins,0)) + COALESCE(stats.draws,0)) DESC,
                   (COALESCE(stats.goals_for,0) - COALESCE(stats.goals_against,0)) DESC,
                   COALESCE(stats.goals_for,0) DESC
        ) AS position,
        t.team_badge AS club_badge,
        t.team_name AS club_name,
        COALESCE(stats.games_played, 0) AS games_played,
        COALESCE(stats.wins, 0) AS games_won,
        COALESCE(stats.draws, 0) AS games_drawn,
        COALESCE(stats.losses, 0) AS games_lost,
        COALESCE(stats.goals_for, 0) AS goals_for,
        COALESCE(stats.goals_against, 0) AS goals_against,
        (COALESCE(stats.goals_for, 0) - COALESCE(stats.goals_against, 0)) AS goal_difference,
        (3 * COALESCE(stats.wins, 0) + COALESCE(stats.draws, 0)) AS total_points
      FROM Team t
      LEFT JOIN (
        SELECT
          team_id,
          SUM(games_played) AS games_played,
          SUM(wins) AS wins,
          SUM(draws) AS draws,
          SUM(losses) AS losses,
          SUM(goals_for) AS goals_for,
          SUM(goals_against) AS goals_against
        FROM (
          -- Home stats
          SELECT
            m.team_home_id AS team_id,
            COUNT(*) AS games_played,
            SUM(CASE WHEN m.match_home_score > m.match_away_score THEN 1 ELSE 0 END) AS wins,
            SUM(CASE WHEN m.match_home_score = m.match_away_score THEN 1 ELSE 0 END) AS draws,
            SUM(CASE WHEN m.match_home_score < m.match_away_score THEN 1 ELSE 0 END) AS losses,
            SUM(m.match_home_score) AS goals_for,
            SUM(m.match_away_score) AS goals_against
          FROM Match m
          GROUP BY m.team_home_id
          UNION ALL
          -- Away stats
          SELECT
            m.team_away_id AS team_id,
            COUNT(*) AS games_played,
            SUM(CASE WHEN m.match_away_score > m.match_home_score THEN 1 ELSE 0 END) AS wins,
            SUM(CASE WHEN m.match_away_score = m.match_home_score THEN 1 ELSE 0 END) AS draws,
            SUM(CASE WHEN m.match_away_score < m.match_home_score THEN 1 ELSE 0 END) AS losses,
            SUM(m.match_away_score) AS goals_for,
            SUM(m.match_home_score) AS goals_against
          FROM Match m
          GROUP BY m.team_away_id
        )
        GROUP BY team_id
      ) stats ON t.team_id = stats.team_id
      ORDER BY total_points DESC, goal_difference DESC, goals_for DESC
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('🔌 Error closing connection:', err);
      }
    }
  }
});

app.get('/api/debug', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT table_name FROM user_tables`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Debug error:', err);
    res.status(500).send('Debug failed');
  } finally {
    if (connection) await connection.close();
  }
});
app.get('/api/top-assisters', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `
      SELECT
          p.player_first_name || ' ' || p.player_last_name AS full_name,
          p.player_face_icon as face,
          t.team_name AS club,
          t.team_badge AS club_badge,
          p.player_position AS position,
          p.player_nationality AS nationality,
          SUM(ps.stat_assists) AS total_assists
      FROM
          Player p
      JOIN
          Player_Stats ps ON p.player_id = ps.player_id
      JOIN
          Team t ON p.team_id = t.team_id
      GROUP BY
          p.player_id, p.player_first_name, p.player_last_name, p.player_face_icon, t.team_name, t.team_badge, p.player_position, p.player_nationality
      ORDER BY
          total_assists DESC,
          p.player_id
      FETCH FIRST 10 ROWS ONLY
      `,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    res.json(result.rows);
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server error');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('🔌 Error closing connection:', err);
      }
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));