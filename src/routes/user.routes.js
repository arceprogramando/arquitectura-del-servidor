import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';

const router = Router();

const userController = new UserController();

router.get('/premium/:uid', userController.changeRoleWithId);

// router.post('/:uid/documents`, userController.');

export default router;
