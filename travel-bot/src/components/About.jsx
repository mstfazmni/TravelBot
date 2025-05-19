import React from "react";
import "./About.css";
import travelDemo from "../assets/planner-img.jpg";

const About = ({ onStartPlanningClick }) => {
  return (
    <section className="about-section">
      <div className="about-content">

        {/* left section info */}
        <div className="left-sec-about">
          <h2>Discover the Future of Travel Planning</h2>
            <p>
              Let <strong>TravelBot</strong> craft your next adventure. 
              Explore hidden gems, build personalized itineraries, and chat with an AI travel assistant – all in one place.
            </p>
            <ul className="info-ul">
              <li>Tell Us Your Preferences</li>
              <li>Chat with the AI Bot</li>
              <li>Get Your Itinerary</li>
            </ul>
        </div>

        {/* right section questions */}
        <div className="right-section-about">
          <img src={travelDemo} alt="TravelBot Demo" className="planner-img-class"/>
          <p>Why TravelBot?</p>
            <ul className="why-question">
              <li>Saves hours of planning</li>
              <li>Discovers hidden gems</li>
              <li>Chat-based, interactive planning</li>
              <li>Mobile-friendly and fast</li>
            </ul>
        </div>   
      </div>
      
      {/* planning button */}
      <div className="btn-div-start">
            <button className="start-planning-btn" onClick={onStartPlanningClick}>
              Let's Plan Your Adventure
            </button>
        </div>
        <div className="divider"></div>

    </section>
  );
};

export default About;
