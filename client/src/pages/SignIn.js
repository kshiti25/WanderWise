import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/AuthForm.scss';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ✅ Force logout on /signin (to block forward nav abuse)
  useEffect(() => {
    const destroySession = async () => {
      try {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' });
        localStorage.clear();
      } catch {}
    };
    destroySession();
  }, []);

  // ✅ Disable browser back on /signin (to prevent form -> signin -> back to form)
  useEffect(() => {
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ✅ Redirect if already logged in (redundant but safe)
  useEffect(() => {
    const checkIfAlreadyLoggedIn = async () => {
      try {
        const res = await fetch('/api/check-auth', {
          credentials: 'include',
          cache: 'no-store',
        });
        if (res.ok) {
          window.location.replace('/form'); // Already logged in
        }
      } catch {}
    };
    checkIfAlreadyLoggedIn();
  }, []);

  // ✅ Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      navigate('/form', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="signin-container">
      <div className="intro-section">
        <h1>🌍 Welcome to WanderWise</h1>
        <p>
          Plan your perfect trip with AI-powered personalized itineraries based on your budget,
          interests, and travel style.
        </p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
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
