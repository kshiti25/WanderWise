import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate,useNavigate } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import DestinationForm from './components/DestinationForm';
import PreferencesForm from './components/PreferencesForm';
import FinalizeItinerary from './components/FinalizeItinerary';
import ItineraryResult from './components/ItineraryResult';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ResetPassword';
import './styles/App.scss';
import axios from 'axios';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/signin" />;
}

function FormFlow() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    return <Navigate to="/signin" replace />;
  }


  const handleNext = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin', { replace: true });
      return;
    }
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => setStep(step - 1);

  const handleDestinationSubmit = (data) => {
    setFormData({ ...formData, ...data });
    handleNext();
  };

  const handlePreferencesSubmit = (data) => {
    setFormData({ ...formData, ...data });
    handleNext();
  };

  const handleGenerate = async () => {
    setLoading(true); // Start loading
    setStep(4);
    try {
      const response = await axios.post('/api/generate-itinerary', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setItinerary(response.data.itinerary);
     
    } catch (err) {
      console.error('Failed to generate itinerary:', err);
    } finally {
      setLoading(false); // Stop loading
     
    }
  };
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin', { replace: true });
      }
    };
  
    checkAuth(); // check once on load
  
    const handlePopState = () => {
      checkAuth(); // check again on browser back/forward
    };
  
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
  
  
  

  const handleReset = () => {
    setStep(0);
    setFormData({});
    setItinerary('');
  };

  return (
    <div className="app">
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.replace('/signin'); // Prevent going back to /form
        }}
        className="logout-button"
      >
        Logout
      </button>

      {step === 0 && <HeroSection onNext={handleNext} />}
      {step === 1 && <DestinationForm onSubmit={handleDestinationSubmit} />}
      {step === 2 && <PreferencesForm onSubmit={handlePreferencesSubmit} onBack={handleBack} />}

      {step === 3 && <FinalizeItinerary onBack={handleBack} onGenerate={handleGenerate} formData={formData} />}
      {step === 4 && (
  loading ? (
    <div className="itinerary-result">
      <h2>Generating your itinerary...</h2>
      <p>Please wait a moment ⏳</p>
    </div>
  ) : (
    <ItineraryResult itinerary={itinerary} onReset={handleReset} />
  )
)}



    </div>
  );
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/form" element={<PrivateRoute><FormFlow /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;