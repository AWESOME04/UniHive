import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Get API URL from environment variable, fallback to production URL
const API_URL = import.meta.env?.VITE_API_URL || 'https://unihive-hmoi.onrender.com';
// Token storage key - use Vite environment variable or default
const TOKEN_KEY = import.meta.env?.VITE_TOKEN_KEY || 'unihive_token';

console.log('API Configuration:', { 
  API_URL, 
  TOKEN_KEY,
  hasToken: !!localStorage.getItem(TOKEN_KEY)
});

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Increase timeout for slower connections
  timeout: 15000,
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Request to ${config.url} with auth token`);
    } else {
      console.log(`Request to ${config.url} without auth token`);
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`Response from ${response.config.url} successful:`, {
      status: response.status,
      hasData: !!response.data
    });
    return response;
  },
  (error: AxiosError) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      console.warn('Authentication token expired or invalid, redirecting to login');
      // Clear token and redirect to login
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
