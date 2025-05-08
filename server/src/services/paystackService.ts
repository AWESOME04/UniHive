import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

// Paystack API configuration
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Axios instance with Paystack configuration
const paystackAPI = axios.create({
  baseURL: PAYSTACK_BASE_URL,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Initialize a payment transaction with Paystack
 * @param {Object} data Payment initialization data
 * @returns {Promise<Object>} Paystack response with authorization URL
 */
export const initializeTransaction = async (data: {
  amount: number;
  email: string;
  reference?: string;
  metadata?: any;
  callback_url?: string;
}) => {
  try {
    // Validate amount is greater than zero
    if (!data.amount || data.amount <= 0) {
      throw new Error('Payment amount must be greater than 0');
    }
    
    // Convert amount to kobo/pesewas (smallest currency unit)
    const amountInSmallestUnit = Math.round(data.amount * 100);
    
    console.log('Initializing payment with Paystack:', {
      amount: amountInSmallestUnit,
      email: data.email,
      reference: data.reference,
      callback_url: data.callback_url
    });
    
    const response = await paystackAPI.post('/transaction/initialize', {
      ...data,
      amount: amountInSmallestUnit
    });
    
    console.log('Paystack response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Paystack transaction initialization error details:');
    throw error;
  }
};

/**
 * Verify a payment transaction with Paystack
 * @param {string} reference The transaction reference to verify
 * @returns {Promise<Object>} Verification response
 */
export const verifyTransaction = async (reference: string) => {
  try {
    const response = await paystackAPI.get(`/transaction/verify/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Paystack transaction verification error:', error);
    throw error;
  }
};

/**
 * Verify the signature of Paystack webhook events
 * @param {string} signature The signature from Paystack webhook headers
 * @param {Object|string} payload The request body
 * @returns {boolean} Whether the signature is valid
 */
export const verifyWebhookSignature = (signature: string, payload: any): boolean => {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY || '';
    const hash = crypto
      .createHmac('sha512', secret)
      .update(JSON.stringify(payload))
      .digest('hex');
      
    return hash === signature;
  } catch (error) {
    console.error('Webhook signature verification error:', error);
    return false;
  }
};

/**
 * Calculate platform fee (5% of transaction amount)
 * @param {number} amount The transaction amount
 * @returns {number} The platform fee
 */
export const calculatePlatformFee = (amount: number): number => {
  return parseFloat((amount * 0.05).toFixed(2)); // 5% platform fee
};
