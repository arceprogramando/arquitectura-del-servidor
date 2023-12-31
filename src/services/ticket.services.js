import TicketRepository from '../repository/ticket.repository.js';
import CartModel from '../model/carts.models.js';

class TicketService {

  constructor() {
    this.ticketRepository = new TicketRepository();
    this.cartModel = CartModel;
  }

  getAllTicket = async () => {
    try {
      const getAllTicket = await this.ticketRepository.getAllTicket();
      return getAllTicket;
    } catch (error) {
      throw new Error(`Error al traer todos los ticket en el service: ${error.message}`);

    }
  };

  createTicket = async (DataTicket) => {
    try {
      const { email, cart } = DataTicket;
      const cartId = cart[0].cart.toString();

      const cartDocument = await this.cartModel.findById({ _id: cartId }).populate('products.product');

      const productsInCart = cartDocument.products;

      const totalAmount = productsInCart.reduce((total, cartItem) => {
        const { product } = cartItem;

        const productTotal = product.price * cartItem.quantity;

        return total + productTotal;
      }, 0);

      const purchaseDatetime = new Date();

      const newTicket = {
        purchaser: email,
        amount: totalAmount,
        purchaseDatetime,
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
