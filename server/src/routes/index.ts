import express from 'express';
import authRoutes from './auth.routes';

const router = express.Router();

// Basic test route
router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working correctly',
    timestamp: new Date()
  });
});

// Auth routes
router.use('/auth', authRoutes);

export default router;
