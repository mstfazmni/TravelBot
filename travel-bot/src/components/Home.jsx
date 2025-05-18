import './Home.css';

export default function Home() {
  return (
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
        <button className='btn-start'>Start Planning</button>
    </div>
   </div>
  );
}
