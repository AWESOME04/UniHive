import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  getHiveTypes,
  getAllHives,
  getHiveById,
  getMyPostedHives,
  getMyAssignedHives,
  deleteHive,
  updateHiveStatus,
  assignHive
} from '../controllers/hiveController';

const router = express.Router();

// Public routes
router.get('/types', getHiveTypes);
router.get('/', getAllHives);
router.get('/:id', getHiveById);

// Protected routes
router.get('/my/posted', authenticate, getMyPostedHives);
router.get('/my/assigned', authenticate, getMyAssignedHives);
router.delete('/:id', authenticate, deleteHive);
router.put('/:id/status', authenticate, updateHiveStatus);
router.put('/:id/assign', authenticate, assignHive);

export default router;
