import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createArchiveHive,
  updateArchiveHive,
  getAllArchiveHives
} from '../controllers/archiveController';

const router = express.Router();

// Public routes
router.get('/', getAllArchiveHives);

// Protected routes
router.post('/', authenticate, createArchiveHive);
router.put('/:id', authenticate, updateArchiveHive);

export default router;
