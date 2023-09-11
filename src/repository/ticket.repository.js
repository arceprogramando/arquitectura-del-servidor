import TicketModel from '../model/ticket.models.js';

class TicketRepository {
  constructor() {
    this.ticketModel = TicketModel;
  }

  createTicket = async (newTicket) => {
    try {
      const createdTicket = await this.ticketModel.create(newTicket);
      return createdTicket;
    } catch (error) {
      throw new Error(`Error al crear el ticket en la base de datos: ${error.message}`);
    }
  };

  getTicketById = async (tId) => {
    try {
      const getTicketById = await this.ticketModel.find({ _id: tId });
      return getTicketById;
    } catch (error) {
      throw new Error(`Error al buscar el ticket por el id con el id ${tId} en la base de datos: ${error.message}`);
    }
  };
}
export default TicketRepository;
