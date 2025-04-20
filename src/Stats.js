import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Stats.css";

const StatsPage = () => {
  const [categories, setCategories] = useState([
    { title: "MOST GOALS", players: [] },
    { title: "MOST ASSISTS", players: [] }
  ]);
  const [modalPlayers, setModalPlayers] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [goalsRes, assistsRes] = await Promise.all([
          fetch("http://localhost:5000/api/top-goal-scorers"),
          fetch("http://localhost:5000/api/top-assisters")
        ]);
        const goalsData = await goalsRes.json();
        const assistsData = await assistsRes.json();

        setCategories([
          {
            title: "MOST GOALS",
            players: goalsData.map(player => ({
              name: player.FULL_NAME,
              stat: player.TOTAL_GOALS,
              image: "test3.png", // placeholder
              club: player.CLUB,
              clubBadge: player.CLUB_BADGE,
              position: player.POSITION,
              nationality: player.NATIONALITY
            }))
          },
          {
            title: "MOST ASSISTS",
            players: assistsData.map(player => ({
              name: player.FULL_NAME,
              stat: player.TOTAL_ASSISTS,
              image: "test4.png", // placeholder
              club: player.CLUB,
              clubBadge: player.CLUB_BADGE,
              position: player.POSITION,
              nationality: player.NATIONALITY
            }))
          }
        ]);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
    fetchStats();
  }, []);

  const openModal = (players, title) => {
    setModalPlayers(players);
    setModalTitle(title);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="container my-5">
      {categories.map((category, index) => (
        <div key={index} className="mb-5">
          <h2 className="neon-heading text-center">{category.title}</h2>
          <div className="row g-4 align-items-stretch">
            {category.players.slice(0, 4).map((player, idx) => (
              <div className="col-lg-3 col-md-6 col-sm-12" key={idx}>
                <div className="card player-card">
                  <img
                    src={`${process.env.PUBLIC_URL}/${player.image}`}
                    className="card-img-top player-img"
                    alt="Player"
                  />
                  <div className="card-body d-flex align-items-center">
                    <img
                      src={player.clubBadge}
                      className="club-logo"
                      alt="Club Logo"
                    />
                    <div className="ms-3">
                      <h5 className="card-title">{player.name}</h5>
                      <p className="card-text stat-number">{player.stat}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Button for Top 10 */}
            <div className="col-12 d-flex justify-content-center mt-3">
              <button
                className="view-top-btn"
                onClick={() => openModal(category.players, category.title)}
              >
                View Top 10
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="custom-modal" onClick={e => e.stopPropagation()}>
            <h3 className="modal-title">{modalTitle} - Top 10</h3>
            <button className="close-btn" onClick={closeModal}>×</button>
            <div className="modal-content">
              {modalPlayers.map((player, index) => (
                <div key={index} className="modal-player-card">
                  <img
                    src={`${process.env.PUBLIC_URL}/${player.image}`}
                    className="modal-player-img"
                    alt={player.name}
                  />
                  <div className="modal-player-details">
                    <strong>{player.name}</strong>
                    <p>
                      Club: <img src={player.clubBadge} alt="" style={{width: 20, height: 20, verticalAlign: "middle", marginRight: 6}} />
                      {player.club}
                    </p>
                    <p>Position: {player.position}</p>
                    <p>Nationality: {player.nationality}</p>
                  </div>
                  <div className="modal-player-statbox">
                    <div className="stat-label">
                      {modalTitle.includes("GOAL") ? "GOALS" : "ASSISTS"}
                    </div>
                    <div className="stat-value-neon">
                      {player.stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsPage;
