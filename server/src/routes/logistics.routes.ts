import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createLogisticsHive,
  updateLogisticsHive,
  getAllLogisticsHives
} from '../controllers/logisticsController';

const router = express.Router();

// Public routes
router.get('/', getAllLogisticsHives);

// Protected routes
router.post('/', authenticate, createLogisticsHive);
router.put('/:id', authenticate, updateLogisticsHive);

export default router;
