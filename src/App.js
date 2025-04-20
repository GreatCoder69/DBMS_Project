import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Results from "./Results";
import Players from "./Players";
import Standings from "./Standings";
import Stats from "./Stats";
import ClubInfo from "./ClubInfo";
import "./App.css";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/results" element={<Results />} />
            <Route path="/players" element={<Players />} />
            <Route path="/standings" element={<Standings />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/clubinfo" element={<ClubInfo />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
