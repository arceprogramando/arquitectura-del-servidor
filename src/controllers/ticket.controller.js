import TicketService from '../services/ticket.services.js';
import Responses from '../middleware/error.handlers.js';

class TicketController {

  constructor() {
    this.ticketService = new TicketService();
    this.httpResponse = new Responses.HttpResponse();
  }

  getAllTicket = async (req, res) => {
    try {
      const getAllTicket = await this.ticketService.getAllTicket();
      return this.httpResponse.OK(res, 'Tomando Tickets', { ticket: getAllTicket });
    } catch (error) {
      return this.httpResponse.ERROR(res, 'error al obtener todos los tickets', { error: error.message });
    }
  };

  createTicket = async (req, res) => {
    try {
      const DataTicket = req.user;
      const createdTicket = await this.ticketService.createTicket(DataTicket);
      return this.httpResponse.CREATED(res, 'Creando Ticket', { ticket: createdTicket });
    } catch (error) {
      return this.httpResponse.ERROR(res, 'error al crear el ticket', { error: error.message });
    }
  };

  getTicketById = async (req, res) => {
    try {
      const { tId } = req.params;
      const getTicketById = await this.ticketService.getTicketById(tId);
      return this.httpResponse.OK(res, `Se encontro el ticket con id:${tId} `, { ticket: getTicketById });
    } catch (error) {
      return this.httpResponse.ERROR(res, 'error al obtener el ticket', { error: error.message });
    }
  };
}
export default TicketController;
