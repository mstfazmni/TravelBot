import React, {useState} from "react";
import './Chatbot.css';
import chatbotIllustration from "../assets/chatbot.png";
import { getBotResponse } from "../api/openai";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

     const handleSend = async () => {
        const userMsg = input.trim();
        if (!userMsg) return;

        setMessages([...messages, { sender: "user", text: userMsg }]);
        setInput("");

        const botReply = await getBotResponse(userMsg);
        setMessages(prev => [...prev, { sender: "bot", text: botReply }]);
     };



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
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                            {msg.text}
                    </div>
                        ))}
                </div>

                    <div className="chat-input">
                        <input 
                        type="text"
                        placeholder="Ask TravelBot anything..." 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        />
                        <button onClick={handleSend}>Send</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Chatbot;
