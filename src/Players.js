import React, { useState, useEffect } from "react";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const playersRes = await fetch("http://localhost:5000/api/players");
        if (!playersRes.ok) throw new Error("Network response was not ok");
        const playersData = await playersRes.json();
        setPlayers(playersData);
        setFilteredPlayers(playersData); // Show all players initially
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim().toLowerCase();

      if (query === "") {
        setFilteredPlayers(players); // Reset if empty
        return;
      }

      const results = players.filter((player) => {
        const fullName = (player.FULL_NAME || "").trim().toLowerCase();
        return fullName.includes(query);
      });

      setFilteredPlayers(results);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setFilteredPlayers(players);
  };

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="players-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by player name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={handleClear} className="clear-btn">Clear</button>
      </div>

      <div className="players-table">
        <table>
          <thead>
            <tr>
              <th>Club</th>
              <th>Player</th>
              <th>Face</th>
              <th style={{ textAlign: "center" }}>Position</th>
              <th style={{ textAlign: "center" }}>Nationality</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers.map((player) => (
              <tr key={player.FULL_NAME}>
                <td style={{ textAlign: "center" }}>
                  {player.TEAM_BADGE ? (
                    <img
                      src={player.TEAM_BADGE}
                      alt="Club"
                      className="club-badge"
                    />
                  ) : (
                    <span>No badge available</span>
                  )}
                </td>

                <td>
                  <div className="player-info">
                    <span>{player.FULL_NAME}</span>
                  </div>
                </td>

                <td style={{ textAlign: "center" }}>
                  {player.PLAYER_FACE_ICON ? (
                    <img
                      src={player.PLAYER_FACE_ICON}
                      alt="Player"
                      className="player-face"
                    />
                  ) : (
                    <span>No face</span>
                  )}
                </td>

                <td style={{ textAlign: "center" }}>{player.PLAYER_POSITION}</td>
                <td style={{ textAlign: "center" }}>{player.PLAYER_NATIONALITY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Players;
