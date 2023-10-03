import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { isAdminOrPremium } from '../middleware/auth.products.js';

const router = Router();

const ticketController = new TicketController();

router.get('/', isAdminOrPremium, ticketController.getAllTicket);

router.post('/', ticketController.createTicket);

router.get('/:tId', ticketController.getTicketById);

export default router;
