import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthForm.scss';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // 🚀 Redirect if already authenticated (optional: can check via a /me route later)
  useEffect(() => {
    // If you're fetching user info via /api/me, you could check for a session here.
    // Example: fetch('/api/me', { credentials: 'include' }) ...
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, and a number.');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // ✅ this is important for session cookies
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Signup failed');

      // ✅ User is authenticated via session – redirect directly
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
        <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password (min 8 chars, upper/lower/number)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        {error && <p className="error">{error}</p>}

        <p>Already have an account? <Link to="/signin">Back to Login</Link></p>
      </form>
    </div>
  );
}
