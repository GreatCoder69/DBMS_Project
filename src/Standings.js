import React, { useState, useEffect } from "react";
import "./Standings.css";

const Standings = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/standings");
        if (!res.ok) throw new Error("Failed to fetch standings data");
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, []);

  if (loading) return <div className="loading-message">Loading standings...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="standings-table-container">
      <table className="standings-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Club</th>
            <th>Played</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, idx) => (
            <tr key={team.POSITION || idx}>
              <td>{team.POSITION}</td>
              <td className="club-info">
                <img
                  src={team.CLUB_BADGE}
                  alt={team.CLUB_NAME}
                  className="club-img"
                  style={{ width: 32, height: 32, objectFit: "contain", marginRight: 8 }}
                />
                <span>{team.CLUB_NAME}</span>
              </td>
              <td>{team.GAMES_PLAYED}</td>
              <td>{team.GAMES_WON}</td>
              <td>{team.GAMES_DRAWN}</td>
              <td>{team.GAMES_LOST}</td>
              <td>{team.GOALS_FOR}</td>
              <td>{team.GOALS_AGAINST}</td>
              <td>{team.GOAL_DIFFERENCE}</td>
              <td className="bold">{team.TOTAL_POINTS}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
