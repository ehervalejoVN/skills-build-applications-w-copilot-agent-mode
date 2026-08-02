import { Router } from 'express';
import { createActivity, listActivities } from '../controllers/activityController';

const router = Router();

router.get('/activities', listActivities);
router.post('/activities', createActivity);

export default router;
