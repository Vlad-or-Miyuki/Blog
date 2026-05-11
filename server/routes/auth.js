import { Router } from 'express';
import { getMe, login, register } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

router.get('/me', checkAuth, getMe);
router.post('/register', register);
router.post('/login', login);


export default router;
