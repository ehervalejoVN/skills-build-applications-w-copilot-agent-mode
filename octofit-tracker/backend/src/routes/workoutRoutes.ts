import { Router } from 'express';
import { createWorkoutSuggestion, listWorkoutSuggestions } from '../controllers/workoutController';

const router = Router();

router.get('/workouts', listWorkoutSuggestions);
router.post('/workouts', createWorkoutSuggestion);

export default router;
