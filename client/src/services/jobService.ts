import axios from 'axios';
import api from '../utils/apiUtils';
import { Job } from '../types';

// Job service
export const jobService = {
  // Get all jobs with pagination and filters
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
      const response = await api.get('/v1/jobs', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch jobs';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching jobs');
    }
  },

  // Get job by ID
  getJobById: async (jobId: string) => {
    try {
      const response = await api.get(`/v1/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch job details';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching job details');
    }
  },

  // Create a new job
  createJob: async (jobData: Omit<Job, 'id' | 'postedAt' | 'status'>) => {
    try {
      const response = await api.post('/v1/jobs', jobData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to create job';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while creating job');
    }
  },

  // Update a job
  updateJob: async (jobId: string, jobData: Partial<Job>) => {
    try {
      const response = await api.put(`/v1/jobs/${jobId}`, jobData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to update job';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating job');
    }
  },

  // Delete a job
  deleteJob: async (jobId: string) => {
    try {
      const response = await api.delete(`/v1/jobs/${jobId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to delete job';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while deleting job');
    }
  },

  // Apply for a job
  applyForJob: async (jobId: string, applicationData: {
    coverLetter: string;
    resumeUrl?: string;
    attachments?: string[];
    answers?: Record<string, string>;
  }) => {
    try {
      const response = await api.post(`/v1/jobs/${jobId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to apply for job';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while applying for job');
    }
  },

  // Get job applications for a specific job (for job creators)
  getJobApplications: async (jobId: string, params: { page?: number; limit?: number; status?: string }) => {
    try {
      const response = await api.get(`/v1/jobs/${jobId}/applications`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch job applications';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching job applications');
    }
  },

  // Update application status (for job creators)
  updateApplicationStatus: async (
    jobId: string,
    applicationId: string,
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
  ) => {
    try {
      const response = await api.put(`/v1/jobs/${jobId}/applications/${applicationId}`, { status });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to update application status';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating application status');
    }
  },

  // Get user's job applications
  getUserApplications: async (params: { page?: number; limit?: number; status?: string }) => {
    try {
      const response = await api.get('/v1/users/me/job-applications', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch your applications';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching your applications');
    }
  },

  // Save/bookmark a job
  saveJob: async (jobId: string) => {
    try {
      const response = await api.post(`/v1/jobs/${jobId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to save job';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while saving job');
    }
  },

  // Unsave/unbookmark a job
  unsaveJob: async (jobId: string) => {
    try {
      const response = await api.delete(`/v1/jobs/${jobId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to unsave job';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while unsaving job');
    }
  },

  // Get user's saved jobs
  getSavedJobs: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/v1/users/me/saved-jobs', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch saved jobs';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching saved jobs');
    }
  }
};

export default jobService;
