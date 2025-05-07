import axios from 'axios';
import api from '../utils/apiUtils';

// Token storage key - use Vite environment variable or default
const TOKEN_KEY = import.meta.env?.VITE_TOKEN_KEY || 'unihive_token';

// Authentication service
export const authService = {
  // Register a new user
  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
    university: string;
    role?: string;
  }) => {
    try {
      console.log('Sending registration request with data:', { 
        ...userData, 
        password: userData.password ? '********' : undefined 
      });
      
      const response = await api.post('/auth/register', userData);
      
      console.log('Registration API response:', response.data);
      
      // Validate response structure
      if (!response.data) {
        throw new Error('Invalid response from server: missing data');
      }
      
      return response.data;
    } catch (error) {
      console.error('Registration error details:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Registration failed';
        throw new Error(errorMessage);
      }
      throw new Error('Network error during registration');
    }
  },

  // Verify OTP
  verifyOTP: async (verificationData: { email: string; otp: string }) => {
    try {
      const response = await api.post('/auth/verify-otp', verificationData);
      
      // Check if response contains expected data
      if (!response.data) {
        throw new Error('Invalid response from server during OTP verification');
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'OTP verification failed';
        throw new Error(errorMessage);
      }
      throw new Error('Network error during OTP verification');
    }
  },

  // Resend OTP
  resendOTP: async (email: string) => {
    try {
      const response = await api.post('/auth/resend-otp', { email });
      
      // Check if response contains expected data
      if (!response.data) {
        throw new Error('Invalid response from server during OTP resend');
      }
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to resend OTP';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while resending OTP');
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Sending login request to API with credentials:', { email: credentials.email, passwordProvided: !!credentials.password });
      
      const response = await api.post('/auth/login', credentials);
      
      console.log('Login API raw response:', response);
      
      // Validate response structure
      if (!response.data) {
        throw new Error('Invalid response from server: missing data');
      }
      
      if (!response.data.token) {
        console.error('Login response missing token:', response.data);
        throw new Error('Invalid response from server: missing token');
      }
      
      // Store token in localStorage
      localStorage.setItem(TOKEN_KEY, response.data.token);
      
      return response.data;
    } catch (error) {
      console.error('Login error details:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Login failed';
        throw new Error(errorMessage);
      }
      throw new Error('Network error during login');
    }
  },

  // Logout user
  logout: async () => {
    try {
      await api.post('/v1/auth/logout');
      localStorage.removeItem(TOKEN_KEY);
      return { success: true };
    } catch (error) {
      localStorage.removeItem(TOKEN_KEY);
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Logout failed');
      }
      throw new Error('Network error during logout');
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/v1/users/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to get user data';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching user data');
    }
  },

  // Request password reset
  requestPasswordReset: async (email: string) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to request password reset';
        throw new Error(errorMessage);
      }
      throw new Error('Network error during password reset request');
    }
  },

  // Reset password with token
  resetPassword: async (resetData: { email: string; token: string; newPassword: string }) => {
    try {
      console.log('Sending password reset request:', { email: resetData.email, tokenProvided: !!resetData.token });
      
      const response = await api.post('/auth/reset-password', resetData);
      
      // Validate response structure
      if (!response.data) {
        throw new Error('Invalid response from server: missing data');
      }
      
      return response.data;
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to reset password';
        throw new Error(errorMessage);
      }
      throw new Error('Network error during password reset');
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

export default authService;
