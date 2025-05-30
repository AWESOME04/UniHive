import axios from 'axios';

const API_URL = import.meta.env?.VITE_API_URL || 'https://unihive-hmoi.onrender.com/api';

// Token storage key
const TOKEN_KEY = 'unihive_token';
const USER_KEY = 'unihive_user';

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

interface ResetPasswordData {
  email: string;
  token: string;
  newPassword: string;
}

// Authentication service without Redux
export const authService = {
  // Register a new user
  register: async (userData: {
    fullName: string;
    email: string;
    password: string;
    university: string;
  }) => {
    try {
      
      const response = await apiClient.post('/auth/register', {
        name: userData.fullName,
        email: userData.email,
        password: userData.password,
        university: userData.university,
      });
      
      console.log('Registration API response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'Registration failed');
      }
      throw new Error('Network error during registration');
    }
  },

  // Verify OTP
  verifyOTP: async (email: string, otp: string) => {
    try {
      console.log('Verifying OTP for email:', email);
      
      const verificationData = { email, otp };
      const response = await apiClient.post('/auth/verify-otp', verificationData);
      
      if (response.data && response.data.data && response.data.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.data.token);

        if (response.data.data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
        }
      }
      
      return response.data;
    } catch (error) {
      console.error('OTP verification error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'OTP verification failed');
      }
      throw new Error('Network error during OTP verification');
    }
  },

  // Resend OTP
  resendOTP: async (email: string) => {
    try {
      const response = await apiClient.post('/auth/resend-otp', { email });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'Failed to resend OTP');
      }
      throw new Error('Network error while resending OTP');
    }
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    try {
      console.log('Sending login request to:', `${API_URL}/auth/login`);
      console.log('With credentials:', { email: credentials.email, passwordProvided: !!credentials.password });
      
      const response = await apiClient.post('/auth/login', credentials);
      
      console.log('Login API response:', response.data);

      if (response.data && response.data.data && response.data.data.token) {
        localStorage.setItem(TOKEN_KEY, response.data.data.token);
        
        // Store user data if available
        if (response.data.data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(response.data.data.user));
        }
        
        return response.data;
      } else {
        console.error('Login response does not contain token or is in unexpected format:', response.data);
        throw new Error('Unexpected response format from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data?.message || 'Login failed';
        throw new Error(errorMessage);
      }
      throw new Error('Network error during login');
    }
  },

  // Logout user
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    return true;
  },

  getCurrentUser: () => {
    try {
      const userJSON = localStorage.getItem(USER_KEY);
      if (!userJSON) return null;
      
      return JSON.parse(userJSON);
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  updateUserInfo: (userData: any) => {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
      return true;
    } catch (e) {
      console.error('Error updating user data:', e);
      return false;
    }
  },

  resetPassword: async (data: ResetPasswordData) => {
    try {
      console.log('Resetting password for email:', data.email);
      
      const response = await apiClient.post('/auth/reset-password', data);
      
      console.log('Password reset response:', response.data);
      
      return response.data;
    } catch (error) {
      console.error('Password reset error:', error);
      
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data?.message || 'Failed to reset password');
      }
      throw new Error('Network error during password reset');
    }
  }
};

export default authService;
