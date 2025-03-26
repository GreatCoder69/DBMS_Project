import React from "react";
import "./Standings.css";

const Standings = () => {
  const teams = [
    { position: 1, club: "Liverpool", played: 29, won: 21, drawn: 7, lost: 1, gf: 69, ga: 27, gd: 42, points: 70, accent: "blue" },
    { position: 2, club: "Arsenal", played: 29, won: 16, drawn: 10, lost: 3, gf: 53, ga: 24, gd: 29, points: 58, accent: "blue" },
    { position: 3, club: "Nottingham Forest", played: 29, won: 16, drawn: 6, lost: 7, gf: 49, ga: 35, gd: 14, points: 54, accent: "blue" },
    { position: 4, club: "Chelsea", played: 29, won: 14, drawn: 7, lost: 8, gf: 53, ga: 37, gd: 16, points: 49, accent: "blue" },
    { position: 5, club: "Manchester City", played: 29, won: 14, drawn: 6, lost: 9, gf: 55, ga: 40, gd: 15, points: 48, accent: "orange" },
    { position: 6, club: "Newcastle United", played: 28, won: 14, drawn: 5, lost: 9, gf: 47, ga: 38, gd: 9, points: 47, accent: "orange" },
    { position: 7, club: "Brighton And Hove Albion", played: 29, won: 12, drawn: 11, lost: 6, gf: 48, ga: 42, gd: 6, points: 47, accent: "green" },
    { position: 8, club: "Fulham", played: 29, won: 12, drawn: 9, lost: 8, gf: 43, ga: 38, gd: 5, points: 45, accent: "" },
  ];

  return (
    <div className="standings-table">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Club</th>
            <th>Played</th>
            <th>Won</th>
            <th>Drawn</th>
            <th>Lost</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={index} className={`accent-${team.accent || "default"}`}>
              <td>{team.position}</td>
              <td className="club-info">
                <img src="/logo.png" alt={team.club} className="club-img" />
                <span>{team.club}</span>
              </td>
              <td>{team.played}</td>
              <td>{team.won}</td>
              <td>{team.drawn}</td>
              <td>{team.lost}</td>
              <td>{team.gf}</td>
              <td>{team.ga}</td>
              <td>{team.gd}</td>
              <td className="bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Standings;
