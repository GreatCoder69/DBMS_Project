import React from "react";
import "./Stats.css";

const Stats = () => {
  const stats = {
    goals: [
      { position: 1, name: "Mohamed Salah", club: "Liverpool", value: 27 },
      { position: 2, name: "Erling Haaland", club: "Man City", value: 21 },
      { position: 3, name: "Alexander Isak", club: "Newcastle", value: 19 },
      { position: 4, name: "Chris Wood", club: "Nott'm Forest", value: 18 },
      { position: 5, name: "Bryan Mbeumo", club: "Brentford", value: 15 },
    ],
    assists: [
      { position: 1, name: "Mohamed Salah", club: "Liverpool", value: 17 },
      { position: 2, name: "Mikkel Damsgaard", club: "Brentford", value: 10 },
      { position: 3, name: "Antonee Robinson", club: "Fulham", value: 10 },
      { position: 4, name: "Bukayo Saka", club: "Arsenal", value: 10 },
      { position: 5, name: "Bruno Fernandes", club: "Man Utd", value: 9 },
    ],
    passes: [
      { position: 1, name: "Virgil van Dijk", club: "Liverpool", value: 2262 },
      { position: 2, name: "Levi Colwill", club: "Chelsea", value: 2098 },
      { position: 3, name: "William Saliba", club: "Arsenal", value: 1913 },
      { position: 4, name: "Josko Gvardiol", club: "Man City", value: 1854 },
      { position: 5, name: "Jan Paul van Hecke", club: "Brighton", value: 1773 },
    ],
    cleanSheets: [
      { position: 1, name: "Matz Sels", club: "Nott'm Forest", value: 12 },
      { position: 2, name: "David Raya", club: "Arsenal", value: 11 },
      { position: 3, name: "Dean Henderson", club: "Crystal Palace", value: 9 },
      { position: 4, name: "Jordan Pickford", club: "Everton", value: 9 },
      { position: 5, name: "Alisson Becker", club: "Liverpool", value: 8 },
    ],
  };


  return (
    <div className="player-stats">
      <h2>2024/25 Player Stats</h2>
      <div className="stats-container">
        {Object.entries(stats).map(([category, players], index) => (
          <div key={category} className="stat-box">
            <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
            <div className="top-player">
              <img src="/logo.png" alt={players[0].name} className="player-img" />
              <div className="player-info">
                <h4>{players[0].name}</h4>
                <p>{players[0].club}</p>
                <span className="big-stat">{players[0].value}</span>
              </div>
            </div>
            <ul className="stat-list">
              {players.slice(1).map((player) => (
                <li key={player.position} className="stat-item">
                  <span className="position">{player.position}</span>
                  <span className="player-name">{player.name}</span>
                  <span className="stat-value">{player.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
