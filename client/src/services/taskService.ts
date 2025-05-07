import axios from 'axios';
import api from '../utils/apiUtils';
import { Task } from '../types';

// Task service
export const taskService = {
  // Get all tasks with pagination and filters
  getTasks: async (params: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    location?: string;
    university?: string;
    category?: string;
    tags?: string[];
    status?: string[];
    minPoints?: number;
    maxPoints?: number;
    workplaceType?: string[];
    experienceLevel?: string;
    positionLevel?: string;
  }) => {
    try {
      const response = await api.get('/v1/tasks', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch tasks';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching tasks');
    }
  },

  // Get task by ID
  getTaskById: async (taskId: string) => {
    try {
      const response = await api.get(`/v1/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch task details';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching task details');
    }
  },

  // Create a new task
  createTask: async (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    try {
      const response = await api.post('/v1/tasks', taskData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to create task';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while creating task');
    }
  },

  // Update a task
  updateTask: async (taskId: string, taskData: Partial<Task>) => {
    try {
      const response = await api.put(`/v1/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to update task';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating task');
    }
  },

  // Delete a task
  deleteTask: async (taskId: string) => {
    try {
      const response = await api.delete(`/v1/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to delete task';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while deleting task');
    }
  },

  // Apply for a task
  applyForTask: async (taskId: string, applicationData: {
    message: string;
    portfolioUrl?: string;
    attachments?: string[];
  }) => {
    try {
      const response = await api.post(`/v1/tasks/${taskId}/apply`, applicationData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to submit application';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while submitting application');
    }
  },

  // Get task applications for a specific task (for task creators)
  getTaskApplications: async (taskId: string, params: { page?: number; limit?: number; status?: string }) => {
    try {
      const response = await api.get(`/v1/tasks/${taskId}/applications`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch task applications';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching task applications');
    }
  },

  // Update application status (for task creators)
  updateApplicationStatus: async (
    taskId: string,
    applicationId: string,
    status: 'pending' | 'reviewing' | 'accepted' | 'rejected'
  ) => {
    try {
      const response = await api.put(`/v1/tasks/${taskId}/applications/${applicationId}`, { status });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to update application status';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while updating application status');
    }
  },

  // Get user's task applications
  getUserTaskApplications: async (params: { page?: number; limit?: number; status?: string }) => {
    try {
      const response = await api.get('/v1/users/me/task-applications', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch your applications';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching your applications');
    }
  },

  // Save/bookmark a task
  saveTask: async (taskId: string) => {
    try {
      const response = await api.post(`/v1/tasks/${taskId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to save task';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while saving task');
    }
  },

  // Unsave/unbookmark a task
  unsaveTask: async (taskId: string) => {
    try {
      const response = await api.delete(`/v1/tasks/${taskId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to unsave task';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while unsaving task');
    }
  },

  // Get user's saved tasks
  getSavedTasks: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/v1/users/me/saved-tasks', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to fetch saved tasks';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while fetching saved tasks');
    }
  },

  // Submit task completion (for task takers)
  submitTaskCompletion: async (taskId: string, completionData: {
    message: string;
    deliverables: string[];
    hoursSpent?: number;
  }) => {
    try {
      const response = await api.post(`/v1/tasks/${taskId}/complete`, completionData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to submit task completion';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while submitting task completion');
    }
  },

  // Review task submission (for task creators)
  reviewTaskSubmission: async (
    taskId: string,
    submissionId: string,
    reviewData: {
      status: 'approved' | 'rejected' | 'revision-required';
      feedback?: string;
      pointsAwarded?: number;
    }
  ) => {
    try {
      const response = await api.put(`/v1/tasks/${taskId}/submissions/${submissionId}/review`, reviewData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data.message || error.response.data.error || 'Failed to review submission';
        throw new Error(errorMessage);
      }
      throw new Error('Network error while reviewing submission');
    }
  }
};

export default taskService;
