import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api';
export interface HiveType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface Hive {
  id: string;
  title: string;
  description: string;
  price: string | number;
  location?: string;
  hiveType: HiveType;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  tags?: string[];
  userId?: string;
}

// Service implementation
const hivesService = {
  // Get all hive types
  getHiveTypes: async () => {
    try {
      const response = await axios.get(`${API_URL}/hives/types`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hive types:", error);
      throw error;
    }
  },

  // Get all hives with optional filtering
  getHives: async (filters?: any) => {
    try {
      const response = await axios.get(`${API_URL}/hives`, { params: filters });
      return response.data;
    } catch (error) {
      console.error("Error fetching hives:", error);
      throw error;
    }
  },

  // Get hives by type
  getHivesByType: async (type: string, filters?: any) => {
    try {
      const response = await axios.get(`${API_URL}/${type}`, { params: filters });

      if (response.data && response.data.data) {
        response.data.data = response.data.data.map((hive: any) => ({
          ...hive,
          price: hive.price || 0,
        }));
      }
      
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${type} hives:`, error);
      throw error;
    }
  },

  // Get a specific hive by ID
  getHiveById: async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/hives/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching hive:", error);
      throw error;
    }
  },

  // Create a new hive
  createHive: async (data: any) => {
    try {
      const response = await axios.post(`${API_URL}/hives`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating hive:", error);
      throw error;
    }
  },

  // Update an existing hive
  updateHive: async (id: string, data: any) => {
    try {
      const response = await axios.put(`${API_URL}/hives/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating hive:", error);
      throw error;
    }
  },

  // Delete a hive
  deleteHive: async (id: string) => {
    try {
      const response = await axios.delete(`${API_URL}/hives/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting hive:", error);
      throw error;
    }
  }
};

export default hivesService;
