import { Router } from 'express';
import MessageController from '../controllers/message.controller.js';
import { isUser } from '../middleware/auth.products.js';

const router = Router();

const messageController = new MessageController();

router.post('/', isUser, messageController.createMessage);

export default router;
