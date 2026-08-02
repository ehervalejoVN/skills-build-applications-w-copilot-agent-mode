import { Router } from 'express';
import healthRoutes from './healthRoutes';
import userRoutes from './userRoutes';
import teamRoutes from './teamRoutes';
import activityRoutes from './activityRoutes';
import workoutRoutes from './workoutRoutes';

const router = Router();

router.use('/api', healthRoutes);
router.use('/api', userRoutes);
router.use('/api', teamRoutes);
router.use('/api', activityRoutes);
router.use('/api', workoutRoutes);

export default router;
