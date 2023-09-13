import TicketService from '../services/ticket.services.js';

class TicketController {

  constructor() {
    this.ticketService = new TicketService();
  }

  createTicket = async (req, res) => {
    try {
      const { ticketData } = req.body;
      console.log('🚀 ~ file: ticket.controller.js:12 ~ TicketController ~ createTicket= ~ ticketData:', ticketData);
      const createTicket = await this.ticketService.createTicket(ticketData);
      return res.status(201).json({ status: 'success', cart: createTicket });
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el carrito  en el controlador${error.message}` });
    }
  };

  getTicketById = async (req, res) => {
    try {
      const { tId } = req.params;
      const getTicketById = await this.ticketService.getTicketById(tId);
      return getTicketById;
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el carrito  en el controlador${error.message}` });
    }
  };
}
export default TicketController;
