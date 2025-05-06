import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../../services/authService';
import { useAppDispatch } from '../../store';
import { setCredentials } from '../../store/slices/authSlice';

/**
 * A wrapper component that protects routes from unauthenticated access
 * Redirects to login if user is not authenticated
 */
const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if token exists
        if (authService.isAuthenticated()) {
          // Verify token by fetching current user
          const response = await authService.getCurrentUser();
          
          // Update Redux store with user data
          dispatch(
            setCredentials({
              user: response.data.user,
              token: localStorage.getItem('token') || '',
            })
          );
          
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        // If token is invalid, clear it
        authService.logout();
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
