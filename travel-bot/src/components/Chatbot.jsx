import React from "react";
import './Chatbot.css';
import chatbotIllustration from "../assets/chatbot.png";


const Chatbot = () => {
    return(
        <section className="chatbot-page" id="chatbot">
            <div className="chatbot-container">
                {/* left intro */}
                <div className="chatbot-info">
                    <h2>Talk to TravelBot</h2>
                    <p>
                        Ask anything from “Where should I go in Italy?” to “Build me a 5-day trip in Japan”.
                        TravelBot gives instant answers and plans tailored just for you.
                    </p>
                    <img src={chatbotIllustration} alt="Chatbot illustration" className="chatbot-img"/>
                </div>

                {/* Right sec caht window */}
                <div className="chat-window">
                    <div className="chat-messages">
                        {/* it'll be dynamic */}
                        <div className="message bot">👋 Hi! Where are you planning to go?</div>
                        <div className="message user">Somewhere warm with beaches!</div>
                        <div className="message bot">🏖️ How about Bali or Cancun? I can build an itinerary for you!</div>                    
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Ask TravelBot anything..." />
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Chatbot;
