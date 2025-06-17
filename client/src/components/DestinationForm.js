import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/DestinationForm.scss';

function DestinationForm({ onSubmit }) {
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tripType, setTripType] = useState('');
  const [customTripType, setCustomTripType] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      destination,
      startDate: startDate?.toISOString().split('T')[0],
      endDate: endDate?.toISOString().split('T')[0],
      tripType: tripType === 'Other' ? customTripType : tripType
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Create Your Travel Itinerary</h2>
      <p className="subheading">Tell us about your destination and travel dates</p>

      <label htmlFor="destination">Destination</label>
      <input
        id="destination"
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="City, Country"
        required
      />

<div className="date-row">
  <div>
    <label htmlFor="startDate">Start Date</label>
    <DatePicker
      id="startDate"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      placeholderText="mm/dd/yyyy"
      dateFormat="yyyy-MM-dd"
      required
    />
  </div>
  <div>
    <label htmlFor="endDate">End Date</label>
    <DatePicker
      id="endDate"
      selected={endDate}
      onChange={(date) => setEndDate(date)}
      placeholderText="mm/dd/yyyy"
      dateFormat="yyyy-MM-dd"
      minDate={startDate}
      required
    />
  </div>
</div>






<label htmlFor="tripType">Trip Type</label>
<select
  id="tripType"
  value={tripType}
  onChange={(e) => {
    const value = e.target.value;
    setTripType(value);
    if (value !== 'Other') {
      setCustomTripType(''); // clear custom input
    }
  }}
  required
>
  <option value="">Select your trip type</option>
  <option value="Honeymoon">Honeymoon</option>
  <option value="Nature Escape">Nature Escape</option>
  <option value="Adventure Trip">Adventure Trip</option>
  <option value="Food Tour">Food Tour</option>
  <option value="Other">Other</option>
</select>

{tripType === 'Other' && (
  <input
    type="text"
    placeholder="Please describe your trip type"
    value={customTripType}
    onChange={(e) => setCustomTripType(e.target.value)}
    required
  />
)}


      <div className="actions">
        <button type="submit">Next Step</button>
      </div>
    </form>
  );
}

export default DestinationForm;