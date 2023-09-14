import TicketService from '../services/ticket.services.js';

class TicketController {

  constructor() {
    this.ticketService = new TicketService();
  }

  getAllTicket = async (req, res) => {
    try {
      const getAllTicket = await this.ticketService.getAllTicket();
      return getAllTicket;
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener todos los tickets   en el controlador${error.message}` });

    }
  };

  createTicket = async (req, res) => {
    try {
      const UserData = req.user;
      const createdTicket = await this.ticketService.createTicket(UserData);
      return res.status(201).json({ status: 'success', cart: createdTicket });
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
