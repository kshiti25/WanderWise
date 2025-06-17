import React from 'react';
import '../styles/HeroSection.scss';

function HeroSection({ onNext }) {
  return (
    <div className="hero">
      <h1>Welcome to WanderWise</h1>
      <p className="tagline">Your AI-powered travel companion</p>
      <p className="description">
        WanderWise helps you generate beautiful, personalized multi-day travel itineraries in seconds.
        Simply enter your destination, travel dates, preferences, and budget – and let our AI do the rest.
      </p>
      <p className="description">
        Fast, fun, and tailored just for you. No more hours spent planning. Let WanderWise be your guide.
      </p>

      <button onClick={onNext}>Create Your Itinerary →</button>

   </div>   
  );
}

export default HeroSection;