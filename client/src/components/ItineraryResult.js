import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../styles/ItineraryResult.scss';
import useRequireAuth from '../hooks/useRequireAuth';

function ItineraryResult({ itinerary, onReset }) {
  const componentRef = useRef();
  useRequireAuth();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'WanderWise_Itinerary',
    removeAfterPrint: true,
  });

  return (
    <div className="itinerary-result">
      <h2>Your Generated Itinerary</h2>

      {itinerary ? (
        <div ref={componentRef} className="print-container">
          <pre>{itinerary}</pre>
        </div>
      ) : (
        <p className="empty-msg">Itinerary is empty. Please generate one before exporting.</p>
      )}

      <div className="actions">
        <button onClick={onReset}>Start Over</button>
        <button onClick={handlePrint} disabled={!itinerary}>
          Export as PDF
        </button>
      </div>
    </div>
  );
}

export default ItineraryResult;
