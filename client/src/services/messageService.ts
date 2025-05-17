import axios from 'axios';
import authService from './authService';

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

interface Conversation {
  id: string;
  participantOneId: string;
  participantTwoId: string;
  lastMessageId: string | null;
  createdAt: string;
  updatedAt: string;
  participantOneUser: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  participantTwoUser: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  conversationLastMessage?: {
    id: string;
    content: string;
    createdAt: string;
  } | null;
  otherParticipant?: {
    id: string;
    name: string;
    profileImage: string | null;
  };
  unreadCount?: number;
}

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  messageAuthor?: {
    id: string;
    name: string;
    profileImage: string | null;
  };
}

export const messageService = {
  getConversations: async (): Promise<Conversation[]> => {
    try {
      const response = await apiClient.get('/messages/conversations');
      return response.data.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  createOrGetConversation: async (recipientId: string): Promise<Conversation> => {
    try {
      const response = await apiClient.post('/messages/conversations', {
        recipientId,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error creating/getting conversation:', error);
      throw error;
    }
  },

  getMessages: async (conversationId: string, limit = 50, offset = 0): Promise<{
    messages: Message[];
    count: number;
    pagination: {
      total: number;
      limit: number;
      offset: number;
      pages: number;
      currentPage: number;
    };
  }> => {
    try {
      const response = await apiClient.get(
        `/messages/conversations/${conversationId}/messages?limit=${limit}&offset=${offset}`
      );
      return {
        messages: response.data.data,
        count: response.data.count,
        pagination: response.data.pagination
      };
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  markMessagesAsRead: async (conversationId: string): Promise<{ count: number }> => {
    try {
      const response = await apiClient.put(
        `/messages/conversations/${conversationId}/read`
      );
      return { count: response.data.count };
    } catch (error) {
      console.error('Error marking messages as read:', error);
      throw error;
    }
  },

  sendMessage: async (conversationId: string, content: string): Promise<Message> => {
    try {
      const response = await apiClient.post('/messages/send', {
        conversationId,
        content,
      });
      return response.data.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
};

export default messageService;
