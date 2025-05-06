import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createEssentialsHive,
  updateEssentialsHive,
  getAllEssentialsHives
} from '../controllers/essentialsController';

const router = express.Router();

// Public routes
router.get('/', getAllEssentialsHives);

// Protected routes
router.post('/', authenticate, createEssentialsHive);
router.put('/:id', authenticate, updateEssentialsHive);

export default router;
