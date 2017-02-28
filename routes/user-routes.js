import express from 'express';
import * as UserController from '../controllers/user-controller';
const router = express.Router();

router.post('/signup', UserController.signUp);
router.post('/signin', UserController.signIn);
router.post('/bytoken', UserController.getUserByToken);

export default router;