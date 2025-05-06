import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createSideHustleHive,
  updateSideHustleHive,
  getAllSideHustleHives
} from '../controllers/sideHustleController';

const router = express.Router();

// Public routes
router.get('/', getAllSideHustleHives);

// Protected routes
router.post('/', authenticate, createSideHustleHive);
router.put('/:id', authenticate, updateSideHustleHive);

export default router;
