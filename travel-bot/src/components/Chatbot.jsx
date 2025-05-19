import React, {useState} from "react";
import './Chatbot.css';
import chatbotIllustration from "../assets/chatbot.png";
import { getBotResponse } from "../api/openai";


const questions = [
  "Which city and country are you planning to visit?",
  "What type of destination do you prefer? (beach, city, nature, historical)",
  "How many days do you want to travel?",
  "What is your budget? (low, medium, high)",
  "What are your main interests? (hiking, food, culture, relaxation)"
];

const Chatbot = ({ onPlansReady }) => {
    const [messages, setMessages] = useState([{sender: "bot", text: questions[0] }]); // start by asking first question
    const [input, setInput] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);

     const handleSend = async () => {
        const userMsg = input.trim();
        if (!userMsg) return;

        setMessages([...messages, { sender: "user", text: userMsg }]);
        setInput("");

        if(currentQuestion < questions.length - 1) {
            // save answer
            setAnswers((prev)=> [...prev, userMsg]);
            // ask next question
            const nextQ = currentQuestion + 1;
            setCurrentQuestion(nextQ);
            setMessages((prev)=> [...prev, { sender: "bot", text: questions[nextQ] }]);
        } else {
            // last question answerd
            setAnswers((prev)=> [...prev, userMsg]);

             // Prepare prompt with all answers for openai
            const prompt = `
                Please provide 3 travel plans as numbered lists, each with a title and details like duration, places to visit, and activities. Format like:

                Plan 1:
                - Title: ...
                - Duration: ...
                - Places to visit: ...
                - Activities: ...

                Plan 2:
                - ...
                
                Plan 3:
                - ...
                itineraries based on these answers:\n
                - Destination type: ${[...answers, userMsg][0]}
                - Travel duration: ${[...answers, userMsg][1]} days
                - Budget: ${[...answers, userMsg][2]}
                - Interests: ${[...answers, userMsg][3]}

                Include a unique highlight and estimated cost for each plan.
                Also suggest one drop-in experience that can be added to any plan.
                `;

            // show a loading message
            setMessages((prev)=> [...prev, {sender: "bot" , text: "Let me plan your trip..."}]);

            // call openai
            const botReply = await getBotResponse(prompt);
            // sendig the plans to home page
            onPlansReady(botReply);

            // remove loading message and show a message that plans are ready
            setMessages((prev) => {
                const withoutLoading = prev.filter(msg => msg.text !== "Let me plan your trip...");
                return [...withoutLoading, {sender: "bot", text: "Here are 3 personalized travel plans for you! See them below 👇"}];
            });

            setCurrentQuestion(currentQuestion + 1);
            setAnswers([]);
        }
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
                        placeholder={currentQuestion < questions.length ? "Your answer..." : "Type anything..."}
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                        disabled={currentQuestion > questions.length} // disable after done
                        />
                        <button onClick={handleSend} disabled={currentQuestion > questions.length}>Send</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Chatbot;
