import React, { useState, useEffect } from "react";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch only from the /api/players endpoint
        const playersRes = await fetch("http://localhost:5000/api/players");

        if (!playersRes.ok)
          throw new Error("Network response was not ok");

        const playersData = await playersRes.json();

        // Directly use the player data (since it's already enriched with TEAM_BADGE)
        setPlayers(playersData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="players-table">
      <table>
        <thead>
          <tr>
            <th>Club</th>
            <th>Player</th>
            <th style={{ textAlign: "center" }}>Position</th>
            <th style={{ textAlign: "center" }}>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.FULL_NAME}> {/* Use player name or unique ID as the key */}
              <td style={{ textAlign: "center" }}>
                {player.TEAM_BADGE ? (
                  <img
                    src={player.TEAM_BADGE}
                    alt="Club"
                    className="club-badge"
                  />
                ) : (
                  <span>No badge available</span> // Show a fallback text if no badge is provided
                )}
              </td>

              <td>
                <div className="player-info">
                  <span>{player.FULL_NAME}</span>
                </div>
              </td>
              <td style={{ textAlign: "center" }}>{player.PLAYER_POSITION}</td>
              <td style={{ textAlign: "center" }}>{player.PLAYER_NATIONALITY}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;
