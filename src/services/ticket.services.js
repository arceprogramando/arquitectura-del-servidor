import TicketRepository from '../repository/ticket.repository.js';
import calculateTotal from '../helpers/calculateTotal.js';

class TicketService {

  constructor() {
    this.ticketRepository = new TicketRepository();
  }

  createTicket = async (ticketData) => {
    try {

      const ticketItems = ticketData.products.map((product) => ({
        product: product.product,
        price: product.price,
        quantity: product.quantity || 1,
      }));

      const total = calculateTotal(ticketItems);

      const newTicket = {
        user: ticketData.user,
        total,
        products: ticketItems,
        purchaser: ticketData.purchaser,
      };

      const createTicket = await this.ticketRepository.createTicket(newTicket);
      return createTicket;
    } catch (error) {
      throw new Error(`Error al crear el ticket en el service: ${error.message}`);
    }
  };

  getTicketById = async (tId) => {
    try {
      const getCartById = await this.ticketRepository.getTicketById(tId);
      return getCartById;
    } catch (error) {
      throw new Error(`Error al obtener el ticket con id ${tId} en el service: ${error.message}`);

    }
  };
}

export default TicketService;
