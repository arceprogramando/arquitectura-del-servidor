import { Router } from 'express';
import UserController from '../controllers/user.controllers.js';
import { uploadDocuments } from '../middleware/uploader.js';
import { isAdmin } from '../middleware/auth.products.js';

const router = Router();

const userController = new UserController();

router.get('/premium/:uId', userController.changeRoleWithId);

router.post('/:uId/documents', uploadDocuments.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'identificationImage', maxCount: 1 },
  { name: 'residenceImage', maxCount: 1 },
  { name: 'accountStatusImage', maxCount: 1 },
]), userController.uploadDocuments);

router.get('/', userController.getAllUsers);

router.delete('/', userController.deleteInactiveUsersAndNotify);

router.delete('/:uId', userController.deleteUserbyId);

router.put('/:uId/changerole', isAdmin, userController.adminChangerRoles);

export default router;
