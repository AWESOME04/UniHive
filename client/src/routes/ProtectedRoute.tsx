import { Navigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useAppSelector } from '../store';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [shouldRedirect, setShouldRedirect] = useState(true);
  
  useEffect(() => {
    // Check if token exists in localStorage using environment variable key
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY || 'unihive_token');
    
    // Only redirect if there's no authentication (either via Redux or token)
    if (isAuthenticated || token) {
      setShouldRedirect(false);
    } else {
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;
