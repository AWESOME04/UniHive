import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createBuzzHive,
  updateBuzzHive,
  getAllBuzzHives
} from '../controllers/buzzController';

const router = express.Router();

// Public routes
router.get('/', getAllBuzzHives);

// Protected routes
router.post('/', authenticate, createBuzzHive);
router.put('/:id', authenticate, updateBuzzHive);

export default router;
