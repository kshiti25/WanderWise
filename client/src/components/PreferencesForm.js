import React, { useState } from 'react';
import '../styles/PreferenceForm.scss';


function PreferencesForm({ onSubmit, onBack }) {
  const [budget, setBudget] = useState(3);
  const [interests, setInterests] = useState([]);
  const [style, setStyle] = useState('');
  const [notes, setNotes] = useState('');

  

  const handleCheckboxChange = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ budget, interests, style, notes });
  };


  return (
    <form className="preferences-form" onSubmit={handleSubmit}>
      <h2>Customize Your Experience</h2>
      <p className="subheading">Let us know your preferences</p>

      <label htmlFor="budget">Budget (1 = Low, 5 = Luxury): {budget}</label>
      <input
  type="range"
  id="budget"
  min="1"
  max="5"
  value={budget}
  onChange={(e) => setBudget(Number(e.target.value))}
/>



      <label>Interests</label>
      <div className="checkbox-group">
        {['Food', 'History', 'Nature', 'Nightlife', 'Shopping'].map(interest => (
          <label key={interest}>
            <input
              type="checkbox"
              checked={interests.includes(interest)}
              onChange={() => handleCheckboxChange(interest)}
            />
            {interest}
          </label>
        ))}
      </div>

      <label htmlFor="style">Travel Style</label>
      <select id="style" value={style} onChange={(e) => setStyle(e.target.value)} required>
        <option value="">Select travel style</option>
        <option value="Relaxed">Relaxed</option>
        <option value="Balanced">Balanced</option>
        <option value="Fast-Paced">Fast-Paced</option>
      </select>

      <label htmlFor="notes">Any special requests or notes?</label>
      <textarea
        id="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        placeholder="E.g., vegan food, wheelchair accessibility, etc."
      ></textarea>

      <div className="actions">
        <button type="button" className="back" onClick={onBack}>Back</button>
        <button type="submit" className="next">Next</button>
      </div>
    </form>
  );
}

export default PreferencesForm;
