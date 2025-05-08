import axios from 'axios';
import api from '../utils/apiUtils';

// Define News interface
interface News {
  id: string;
  title: string;
  content: string;
  summary?: string;
  coverImage?: string;
  author: string;
  authorId: string;
  university: string;
  universityId: string;
  tags?: string[];
  category?: string;
  publishedAt: string;
  updatedAt?: string;
  isPublished: boolean;
  viewCount?: number;
}

// News service
export const newsService = {
  // Get all news with pagination and filters
  getNews: async (params: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    university?: string;
    category?: string;
    tags?: string[];
    startDate?: string;
    endDate?: string;
  }) => {
    try {
      const response = await api.get('/news', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch news');
      }
      throw new Error('Network error while fetching news');
    }
  },

  // Get news article by ID
  getNewsById: async (newsId: string) => {
    try {
      const response = await api.get(`/news/${newsId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch news details');
      }
      throw new Error('Network error while fetching news details');
    }
  },

  // Create a new news article
  createNews: async (newsData: Omit<News, 'id' | 'publishedAt' | 'viewCount'>) => {
    try {
      const response = await api.post('/news', newsData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to create news article');
      }
      throw new Error('Network error while creating news article');
    }
  },

  // Update a news article
  updateNews: async (newsId: string, newsData: Partial<News>) => {
    try {
      const response = await api.put(`/news/${newsId}`, newsData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update news article');
      }
      throw new Error('Network error while updating news article');
    }
  },

  // Delete a news article
  deleteNews: async (newsId: string) => {
    try {
      const response = await api.delete(`/news/${newsId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete news article');
      }
      throw new Error('Network error while deleting news article');
    }
  },

  // Publish a news article
  publishNews: async (newsId: string) => {
    try {
      const response = await api.put(`/news/${newsId}/publish`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to publish news article');
      }
      throw new Error('Network error while publishing news article');
    }
  },

  // Unpublish a news article
  unpublishNews: async (newsId: string) => {
    try {
      const response = await api.put(`/news/${newsId}/unpublish`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to unpublish news article');
      }
      throw new Error('Network error while unpublishing news article');
    }
  },

  // Like a news article
  likeNews: async (newsId: string) => {
    try {
      const response = await api.post(`/news/${newsId}/like`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to like news article');
      }
      throw new Error('Network error while liking news article');
    }
  },

  // Unlike a news article
  unlikeNews: async (newsId: string) => {
    try {
      const response = await api.delete(`/news/${newsId}/like`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to unlike news article');
      }
      throw new Error('Network error while unliking news article');
    }
  },

  // Comment on a news article
  commentOnNews: async (newsId: string, commentData: { content: string }) => {
    try {
      const response = await api.post(`/news/${newsId}/comments`, commentData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to comment on news article');
      }
      throw new Error('Network error while commenting on news article');
    }
  },

  // Get comments for a news article
  getNewsComments: async (newsId: string, params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get(`/news/${newsId}/comments`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch comments');
      }
      throw new Error('Network error while fetching comments');
    }
  },

  // Delete a comment (for comment author or news author)
  deleteComment: async (newsId: string, commentId: string) => {
    try {
      const response = await api.delete(`/news/${newsId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete comment');
      }
      throw new Error('Network error while deleting comment');
    }
  },

  // Save/bookmark a news article
  saveNews: async (newsId: string) => {
    try {
      const response = await api.post(`/news/${newsId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to save news article');
      }
      throw new Error('Network error while saving news article');
    }
  },

  // Unsave/unbookmark a news article
  unsaveNews: async (newsId: string) => {
    try {
      const response = await api.delete(`/news/${newsId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to unsave news article');
      }
      throw new Error('Network error while unsaving news article');
    }
  },

  // Get user's saved news articles
  getSavedNews: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/users/saved-news', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch saved news articles');
      }
      throw new Error('Network error while fetching saved news articles');
    }
  }
};

export default newsService;
