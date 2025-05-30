import express from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import hiveRoutes from './hive.routes';
import essentialsRoutes from './essentials.routes';
import academiaRoutes from './academia.routes';
import logisticsRoutes from './logistics.routes';
import buzzRoutes from './buzz.routes';
import archiveRoutes from './archive.routes';
import sideHustleRoutes from './sidehustle.routes';
import applicationRoutes from './application.routes';
import reviewRoutes from './review.routes';
import paymentRoutes from './payment.routes';
import messageRoutes from './message.routes';

const router = express.Router();

// Basic test route
router.get('/status', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is working correctly',
    timestamp: new Date()
  });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/hives', hiveRoutes);

router.use('/essentials', essentialsRoutes);
router.use('/academia', academiaRoutes);
router.use('/logistics', logisticsRoutes);
router.use('/buzz', buzzRoutes);
router.use('/archive', archiveRoutes);
router.use('/sidehustle', sideHustleRoutes);

router.use('/hives', applicationRoutes);
router.use('/hives', reviewRoutes);

router.use('/payments', paymentRoutes);
router.use('/messages', messageRoutes);

export default router;
