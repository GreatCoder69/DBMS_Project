import React from "react";
import "./Home.css";

const Hero = () => {
  return (
    <div className="hero-container">
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={`${process.env.PUBLIC_URL}/hero.mp4`} type="video/mp4" />
      </video>
    </div>
  );
};

export default Hero;
