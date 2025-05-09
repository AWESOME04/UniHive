import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api';
const TOKEN_KEY = 'unihive_token';

// Create a custom axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface PaymentHistory {
  id: string;
  amount: number;
  status: string;
  reference: string;
  hiveId: string;
  hive: {
    title: string;
    // Other hive properties
  };
  createdAt: string;
  // Other payment properties
}

const paymentService = {
  // Initialize a payment for a hive
  initializePayment: async (hiveId: string) => {
    try {
      const response = await apiClient.post(`/payments/initialize/${hiveId}`);
      return response.data;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  },

  // Verify a payment transaction
  verifyPayment: async (reference: string) => {
    try {
      const response = await apiClient.get(`/payments/verify?reference=${reference}`);
      return response.data;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  },

  // Get payment history for the current user
  getPaymentHistory: async () => {
    try {
      const response = await apiClient.get('/payments/history');
      return response.data as PaymentHistory[];
    } catch (error) {
      console.error('Payment history fetch error:', error);
      throw error;
    }
  }
};

export default paymentService;
