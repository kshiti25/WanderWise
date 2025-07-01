import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch('/api/check-auth', {
          credentials: 'include',
          cache: 'no-store'
        });
        setIsAuth(res.ok);
      } catch {
        setIsAuth(false);
      }
    };
    check();
  }, []);

  if (isAuth === null) return <p>Checking session...</p>;
  return isAuth ? children : <Navigate to="/signin" replace />;
}
