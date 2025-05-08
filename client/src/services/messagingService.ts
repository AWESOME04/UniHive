import axios from 'axios';
import api from '../utils/apiUtils';

// Define Message interface
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  attachments?: string[];
  readBy: string[];
  createdAt: string;
}

// Define Conversation interface
interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
  isGroupChat: boolean;
  groupName?: string;
  groupAvatar?: string;
}

// Messaging service
export const messagingService = {
  // Get all conversations for the current user
  getConversations: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/messaging/conversations', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch conversations');
      }
      throw new Error('Network error while fetching conversations');
    }
  },

  // Get a single conversation by ID
  getConversationById: async (conversationId: string) => {
    try {
      const response = await api.get(`/messaging/conversations/${conversationId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch conversation');
      }
      throw new Error('Network error while fetching conversation');
    }
  },

  // Create a new conversation
  createConversation: async (data: {
    participants: string[];
    isGroupChat?: boolean;
    groupName?: string;
    initialMessage?: string;
  }) => {
    try {
      const response = await api.post('/messaging/conversations', data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to create conversation');
      }
      throw new Error('Network error while creating conversation');
    }
  },

  // Get messages for a conversation
  getMessages: async (conversationId: string, params: {
    page?: number;
    limit?: number;
    before?: string; // message ID to get messages before this one
  }) => {
    try {
      const response = await api.get(`/messaging/conversations/${conversationId}/messages`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch messages');
      }
      throw new Error('Network error while fetching messages');
    }
  },

  // Send a message
  sendMessage: async (conversationId: string, data: {
    content: string;
    attachments?: string[];
  }) => {
    try {
      const response = await api.post(`/messaging/conversations/${conversationId}/messages`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to send message');
      }
      throw new Error('Network error while sending message');
    }
  },

  // Mark messages as read
  markAsRead: async (conversationId: string, messageIds?: string[]) => {
    try {
      const response = await api.put(`/messaging/conversations/${conversationId}/read`, { messageIds });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to mark messages as read');
      }
      throw new Error('Network error while marking messages as read');
    }
  },

  // Delete a message (for sender only)
  deleteMessage: async (conversationId: string, messageId: string) => {
    try {
      const response = await api.delete(`/messaging/conversations/${conversationId}/messages/${messageId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete message');
      }
      throw new Error('Network error while deleting message');
    }
  },

  // Update group conversation settings
  updateGroupConversation: async (conversationId: string, data: {
    groupName?: string;
    groupAvatar?: string;
    addParticipants?: string[];
    removeParticipants?: string[];
  }) => {
    try {
      const response = await api.put(`/messaging/conversations/${conversationId}`, data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update group settings');
      }
      throw new Error('Network error while updating group settings');
    }
  },

  // Leave a conversation (for group chats)
  leaveConversation: async (conversationId: string) => {
    try {
      const response = await api.delete(`/messaging/conversations/${conversationId}/leave`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to leave conversation');
      }
      throw new Error('Network error while leaving conversation');
    }
  },

  // Upload attachment for a message
  uploadAttachment: async (formData: FormData) => {
    try {
      const response = await api.post('/messaging/attachments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to upload attachment');
      }
      throw new Error('Network error while uploading attachment');
    }
  },

  // Get unread message count
  getUnreadCount: async () => {
    try {
      const response = await api.get('/messaging/unread-count');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to get unread count');
      }
      throw new Error('Network error while getting unread count');
    }
  }
};

export default messagingService;
