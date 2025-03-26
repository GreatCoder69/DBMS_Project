import React from "react";
import "./Results.css"; // Custom styles

const Results = () => {
  // Example match data
  const matches = [
    {
      date: "Monday 17 March 2025",
      stadium: "Old Trafford",
      homeTeam: "Leicester",
      awayTeam: "Man Utd",
      homeLogo: "/logo.png",
      awayLogo: "/logo.png",
      score: "1 - 3",
      homeScorer: "Jamie Vardy",
      awayScorers: ["Phil Jones", "Phil Jones", "Phil Jones"],
    },
    {
      date: "Monday 17 March 2025",
      stadium: "Old Trafford",
      homeTeam: "Leicester",
      awayTeam: "Man Utd",
      homeLogo: "/logo.png",
      awayLogo: "/logo.png",
      score: "1 - 3",
      homeScorer: "Jamie Vardy",
      awayScorers: ["Phil Jones", "Phil Jones", "Phil Jones"],
    },
    {
      date: "Monday 17 March 2025",
      stadium: "Old Trafford",
      homeTeam: "Leicester",
      awayTeam: "Man Utd",
      homeLogo: "/logo.png",
      awayLogo: "/logo.png",
      score: "1 - 3",
      homeScorer: "Jamie Vardy",
      awayScorers: ["Phil Jones", "Phil Jones", "Phil Jones"],
    },
  ];

  return (
    <div className="container mt-4">
      {matches.map((match, index) => (
        <div key={index} className="card match-card mb-3">
          <div className="card-body">
            <h5 className="match-date">{match.date}</h5>
            <h6 className="stadium">{match.stadium}</h6>
            <div className="d-flex align-items-center justify-content-center">
              <div className="team">
                <span className="team-name">{match.homeTeam}</span>
                <img src={match.homeLogo} alt={match.homeTeam} className="team-logo mx-2" />
              </div>
              <span className="score">{match.score}</span>
              <div className="team">
                <img src={match.awayLogo} alt={match.awayTeam} className="team-logo mx-2" />
                <span className="team-name">{match.awayTeam}</span>
              </div>
            </div>
            {/* Goal Scorers */}
            <div className="goal-scorers">
              <div className="home-scorer">
                <img src="/logo.png" alt="Goal" className="goal-icon" />
                <span>{match.homeScorer}</span>
              </div>
              <div className="away-scorers">
                {match.awayScorers.map((scorer, i) => (
                  <div key={i} className="away-scorer">
                    <img src="/logo.png" alt="Goal" className="goal-icon" />
                    <span>{scorer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
