import React, { useState, useEffect } from "react";
import "./Results.css";

const Results = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/matches");
        if (!res.ok) throw new Error("Failed to fetch match data");

        const data = await res.json();

        const grouped = {};
        data.forEach((item) => {
          const matchId = item.MATCH_ID;
          if (!grouped[matchId]) {
            grouped[matchId] = {
              id: matchId,
              date: item.MATCH_DATE,
              stadium: item.STADIUM_NAME,
              team1: {
                name: item.HOME_TEAM_NAME,
                logo: item.HOME_TEAM_BADGE,
                possession: item.MATCH_HOME_POSSESSION,
                scorers: [],
              },
              team2: {
                name: item.AWAY_TEAM_NAME,
                logo: item.AWAY_TEAM_BADGE,
                possession: item.MATCH_AWAY_POSSESSION,
                scorers: [],
              },
              score: `${item.MATCH_HOME_SCORE} - ${item.MATCH_AWAY_SCORE}`,
            };
          }

          const scorerInfo = `${item.SCORER_NAME} ${item.EVENT_MINUTE}'`;
          if (item.SCORER_TEAM_BADGE === item.HOME_TEAM_BADGE) {
            grouped[matchId].team1.scorers.push(scorerInfo);
          } else {
            grouped[matchId].team2.scorers.push(scorerInfo);
          }
        });

        setMatches(Object.values(grouped));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <div className="loading-message">Loading matches...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="results-container">
      {matches.map((match) => (
        <div key={match.id} className="match-card">
          <div className="match-header">
            <h3>{match.stadium}</h3>
            <p>{new Date(match.date).toLocaleDateString()}</p>
          </div>

          <div className="match-details">
            {/* Team 1 */}
            <div className="team">
              <img src={match.team1.logo} alt={match.team1.name} className="team-logo" />
              <div className="team-name">{match.team1.name}</div>
              {match.team1.scorers.length > 0 ? (
                match.team1.scorers.map((s, i) => (
                  <div key={i} className="scorer">{s}</div>
                ))
              ) : (
                <div className="scorer">No scorers</div>
              )}
            </div>

            {/* Score */}
            <div className="score-box">{match.score}</div>

            {/* Team 2 */}
            <div className="team">
              <img src={match.team2.logo} alt={match.team2.name} className="team-logo" />
              <div className="team-name">{match.team2.name}</div>
              {match.team2.scorers.length > 0 ? (
                match.team2.scorers.map((s, i) => (
                  <div key={i} className="scorer">{s}</div>
                ))
              ) : (
                <div className="scorer">No scorers</div>
              )}
            </div>
          </div>

          {/* Possession Bar */}
          <div className="possession-heading">Possession</div>
          <div className="possession-bar">
            <div
              className="possession-segment team1"
              style={{ width: `${match.team1.possession}%` }}
            />
            <div
              className="possession-segment team2"
              style={{ width: `${match.team2.possession}%` }}
            />
          </div>
          <div className="possession-percentages">
            <span>{match.team1.possession}%</span>
            <span>{match.team2.possession}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
