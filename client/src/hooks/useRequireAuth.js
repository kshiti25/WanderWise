import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useRequireAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // No token = force redirect
    if (!token) {
      navigate('/signin', { replace: true });
    }

    const handlePopState = () => {
      const t = localStorage.getItem('token');
      if (!t) {
        navigate('/signin', { replace: true });
      }
    };

    // Listen for browser back/forward
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);
}
