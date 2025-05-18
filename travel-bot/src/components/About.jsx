import React from "react";
import "./About.css";

const About = ({ onStartPlanningClick }) => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>Discover the Future of Travel Planning</h2>
        <p>
          Let <strong>TravelBot</strong> craft your next adventure. 
          Explore hidden gems, build personalized itineraries, and chat with an AI travel assistant – all in one place.
        </p>
        <button className="start-planning-btn" onClick={onStartPlanningClick}>
          Start Planning
        </button>
      </div>
    </section>
  );
};

export default About;
