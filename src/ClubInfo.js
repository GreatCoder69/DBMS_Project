import React, { useState, useEffect } from 'react';
import './ClubInfo.css';

const placeholderBadge = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png';
const placeholderPlayerFace = 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/No_picture_available.png/800px-No_picture_available.png';
const placeholderStadium = 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?auto=format&fit=crop&w=800&q=80';

const ClubList = () => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clubsRes = await fetch('http://localhost:5000/api/club-players');
        if (!clubsRes.ok) throw new Error('Network response was not ok');
        const clubsData = await clubsRes.json();

        // Group clubs by TEAM_ID
        const clubMap = {};
        clubsData.forEach(row => {
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
              player_id: row.PLAYER_ID,
              player_name: row.PLAYER_NAME,
              position: row.POSITION,
              nationality: row.NATIONALITY,
              player_icon: row.FACE || placeholderPlayerFace
            });
          }
        });
        setClubs(Object.values(clubMap));
        setFilteredClubs(Object.values(clubMap)); // Initialize filtered clubs
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim().toLowerCase();
      if (query === '') {
        setFilteredClubs(clubs);
        return;
      }
      const filtered = clubs.filter(club =>
        club.club_name.toLowerCase().includes(query)
      );
      setFilteredClubs(filtered);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setFilteredClubs(clubs);
  };

  const openModal = (club) => setSelectedClub(club);
  const closeModal = () => setSelectedClub(null);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="club-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by club name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
        <button onClick={handleClear} className="clear-btn">Clear</button>
      </div>

      <div className="club-list">
        {filteredClubs.map((club, index) => (
          <div className="club-card" key={index} onClick={() => openModal(club)}>
            <img src={club.club_badge} alt="club badge" className="club-badge" />
            <h4 className="club-name">{club.club_name}</h4>
          </div>
        ))}
      </div>

      {selectedClub && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="club-modal" onClick={e => e.stopPropagation()}>
            <h2>{selectedClub.club_name}</h2>
            <div className="modal-info">
              <img src={selectedClub.club_badge} alt="badge" className="modal-badge" />
              <p><strong>Founded:</strong> {selectedClub.founded_year}</p>
              <p><strong>Previous Titles:</strong> {selectedClub.prev_titles || 0}</p>
              <p><strong>Stadium:</strong> {selectedClub.stadium_name}</p>
              <p><strong>Stadium Capacity:</strong> {selectedClub.stadium_capacity}</p>
            </div>
            {/* Stadium Image */}
            <img src={selectedClub.stadium_image} alt="stadium" className="stadium-image" />

            {/* Players Heading with Neon Effect */}
            <h4 className="players-heading">Players</h4>

            <table className="table table-dark">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Nationality</th>
                </tr>
              </thead>
              <tbody>
                {selectedClub.players.length > 0 ? (
                  selectedClub.players.map((player, idx) => (
                    <tr key={idx}>
                      <td><img src={player.player_icon} alt="Player" className="player-face" /></td>
                      <td>{player.player_name}</td>
                      <td>{player.position}</td>
                      <td>{player.nationality}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={4}>No players found</td></tr>
                )}
              </tbody>
            </table>
            <button onClick={closeModal} className="btn btn-outline-light">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClubList;
