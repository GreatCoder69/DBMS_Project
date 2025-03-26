import { Link } from "react-router-dom";
import "./Header.css"; // Import CSS file

const Header = () => {
  return (
    <>
      {/* Purple Top Bar */}
      <div className="top-bar">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" />
        <h5>FOOTBALL DB</h5>
      </div>

      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/results">Results</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/players">Players</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/standings">Standings</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/stats">Stats</Link>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
    </>
  );
};

export default Header;
