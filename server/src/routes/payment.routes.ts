import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  initializePayment,
  verifyPayment,
  webhookHandler,
  getPaymentHistory
} from '../controllers/paymentController';

const router = express.Router();

// Public routes
router.post('/webhook', webhookHandler);
router.get('/verify', verifyPayment);

// Protected routes
router.post('/initialize/:hiveId', authenticate, initializePayment);
router.get('/history', authenticate, getPaymentHistory);

export default router;
