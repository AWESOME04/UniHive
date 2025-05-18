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

export interface UserProfile {
  id: string;
  name: string;
  university: string;
  profileImage: string | null;
  bio: string | null;
  rating: number;
  createdAt: string;
  email: string;
  status?: string;
}

// User service
const userService = {
  getCurrentUserProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  getCurrentUser: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  },

  // Get user profile by ID (no auth required)
  getUserById: async (userId: string): Promise<UserProfile> => {
    try {
      const response = await apiClient.get(`/users/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching user ${userId}:`, error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    try {
      const response = await apiClient.put('/users/profile', userData);
      return response.data.data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }
};

export default userService;
