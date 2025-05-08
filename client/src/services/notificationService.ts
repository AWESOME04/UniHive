import axios from 'axios';
import api from '../utils/apiUtils';

// Define Notification interface
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  expiresAt?: string;
  data?: {
    entityType?: string;
    entityId?: string;
    actionUrl?: string;
    imageUrl?: string;
    [key: string]: any;
  };
}

// Notification service
export const notificationService = {
  // Get user notifications
  getNotifications: async (params: {
    page?: number;
    limit?: number;
    isRead?: boolean;
    type?: string;
  }) => {
    try {
      const response = await api.get('/v1/notifications', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch notifications';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching notifications');
    }
  },

  // Get notification by ID
  getNotificationById: async (notificationId: string) => {
    try {
      const response = await api.get(`/v1/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch notification';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching notification');
    }
  },

  // Mark notification as read
  markAsRead: async (notificationId: string) => {
    try {
      const response = await api.put(`/v1/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to mark notification as read';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating notification');
    }
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    try {
      const response = await api.put('/v1/notifications/read-all');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to mark all notifications as read';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while marking all notifications as read');
    }
  },

  // Delete a notification
  deleteNotification: async (notificationId: string) => {
    try {
      const response = await api.delete(`/v1/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to delete notification';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while deleting notification');
    }
  },

  // Delete all notifications
  deleteAllNotifications: async () => {
    try {
      const response = await api.delete('/v1/notifications');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to delete all notifications';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while deleting all notifications');
    }
  },

  // Get unread notification count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/v1/notifications/unread-count');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch unread count';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching unread count');
    }
  },

  // Update notification preferences
  updateNotificationPreferences: async (preferences: {
    email?: boolean;
    push?: boolean;
    inApp?: boolean;
    jobAlerts?: boolean;
    taskAlerts?: boolean;
    eventReminders?: boolean;
    messageNotifications?: boolean;
    applicationUpdates?: boolean;
    marketingEmails?: boolean;
  }) => {
    try {
      const response = await api.put('/v1/users/me/notification-preferences', preferences);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to update notification preferences';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating notification preferences');
    }
  },

  // Get notification preferences
  getNotificationPreferences: async () => {
    try {
      const response = await api.get('/v1/users/me/notification-preferences');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch notification preferences';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching notification preferences');
    }
  }
};

export default notificationService;
