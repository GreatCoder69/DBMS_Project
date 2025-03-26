import React, { useState, useEffect } from "react";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/players');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPlayers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="players-table">
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th style={{ textAlign: "center" }}>Position</th>
            <th style={{ textAlign: "center" }}>Nationality</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>
                <div className="player-info">
                  <img src="/logo.png" alt={player.name} className="player-img" />
                  <span>{player.name}</span>
                </div>
              </td>
              <td style={{ textAlign: "center" }}>{player.position}</td>
              <td style={{ textAlign: "center" }}>{player.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Players;