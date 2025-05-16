import axios from 'axios';
import authService from './authService';

const API_URL = import.meta.env?.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api';

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

// Hive service
const hiveService = {
  getAllHives: async (filters = {}) => {
    try {
      const response = await apiClient.get('/hives', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching hives:', error);
      throw error;
    }
  },
  
  getHiveById: async (id: string) => {
    try {
      const response = await apiClient.get(`/hives/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching hive with ID ${id}:`, error);
      throw error;
    }
  },
  
  getUserPostedHives: async () => {
    try {
      const response = await apiClient.get('/hives/my/posted');
      return response.data;
    } catch (error) {
      console.error('Error fetching user posted hives:', error);
      throw error;
    }
  },
  
  getUserAssignedHives: async () => {
    try {
      const response = await apiClient.get('/hives/my/assigned');
      return response.data;
    } catch (error) {
      console.error('Error fetching user assigned hives:', error);
      throw error;
    }
  },
  
  deleteHive: async (id: string) => {
    try {
      const response = await apiClient.delete(`/hives/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting hive with ID ${id}:`, error);
      throw error;
    }
  },
  
  updateHiveStatus: async (id: string, status: string) => {
    try {
      const response = await apiClient.put(`/hives/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error(`Error updating status for hive with ID ${id}:`, error);
      throw error;
    }
  },
  
  assignHive: async (id: string, assignedToId: string) => {
    try {
      const response = await apiClient.put(`/hives/${id}/assign`, { assignedToId });
      return response.data;
    } catch (error) {
      console.error(`Error assigning hive with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Essentials hives
  getEssentials: async (filters = {}) => {
    try {
      const response = await apiClient.get('/essentials', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching essentials:', error);
      throw error;
    }
  },
  
  createEssential: async (data: any) => {
    try {
      const response = await apiClient.post('/essentials', data);
      return response.data;
    } catch (error) {
      console.error('Error creating essential:', error);
      throw error;
    }
  },
  
  updateEssential: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/essentials/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating essential with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Academia hives
  getAcademia: async (filters = {}) => {
    try {
      const response = await apiClient.get('/academia', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching academia:', error);
      throw error;
    }
  },
  
  createAcademia: async (data: any) => {
    try {
      const response = await apiClient.post('/academia', data);
      return response.data;
    } catch (error) {
      console.error('Error creating academia:', error);
      throw error;
    }
  },
  
  updateAcademia: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/academia/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating academia with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Logistics hives
  getLogistics: async (filters = {}) => {
    try {
      const response = await apiClient.get('/logistics', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching logistics:', error);
      throw error;
    }
  },
  
  createLogistics: async (data: any) => {
    try {
      const response = await apiClient.post('/logistics', data);
      return response.data;
    } catch (error) {
      console.error('Error creating logistics:', error);
      throw error;
    }
  },
  
  updateLogistics: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/logistics/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating logistics with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Buzz hives
  getBuzz: async (filters = {}) => {
    try {
      const response = await apiClient.get('/buzz', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching buzz:', error);
      throw error;
    }
  },
  
  createBuzz: async (data: any) => {
    try {
      const response = await apiClient.post('/buzz', data);
      return response.data;
    } catch (error) {
      console.error('Error creating buzz:', error);
      throw error;
    }
  },
  
  updateBuzz: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/buzz/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating buzz with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Archive hives
  getArchive: async (filters = {}) => {
    try {
      const response = await apiClient.get('/archive', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching archive:', error);
      throw error;
    }
  },
  
  createArchive: async (data: any) => {
    try {
      const response = await apiClient.post('/archive', data);
      return response.data;
    } catch (error) {
      console.error('Error creating archive:', error);
      throw error;
    }
  },
  
  updateArchive: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/archive/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating archive with ID ${id}:`, error);
      throw error;
    }
  },
  
  // SideHustle hives
  getSideHustle: async (filters = {}) => {
    try {
      const response = await apiClient.get('/sidehustle', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching side hustle:', error);
      throw error;
    }
  },
  
  createSideHustle: async (data: any) => {
    try {
      const response = await apiClient.post('/sidehustle', data);
      return response.data;
    } catch (error) {
      console.error('Error creating side hustle:', error);
      throw error;
    }
  },
  
  updateSideHustle: async (id: string, data: any) => {
    try {
      const response = await apiClient.put(`/sidehustle/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating side hustle with ID ${id}:`, error);
      throw error;
    }
  }
};

export default hiveService;
