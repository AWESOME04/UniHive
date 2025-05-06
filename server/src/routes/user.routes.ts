import express from 'express';
import { authenticate } from '../middleware/auth';
import { updateProfile, getUserProfile, changePassword } from '../controllers/userController';
import { uploadProfileImage } from '../middleware/upload';

const router = express.Router();

// Protected routes - need authentication
router.put('/profile', authenticate, uploadProfileImage(), updateProfile);
router.put('/password', authenticate, changePassword);

// Public routes
router.get('/:id', getUserProfile);

export default router;
