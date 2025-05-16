import axios from 'axios';
import api from '../utils/apiUtils';
import { User } from '../types';

// User service
export const userService = {
  // Get current user profile
  getProfile: async () => {
    try {
      const response = await api.get('/v1/users/me');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to get profile';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching profile');
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>) => {
    try {
      const response = await api.put('/v1/users/me', userData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to update profile';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating profile');
    }
  },

  // Upload profile picture
  uploadProfilePicture: async (formData: FormData) => {
    try {
      const response = await api.post('/v1/users/me/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to upload profile picture');
      }
      throw new Error('Network error while uploading profile picture');
    }
  },

  // Change password
  changePassword: async (passwordData: { currentPassword: string; newPassword: string }) => {
    try {
      const response = await api.put('/v1/users/me/password', passwordData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to change password');
      }
      throw new Error('Network error while changing password');
    }
  },

  // Get user notifications
  getNotifications: async (params: { page?: number; limit?: number; isRead?: boolean }) => {
    try {
      const response = await api.get('/v1/notifications', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to get notifications');
      }
      throw new Error('Network error while fetching notifications');
    }
  },

  // Mark notification as read
  markNotificationAsRead: async (notificationId: string) => {
    try {
      const response = await api.put(`/v1/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to mark notification as read');
      }
      throw new Error('Network error while updating notification');
    }
  },

  // Get user by ID
  getUserById: async (userId: string) => {
    try {
      const response = await api.get(`/v1/users/${userId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to get user');
      }
      throw new Error('Network error while fetching user');
    }
  },

  // Get user's saved jobs
  getSavedJobs: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/v1/users/me/saved-jobs', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch saved jobs');
      }
      throw new Error('Network error while fetching saved jobs');
    }
  },

  // Get user's job applications
  getJobApplications: async (params: { page?: number; limit?: number; status?: string }) => {
    try {
      const response = await api.get('/v1/users/me/job-applications', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch your applications');
      }
      throw new Error('Network error while fetching your applications');
    }
  },

  // Get user's followed universities
  getFollowedUniversities: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/v1/users/me/followed-universities', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch followed universities');
      }
      throw new Error('Network error while fetching followed universities');
    }
  }
};

export default userService;
