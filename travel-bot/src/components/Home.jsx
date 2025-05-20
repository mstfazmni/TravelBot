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
  // const samplePlansText = `
  // Plan 1:
  // - Title: Beach Bliss in Bali
  // - Duration: 5 days
  // - Places to visit: Seminyak, Ubud, Nusa Penida
  // - Activities: Surfing, temple visits, beach lounging
  // - Highlight: Sunset at Uluwatu Temple
  // - Estimated Cost: $1200

  // Plan 2:
  // - Title: Culture and Cuisine in Kyoto
  // - Duration: 7 days
  // - Places to visit: Arashiyama, Gion, Fushimi Inari
  // - Activities: Tea ceremonies, temple hopping, sushi-making class
  // - Highlight: Night walk through historic Gion
  // - Estimated Cost: $1600

  // Plan 3:
  // - Title: Adventure in Banff
  // - Duration: 4 days
  // - Places to visit: Lake Louise, Moraine Lake, Banff Town
  // - Activities: Hiking, wildlife spotting, canoeing
  // - Highlight: Sunrise hike to Johnston Canyon
  // - Estimated Cost: $900

  // Drop-in Experience: 
  // - Add a hot air balloon ride in Cappadocia to any plan for a magical experience.
  // `;

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

            {/* svg devider for under Home and before About */}
            <div className="custom-shape-divider-bottom-home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="aboutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                  </linearGradient>
                </defs>
                <path
                        d="M985.66,26.56c-63.06,20.71-130.14,27.4-196.57,20.89C699.6,
                        40.19,624.89,18.23,558,10.75,488.51,3,418.61,10.91,349.74,25.84c-59.66,
                        12.59-112.88,29-171.75,35.3C114.3,68.27,56.14,61.58,0,49.39V120H1200V0C1123.06,
                        22.88,1055.18,5.85,985.66,26.56Z"
                        
                  fill="url(#aboutGradient)"
                ></path>
              </svg>
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
        {/* {<Plans plansText={samplePlansText} />} for testing purposes */}
    </>
  );
}
export default Home;