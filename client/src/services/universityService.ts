import axios from "axios";
import api from "../utils/apiUtils";

// Define University interface
export interface University {
  id: string;
  name: string;
  shortName?: string;
  logo?: string;
  coverImage?: string;
  location: string;
  country: string;
  description?: string;
  website?: string;
  establishedYear?: number;
  type?: "public" | "private" | "other";
  totalStudents?: number;
  accreditation?: string[];
  faculties?: string[];
  programs?: string[];
  rankings?: {
    source: string;
    rank: number;
    year: number;
  }[];
  socialMedia?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}

// University service
export const universityService = {
  // Get all universities with pagination and filters
  getUniversities: async (params: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    country?: string;
    type?: string;
  }) => {
    try {
      const response = await api.get("/universities", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch universities"
        );
      }
      throw new Error("Network error while fetching universities");
    }
  },

  // Get university by ID
  getUniversityById: async (universityId: string) => {
    try {
      const response = await api.get(`/universities/${universityId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university details"
        );
      }
      throw new Error("Network error while fetching university details");
    }
  },

  // Get university by slug/name
  getUniversityBySlug: async (slug: string) => {
    try {
      const response = await api.get(`/universities/slug/${slug}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university details"
        );
      }
      throw new Error("Network error while fetching university details");
    }
  },

  // Get university hives
  getUniversityJobs: async (
    universityId: string,
    params: {
      page?: number;
      limit?: number;
      status?: string;
      category?: string;
    }
  ) => {
    try {
      const response = await api.get(`/universities/${universityId}/hives`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university hives"
        );
      }
      throw new Error("Network error while fetching university hives");
    }
  },

  // Get university tasks
  getUniversityTasks: async (
    universityId: string,
    params: {
      page?: number;
      limit?: number;
      status?: string;
      category?: string;
    }
  ) => {
    try {
      const response = await api.get(`/universities/${universityId}/tasks`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university tasks"
        );
      }
      throw new Error("Network error while fetching university tasks");
    }
  },

  // Get university events
  getUniversityEvents: async (
    universityId: string,
    params: {
      page?: number;
      limit?: number;
      upcoming?: boolean;
    }
  ) => {
    try {
      const response = await api.get(`/universities/${universityId}/events`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university events"
        );
      }
      throw new Error("Network error while fetching university events");
    }
  },

  // Get university news
  getUniversityNews: async (
    universityId: string,
    params: {
      page?: number;
      limit?: number;
    }
  ) => {
    try {
      const response = await api.get(`/universities/${universityId}/news`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university news"
        );
      }
      throw new Error("Network error while fetching university news");
    }
  },

  // Get university departments/faculties
  getUniversityDepartments: async (universityId: string) => {
    try {
      const response = await api.get(
        `/universities/${universityId}/departments`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message ||
            "Failed to fetch university departments"
        );
      }
      throw new Error("Network error while fetching university departments");
    }
  },

  // Get university programs/courses
  getUniversityPrograms: async (
    universityId: string,
    params: {
      page?: number;
      limit?: number;
      departmentId?: string;
      level?: string;
    }
  ) => {
    try {
      const response = await api.get(`/universities/${universityId}/programs`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch university programs"
        );
      }
      throw new Error("Network error while fetching university programs");
    }
  },

  // Follow a university
  followUniversity: async (universityId: string) => {
    try {
      const response = await api.post(`/universities/${universityId}/follow`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to follow university"
        );
      }
      throw new Error("Network error while following university");
    }
  },

  // Unfollow a university
  unfollowUniversity: async (universityId: string) => {
    try {
      const response = await api.delete(`/universities/${universityId}/follow`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to unfollow university"
        );
      }
      throw new Error("Network error while unfollowing university");
    }
  },

  // Get user's followed universities
  getFollowedUniversities: async (params: {
    page?: number;
    limit?: number;
  }) => {
    try {
      const response = await api.get("/users/me/followed-universities", {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Failed to fetch followed universities"
        );
      }
      throw new Error("Network error while fetching followed universities");
    }
  },
};

export default universityService;
