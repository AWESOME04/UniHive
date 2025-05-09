import axios from "axios";
import api from "../utils/apiUtils";
import { Hive } from "../types";

// Hive service
export const jobService = {
  // Get all hives with pagination and filters
  getJobs: async (params: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    location?: string;
    university?: string;
    category?: string;
    tags?: string[];
    status?: string[];
    minSalary?: number;
    maxSalary?: number;
    jobType?: string[];
    experienceLevel?: string;
    positionLevel?: string;
  }) => {
    try {
      const response = await api.get("/v1/hives", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to fetch hives";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while fetching hives");
    }
  },

  // Get hive by ID
  getJobById: async (jobId: string) => {
    try {
      const response = await api.get(`/v1/hives/${jobId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to fetch hive details";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while fetching hive details");
    }
  },

  // Create a new hive
  createJob: async (jobData: Omit<Hive, "id" | "postedAt" | "status">) => {
    try {
      const response = await api.post("/v1/hives", jobData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to create hive";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while creating hive");
    }
  },

  // Update a hive
  updateJob: async (jobId: string, jobData: Partial<Hive>) => {
    try {
      const response = await api.put(`/v1/hives/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to update hive";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while updating hive");
    }
  },

  // Delete a hive
  deleteJob: async (jobId: string) => {
    try {
      const response = await api.delete(`/v1/hives/${jobId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to delete hive";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while deleting hive");
    }
  },

  // Apply for a hive
  applyForJob: async (
    jobId: string,
    applicationData: {
      coverLetter: string;
      resumeUrl?: string;
      attachments?: string[];
      answers?: Record<string, string>;
    }
  ) => {
    try {
      const response = await api.post(
        `/v1/hives/${jobId}/apply`,
        applicationData
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to apply for hive";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while applying for hive");
    }
  },

  // Get hive applications for a specific hive (for hive creators)
  getJobApplications: async (
    jobId: string,
    params: { page?: number; limit?: number; status?: string }
  ) => {
    try {
      const response = await api.get(`/v1/hives/${jobId}/applications`, {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to fetch hive applications";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while fetching hive applications");
    }
  },

  // Update application status (for hive creators)
  updateApplicationStatus: async (
    jobId: string,
    applicationId: string,
    status: "pending" | "reviewing" | "accepted" | "rejected"
  ) => {
    try {
      const response = await api.put(
        `/v1/hives/${jobId}/applications/${applicationId}`,
        { status }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to update application status";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while updating application status");
    }
  },

  // Get user's hive applications
  getUserApplications: async (params: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    try {
      const response = await api.get("/v1/users/me/hive-applications", {
        params,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to fetch your applications";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while fetching your applications");
    }
  },

  // Save/bookmark a hive
  saveJob: async (jobId: string) => {
    try {
      const response = await api.post(`/v1/hives/${jobId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to save hive";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while saving hive");
    }
  },

  // Unsave/unbookmark a hive
  unsaveJob: async (jobId: string) => {
    try {
      const response = await api.delete(`/v1/hives/${jobId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to unsave hive";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while unsaving hive");
    }
  },

  // Get user's saved hives
  getSavedJobs: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get("/v1/users/me/saved-hives", { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          error.response.data.error ||
          "Failed to fetch saved hives";
        throw new Error(errorMessage);
      }
      throw new Error("Network error while fetching saved hives");
    }
  },
};

export default jobService;
