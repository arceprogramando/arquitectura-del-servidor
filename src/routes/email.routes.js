import { Router } from 'express';
import EmailController from '../controllers/email.controller.js';

const emailController = new EmailController();

const router = Router();

router.post('/', emailController.sendEmail);

export default router;
