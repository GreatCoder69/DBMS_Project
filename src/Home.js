import React from "react";
import "./Home.css";

const Home = () => {
  const cardData = [
    { 
      title: "Take a look at all results", 
      desc: "Want a trip down memory lane or relive the matches? Check out the results page", 
      btnText: "Go to Results", 
      link: "/results",
      img: "/home3.png"
    },
    { 
      title: "Check out the players", 
      desc: "Want to know how your favourite players performed last season? Check out the players page", 
      btnText: "Go to Players", 
      link: "/players",
      img: "/home2.png"
    },
    { 
      title: "Check out the standings", 
      desc: "Interested to know where your favourite team ended up last season? Check out the standings page", 
      btnText: "Go to Standings", 
      link: "/standings",
      img: "/home1.png"
    },
    { 
      title: "Take a look at the season stats", 
      desc: "Intrigued by how your favourite players performed against each other accross the season?", 
      btnText: "Go to Stats", 
      link: "/stats",
      img: "/home4.png"
    }
  ];

  return (
    <div className="cards-container">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <img src={card.img} alt="Card" className="card-img" />
          <div className="card-body">
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
            <div className="btn-container">
              <a href={card.link} className="card-btn">{card.btnText}</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
