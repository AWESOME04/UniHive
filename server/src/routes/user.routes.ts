import express from 'express';
import { authenticate } from '../middleware/auth';
import { updateProfile, getUserProfile, changePassword } from '../controllers/userController';

const router = express.Router();

// Protected routes
router.put('/profile', authenticate, updateProfile);
router.put('/password', authenticate, changePassword);

// Public routes
router.get('/:id', getUserProfile);

export default router;
