import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  createReview,
  getHiveReviews,
  getUserReviews
} from '../controllers/reviewController';

const router = express.Router();

// Public routes
router.get('/:hiveId/reviews', getHiveReviews);
router.get('/users/:userId/reviews', getUserReviews);

// Protected routes
router.post('/:hiveId/reviews', authenticate, createReview);

export default router;
