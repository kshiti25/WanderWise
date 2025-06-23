import React from 'react';
import '../styles/FinalizeItinerary.scss';
import useRequireAuth from '../hooks/useRequireAuth';

function FinalizeItinerary({ onBack, onGenerate, formData }) {
  const {
    destination,
    startDate,
    endDate,
    style,
    budget,
    interests,
    notes,
    tripType
  } = formData;
  useRequireAuth();

  

  return (
    <div className="finalize">
      <h2>Review Your Trip Details</h2>
      <div className="summary">
        <div className="row"><span>📍 Destination:</span><strong>{destination}</strong></div>
        <div className="row"><span>📅 Dates:</span><strong>{startDate} to {endDate}</strong></div>
        <div className="row"><span>🎒 Trip Type:</span><strong>{tripType}</strong></div>
        <div className="row"><span>🧳 Style:</span><strong>{style}</strong></div>
        <div className="row"><span>💰 Budget:</span><strong>{budget} / 5</strong></div>
        <div className="row"><span>🎯 Interests:</span><strong>{interests?.join(', ') || 'None selected'}</strong></div>
        {notes && <div className="row"><span>📝 Notes:</span><strong>{notes}</strong></div>}
      </div>

      <div className="actions">
        <button onClick={onBack}>Previous</button>
        <button onClick={onGenerate}>Generate Itinerary</button>
      </div>
    </div>
  );
}

export default FinalizeItinerary; 