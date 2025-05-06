import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createArchiveHive,
  updateArchiveHive,
  getAllArchiveHives
} from '../controllers/archiveController';
import { uploadArchiveFile } from '../middleware/upload';

const router = express.Router();

// Public routes
router.get('/', getAllArchiveHives);

// Protected routes
router.post('/', authenticate, uploadArchiveFile(), createArchiveHive);
router.put('/:id', authenticate, uploadArchiveFile(), updateArchiveHive);

export default router;
