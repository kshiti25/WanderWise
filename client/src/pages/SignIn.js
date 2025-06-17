import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import '../styles/AuthForm.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      localStorage.setItem('token', data.token);
      navigate('/form');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-container">
    <div className="intro-section">
      <h1>🌍 Welcome to WanderWise</h1>
      <p>Plan your perfect trip with AI-powered personalized itineraries based on your budget, interests, and travel style.</p>
    </div>
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      <input type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      <p><Link to="/reset-password">Forgot Password?</Link></p>
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      {error && <p className="error">{error}</p>}
    </form>
    </div>
  );
}
