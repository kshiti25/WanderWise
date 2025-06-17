import React from 'react';
import '../styles/ItineraryResult.scss';

function ItineraryResult({ itinerary, onReset }) {
  return (
    <div className="itinerary-result">
      <h2>Your Generated Itinerary</h2>
      <pre>{itinerary}</pre>
      <div className="actions">
        <button onClick={onReset}>Start Over</button>
      </div>
    </div>
  );
}

export default ItineraryResult;