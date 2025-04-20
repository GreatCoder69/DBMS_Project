import React, { useEffect, useState } from 'react';
import './ClubInfo.css';

const placeholderBadge = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
const placeholderStadium = 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80';

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    // Fetch all club-player data from backend
    fetch('http://localhost:5000/api/club-players')
      .then(res => res.json())
      .then(data => {
        // Group players by club
        const clubMap = {};
        data.forEach(row => {
          const clubId = row.TEAM_ID;
          if (!clubMap[clubId]) {
            clubMap[clubId] = {
              club_name: row.CLUB_NAME,
              club_badge: row.CLUB_BADGE || placeholderBadge,
              founded_year: row.FOUNDED_YEAR,
              prev_titles: row.PREV_TITLES,
              stadium_name: row.STADIUM_NAME,
              stadium_capacity: row.STADIUM_CAPACITY,
              stadium_image: row.STADIUM_IMAGE || placeholderStadium,
              players: []
            };
          }
          if (row.PLAYER_ID) {
            clubMap[clubId].players.push({
              sl_no: row.SL_NO,
              player_name: row.PLAYER_NAME,
              position: row.POSITION,
              nationality: row.NATIONALITY
            });
          }
        });
        setClubs(Object.values(clubMap));
      });
  }, []);

  const openModal = (club) => setSelectedClub(club);
  const closeModal = () => setSelectedClub(null);

  return (
    <div className="club-container text-light">
      {clubs.map((club, index) => (
        <div className="club-card neon-glow" key={index} onClick={() => openModal(club)}>
          <img src={club.club_badge || placeholderBadge} alt="badge" className="club-badge" />
          <h4 className="club-name">{club.club_name}</h4>
        </div>
      ))}

      {selectedClub && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="club-modal" onClick={e => e.stopPropagation()}>
            <h2 className="text-center">{selectedClub.club_name}</h2>
            <div className="text-center">
              <img src={selectedClub.club_badge || placeholderBadge} alt="club badge" className="modal-badge" />
            </div>
            <div className="modal-info">
              <p><strong>Founded:</strong> {selectedClub.founded_year || "N/A"}</p>
              <p><strong>Previous Titles:</strong> {selectedClub.prev_titles || 0}</p>
              <p><strong>Stadium:</strong> {selectedClub.stadium_name || "N/A"}</p>
              <p><strong>Stadium Capacity:</strong> {selectedClub.stadium_capacity || "N/A"}</p>
            </div>
            <div className="text-center mt-3">
              <img src={selectedClub.stadium_image || placeholderStadium} alt="stadium" className="stadium-image" />
            </div>
            <h4 className="text-center mt-4">Players</h4>
            <div className="table-responsive">
              <table className="table table-dark table-bordered text-center">
                <thead className="table-neon">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Nationality</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedClub.players.length > 0 ? (
                    selectedClub.players.map((player, idx) => (
                      <tr key={idx}>
                        <td>{player.sl_no}</td>
                        <td>{player.player_name}</td>
                        <td>{player.position}</td>
                        <td>{player.nationality}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>No players found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className="btn btn-outline-light mt-3" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubList;
