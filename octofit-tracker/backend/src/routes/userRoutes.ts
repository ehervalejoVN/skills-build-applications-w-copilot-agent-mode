import { Router } from 'express';
import { createUser, getUserById, listUsers } from '../controllers/userController';

const router = Router();

router.get('/users', listUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);

export default router;
