import axios from 'axios';
import authService from './authService';

// Base API URL - from environment or default to the production URL
const API_URL = import.meta.env?.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api';

// Create a custom axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// User service
export const userService = {
  // Get current user profile (authenticated)
  getCurrentUserProfile: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching current user profile:', error);
      throw error;
    }
  },

  // Get user profile by ID (no auth required)
  getUserProfileById: async (userId: string) => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile by ID:', error);
      throw error;
    }
  },

  // Update user profile
  updateUserProfile: async (userData: any) => {
    try {
      const response = await apiClient.put('/users/profile', userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwords: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await apiClient.put('/users/password', passwords);
      return response.data;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
};

export default userService;
