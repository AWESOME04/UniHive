import express from 'express';
import { authenticate } from '../middleware/auth';
import { 
  applyToHive,
  getHiveApplications,
  updateApplicationStatus,
  getMyApplications
} from '../controllers/applicationController';

const router = express.Router();

router.use(authenticate);

// Applications for specific hive
router.post('/:hiveId/applications', applyToHive);
router.get('/:hiveId/applications', getHiveApplications);
router.put('/:hiveId/applications/:applicationId', updateApplicationStatus);

// Current user's applications
router.get('/applications/me', getMyApplications);

export default router;
