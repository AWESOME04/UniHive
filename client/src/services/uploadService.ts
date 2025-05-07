import axios from 'axios';
import api from '../utils/apiUtils';

// Define FileUpload interface
interface FileUpload {
  id: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  uploadedAt: string;
  expiresAt?: string;
  isPublic: boolean;
  category?: string;
  metadata?: Record<string, any>;
}

// Upload service
export const uploadService = {
  // Upload a single file
  uploadFile: async (file: File, params: {
    category?: string;
    isPublic?: boolean;
    metadata?: Record<string, any>;
  } = {}) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (params.category) {
        formData.append('category', params.category);
      }
      
      if (params.isPublic !== undefined) {
        formData.append('isPublic', params.isPublic.toString());
      }
      
      if (params.metadata) {
        formData.append('metadata', JSON.stringify(params.metadata));
      }
      
      const response = await api.post('/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'File upload failed');
      }
      throw new Error('Network error during file upload');
    }
  },

  // Upload multiple files
  uploadMultipleFiles: async (files: File[], params: {
    category?: string;
    isPublic?: boolean;
    metadata?: Record<string, any>;
  } = {}) => {
    try {
      const formData = new FormData();
      
      files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
      });
      
      if (params.category) {
        formData.append('category', params.category);
      }
      
      if (params.isPublic !== undefined) {
        formData.append('isPublic', params.isPublic.toString());
      }
      
      if (params.metadata) {
        formData.append('metadata', JSON.stringify(params.metadata));
      }
      
      const response = await api.post('/uploads/multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Multiple file upload failed');
      }
      throw new Error('Network error during multiple file upload');
    }
  },

  // Get file details
  getFileDetails: async (fileId: string) => {
    try {
      const response = await api.get(`/uploads/${fileId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to get file details');
      }
      throw new Error('Network error while getting file details');
    }
  },

  // Delete a file
  deleteFile: async (fileId: string) => {
    try {
      const response = await api.delete(`/uploads/${fileId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete file');
      }
      throw new Error('Network error while deleting file');
    }
  },

  // Get user's uploaded files
  getUserFiles: async (params: {
    page?: number;
    limit?: number;
    category?: string;
  }) => {
    try {
      const response = await api.get('/uploads/user', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch your files');
      }
      throw new Error('Network error while fetching your files');
    }
  },

  // Update file metadata
  updateFileMetadata: async (fileId: string, metadata: {
    isPublic?: boolean;
    category?: string;
    customMetadata?: Record<string, any>;
  }) => {
    try {
      const response = await api.put(`/uploads/${fileId}/metadata`, metadata);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update file metadata');
      }
      throw new Error('Network error while updating file metadata');
    }
  }
};

export default uploadService;
