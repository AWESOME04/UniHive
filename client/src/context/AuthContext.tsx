import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import authService from '../services/authService';
import { motion, AnimatePresence } from 'framer-motion';

// Define user type with all possible fields from API
interface User {
  id: string;
  name: string;
  email: string;
  university?: string;
  profileImage?: string | null;
  avatarUrl?: string;
  bio?: string | null;
  rating?: number;
  isVerified?: boolean;
  role?: string;
  createdAt?: string;
  [key: string]: any;
}

// Define auth context state
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (userData: any) => Promise<any>;
  verifyOTP: (email: string, otp: string) => Promise<any>;
  logout: () => void;
  updateUserData: (data: Partial<User>) => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  verifyOTP: () => Promise.resolve(),
  logout: () => {},
  updateUserData: () => {},
});

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      try {
        // Get user from localStorage
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // If there's an error, clear any invalid auth state
        authService.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Login method
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      console.log("Auth context login response:", response);
      
      // Check for the expected response format - this ensures we adapt to the API structure
      if (response && response.data) {
        if (response.data.user) {
          setUser(response.data.user);
        } else if (response.data.userData) {
          setUser(response.data.userData);
        } else {
          // Minimal user construct if no detailed user data
          setUser({
            id: response.data.userId || 'unknown',
            name: email.split('@')[0],
            email
          });
        }
      } else {
        console.error("Unexpected login response format:", response);
      }
      
      return response;
    } catch (error) {
      console.error('Login error in context:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register method
  const register = async (userData: any) => {
    setIsLoading(true);
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP method
  const verifyOTP = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyOTP(email, otp);
      
      // If verification successful and returned user data
      if (response && response.data) {
        if (response.data.user) {
          setUser(response.data.user);
        } else if (response.data.userData) {
          setUser(response.data.userData);
        } else if (response.data.userId) {
          // Construct minimal user object if only userId provided
          setUser({
            id: response.data.userId,
            name: email.split('@')[0],
            email
          });
        }
      }
      
      return response;
    } catch (error) {
      console.error('OTP verification error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout method
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Update user data method
  const updateUserData = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      authService.updateUserInfo(updatedUser);
    }
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    verifyOTP,
    logout,
    updateUserData
  };

  return (
    <AuthContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-secondary font-medium">Loading...</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for easy context use
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
