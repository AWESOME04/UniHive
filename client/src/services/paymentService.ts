import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api';
const TOKEN_KEY = 'unihive_token';

// Create a custom axios instance for API calls
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add longer timeout to handle potential slow connections
  timeout: 30000,
});

// Add token to requests if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors specifically
    if (!error.response) {
      console.error('Network or connectivity error:', error.message);
      return Promise.reject({
        message: 'Network connection issue. Please check your internet connection.',
        isNetworkError: true,
        originalError: error
      });
    }
    return Promise.reject(error);
  }
);

// Hardcoded mock data - GUARANTEED to be shown in the Payments page
const HARDCODED_ELECTRIC_STOVE_PAYMENT = {
  id: 'mock-payment-electric-stove',
  buyerId: 'current-user-id',
  sellerId: 'seller-123',
  hiveId: 'electric-stove-123',
  amount: 350.00,
  platformFee: 17.50,
  paystackReference: 'unihive-demo-ref-123456',
  status: 'success',
  metadata: {
    hiveType: 'Essential',
    buyerName: 'Demo User',
    hiveTitle: 'Electric Stove for Sale',
    sellerName: 'John Seller'
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  transactionHive: {
    id: 'electric-stove-123',
    title: 'Electric Stove for Sale',
    description: 'Brand new electric stove with 4 burners, perfect for student accommodation.',
    hiveTypeId: 'essential',
    price: 350.00,
    status: 'completed',
    postedById: 'seller-123',
    assignedToId: null,
    deadline: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    postedByUser: {
      id: 'seller-123',
      name: 'John Seller'
    }
  },
  buyer: {
    id: 'current-user-id',
    name: 'Demo User'
  },
  seller: {
    id: 'seller-123',
    name: 'John Seller'
  }
};

// Some additional mock payments for variety
const MOCK_PAYMENTS = [
  HARDCODED_ELECTRIC_STOVE_PAYMENT,
  {
    id: 'mock-payment-2',
    buyerId: 'current-user-id',
    sellerId: 'seller-456',
    hiveId: 'used-laptop-456',
    amount: 1200.00,
    platformFee: 60.00,
    paystackReference: 'unihive-demo-ref-789012',
    status: 'pending',
    metadata: {
      hiveType: 'Essential',
      buyerName: 'Demo User',
      hiveTitle: 'HP Laptop - 6 months old',
      sellerName: 'Sarah Tech'
    },
    createdAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    transactionHive: {
      id: 'used-laptop-456',
      title: 'HP Laptop - 6 months old',
      description: 'Slightly used HP laptop, perfect for assignments and projects.',
      hiveTypeId: 'essential',
      price: 1200.00,
      status: 'pending',
      postedById: 'seller-456',
      assignedToId: null,
      deadline: null,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
      updatedAt: new Date(Date.now() - 3600000).toISOString(),
      postedByUser: {
        id: 'seller-456',
        name: 'Sarah Tech'
      }
    },
    buyer: {
      id: 'current-user-id',
      name: 'Demo User'
    },
    seller: {
      id: 'seller-456',
      name: 'Sarah Tech'
    }
  }
];

interface NetworkError {
  message: string;
  isNetworkError: boolean;
  originalError: unknown;
}

const paymentService = {
  initializePayment: async (hiveId: string) => {
    try {
      const response = await apiClient.post(`/payments/initialize/${hiveId}`);
      return response.data;
    } catch (error: unknown) {
      console.error('Payment initialization error:', error);

      if (typeof error === 'object' && error !== null && 'isNetworkError' in error) {
        throw new Error(`Payment initialization failed due to connection issues. ${(error as NetworkError).message}`);
      }

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        throw new Error(`Payment service error: ${error.response.data.message}`);
      }
      
      throw error instanceof Error ? error : new Error('Unknown payment initialization error');
    }
  },

  // MOCK IMPLEMENTATION - Only for demo
  verifyPayment: async (reference: string) => {
    console.log('DEMO MODE: Verifying payment with reference:', reference);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Always return success for demo
    return {
      status: 'success',
      message: 'Payment verified successfully',
      data: {
        transactionId: 'mock-transaction-id',
        hiveId: 'electric-stove-123',
        amount: '350.00'
      }
    };
  },

  // ALWAYS return mock payment data regardless of API call
  getPaymentHistory: async () => {
    console.log('Returning HARDCODED payment history');

    return MOCK_PAYMENTS;
  },
  
  // MOCK IMPLEMENTATION - Only for demo
  checkPaymentStatus: async (reference: string) => {
    console.log('DEMO MODE: Checking payment status for reference:', reference);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Always return success for demo
    return {
      status: 'success',
      message: 'Payment completed successfully',
      data: {
        transactionId: 'mock-transaction-id',
        hiveId: 'electric-stove-123',
        amount: '350.00'
      }
    };
  }
};

export default paymentService;
