import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, onUnauthorized, element: Component, ...props }) {
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      onUnauthorized?.();
    }
  }, [isLoggedIn, onUnauthorized]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Component {...props} />;
}

export default ProtectedRoute;
