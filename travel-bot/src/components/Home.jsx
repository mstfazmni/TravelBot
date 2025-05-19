import { useRef, useState } from "react";
import About from "./About";
import Chatbot from "./Chatbot";
import Plans from "./Plans";
import "./Home.css";

 function Home() {
    const aboutRef = useRef(null);
    const [plansText, setPlansText] = useState(null);

    const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToChatbot = () => {
    const chatbotSection = document.getElementById("chatbot");
    chatbotSection?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlansReady = (plans) => {
    setPlansText(plans);
  };

  return (
    <>
        <div className='home-container'>
            <video
                className="video-bg"
                autoPlay
                loop
                muted
                playsInline
                src="https://videos.pexels.com/video-files/26753947/12000222_1920_1080_30fps.mp4"
                type="video/mp4"
            />
            <div className="hero-overlay"></div>
            <div className='home-content'>
                <h1>Plan Smarter Trips with <span className='highlight'>TravelBot</span></h1>
                <p>Your AI-powerd travel planner</p>
                <button className='btn-start' onClick={scrollToAbout}>Learn More</button>
            </div>
        </div>

        {/* About Section */}
        <div ref={aboutRef}>
            <About onStartPlanningClick={scrollToChatbot}/>
        </div>

        {/* Chatbot section */}
        <div id="chatbot">
            <Chatbot onPlansReady={handlePlansReady}/>
        </div>

        {/* Plans Section: show only when plans are ready */}
        {plansText && <Plans plansText={plansText} />}
    </>
  );
}
export default Home;