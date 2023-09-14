import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';
import { isAdmin } from '../middleware/auth.products.js';

const router = Router();

const ticketController = new TicketController();

router.get('/', isAdmin, ticketController.getAllTicket);

router.post('/', ticketController.createTicket);

router.get('/:tId', ticketController.getTicketById);

export default router;
