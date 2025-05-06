import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createBuzzHive,
  updateBuzzHive,
  getAllBuzzHives
} from '../controllers/buzzController';
import { uploadEventImage } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getAllBuzzHives);

// Protected routes
router.post('/', authenticate, uploadEventImage(), createBuzzHive);
router.put('/:id', authenticate, uploadEventImage(), updateBuzzHive);

export default router;
