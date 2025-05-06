import axios from 'axios';
import api from '../utils/apiUtils';

// Token storage key - use Vite environment variable or default
const TOKEN_KEY = import.meta.env?.VITE_TOKEN_KEY || 'unihive_token';

// Authentication service
export const authService = {
  // Register a new user
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    university: string;
  }) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Registration failed');
      }
      throw new Error('Network error during registration');
    }
  },

  // Verify OTP
  verifyOTP: async (verificationData: { email: string; otp: string }) => {
    try {
      const response = await api.post('/auth/verify-otp', verificationData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'OTP verification failed');
      }
      throw new Error('Network error during OTP verification');
    }
  },

  // Resend OTP
  resendOTP: async (email: string) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to resend OTP');
      }
      throw new Error('Network error while resending OTP');
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      
      // Store token in localStorage
      if (response.data.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.data.token);
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Login failed');
      }
      throw new Error('Network error during login');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to get user data');
      }
      throw new Error('Network error while fetching user data');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

export default authService;
