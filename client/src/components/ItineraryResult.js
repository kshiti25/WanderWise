import React, { useRef, useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import '../styles/ItineraryResult.scss';

function ItineraryResult({ itinerary, onReset }) {
  const componentRef = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (componentRef.current && itinerary) {
      setReady(true);
    }
  }, [itinerary]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef, // ✅ updated to new API
    documentTitle: 'WanderWise_Itinerary',
    removeAfterPrint: true,
  });

  return (
    <div className="itinerary-result">
      <h2>Your Generated Itinerary</h2>

      <div className="print-container" ref={componentRef}>
        <pre>{itinerary || 'No itinerary available to print.'}</pre>
      </div>

      <div className="actions">
        <button onClick={onReset}>Start Over</button>
        <button onClick={handlePrint} disabled={!ready}>
          Export as PDF
        </button>
      </div>
    </div>
  );
}

export default ItineraryResult;
