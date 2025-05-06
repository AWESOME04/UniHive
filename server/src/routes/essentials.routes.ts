import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createEssentialsHive,
  updateEssentialsHive,
  getAllEssentialsHives
} from '../controllers/essentialsController';
import { uploadEssentialsImages } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getAllEssentialsHives);

// Protected routes
router.post('/', authenticate, uploadEssentialsImages(), createEssentialsHive);
router.put('/:id', authenticate, uploadEssentialsImages(), updateEssentialsHive);

export default router;
