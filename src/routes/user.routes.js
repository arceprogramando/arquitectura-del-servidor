import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';

const router = Router();

const userController = new UserController();

router.get('/premium/:uId', userController.changeRoleWithId);

router.post('/:uId/documents', userController.uploadDocuments);

export default router;
