import axios from "axios";
import api from "../utils/apiUtils";

// Search service
export const searchService = {
  // Global search across all entities
  globalSearch: async (params: {
    query: string;
    page?: number;
    limit?: number;
    types?: string[]; // Filter by entity types
  }) => {
    try {
      const response = await api.get("/search", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Search failed");
      }
      throw new Error("Network error during search");
    }
  },

  // Search hives
  searchJobs: async (params: {
    query: string;
    page?: number;
    limit?: number;
    location?: string;
    university?: string;
    category?: string;
  }) => {
    try {
      const response = await api.get("/search/hives", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Hive search failed");
      }
      throw new Error("Network error during hive search");
    }
  },

  // Search tasks
  searchTasks: async (params: {
    query: string;
    page?: number;
    limit?: number;
    location?: string;
    university?: string;
    category?: string;
  }) => {
    try {
      const response = await api.get("/search/tasks", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Task search failed");
      }
      throw new Error("Network error during task search");
    }
  },

  // Search universities
  searchUniversities: async (params: {
    query: string;
    page?: number;
    limit?: number;
    country?: string;
  }) => {
    try {
      const response = await api.get("/search/universities", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "University search failed"
        );
      }
      throw new Error("Network error during university search");
    }
  },

  // Search users
  searchUsers: async (params: {
    query: string;
    page?: number;
    limit?: number;
    university?: string;
  }) => {
    try {
      const response = await api.get("/search/users", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "User search failed");
      }
      throw new Error("Network error during user search");
    }
  },

  // Search events
  searchEvents: async (params: {
    query: string;
    page?: number;
    limit?: number;
    university?: string;
    upcoming?: boolean;
  }) => {
    try {
      const response = await api.get("/search/events", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Event search failed");
      }
      throw new Error("Network error during event search");
    }
  },

  // Search news
  searchNews: async (params: {
    query: string;
    page?: number;
    limit?: number;
    university?: string;
  }) => {
    try {
      const response = await api.get("/search/news", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "News search failed");
      }
      throw new Error("Network error during news search");
    }
  },

  // Get search suggestions (autocomplete)
  getSearchSuggestions: async (params: {
    query: string;
    limit?: number;
    types?: string[];
  }) => {
    try {
      const response = await api.get("/search/suggestions", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to get search suggestions"
        );
      }
      throw new Error("Network error while getting search suggestions");
    }
  },
};

export default searchService;
