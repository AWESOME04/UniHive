import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createAcademiaHive,
  updateAcademiaHive,
  getAllAcademiaHives
} from '../controllers/academiaController';

const router = express.Router();

// Public routes
router.get('/', getAllAcademiaHives);

// Protected routes
router.post('/', authenticate, createAcademiaHive);
router.put('/:id', authenticate, updateAcademiaHive);

export default router;
