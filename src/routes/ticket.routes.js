import { Router } from 'express';
import TicketController from '../controllers/ticket.controller.js';

const router = Router();

const ticketController = new TicketController();

router.post('/', ticketController.createTicket);

router.get('/:tId', ticketController.getTicketById);

export default router;
