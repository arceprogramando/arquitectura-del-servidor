import CartService from '../services/cart.services.js';
import TicketController from './ticket.controller.js';
import Responses from '../middleware/error.handlers.js';

class CartController {

  constructor() {
    this.cartService = new CartService();
    this.ticketController = new TicketController();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
  }

  createCart = async (req, res) => {
    try {
      const cartData = req.body;

      if (!cartData) {
        req.logger.warn('No se proporcionaron datos para crear el carrito');
        return this.httpResponse.BAD_REQUEST(res, 'No se proporcionaron datos para crear el carrito');
      }

      const createCart = await this.cartService.createCart(cartData);
      req.logger.info('Carrito creado:', createCart);
      return this.httpResponse.OK(res, 'creando carrito', { cart: createCart });

    } catch (error) {
      req.logger.error('Error al crear el carrito:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al crear el carrito`, { error: error.message });
    }
  };

  getCarts = async (req, res) => {
    try {
      const { limit } = req.query;
      const carts = await this.cartService.getCarts(limit);
      if (limit) {
        const limitedCarts = carts.slice(0, limit);
        req.logger.info('Tomando carritos limitados:', limitedCarts);
        return this.httpResponse.OK(res, 'Tomando Carritos', { carts: limitedCarts });
      }
      req.logger.info('Tomando carritos:', carts);
      return this.httpResponse.OK(res, 'Tomando Carritos', { carts });

    } catch (error) {
      req.logger.error('Error al traer los carritos:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al traer los carritos`, { error: error.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cId } = req.params;
      const cart = await this.cartService.getCartById(cId);
      if (!cart) {
        req.logger.warn(`La cart con id ${cId} no existe`);
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.INVALID_PARAMS}La cart con id  ${cId} no existe`);
      }
      req.logger.info(`Se encontró la cart con id:${cId}`, cart);
      return this.httpResponse.OK(res, `Se encontro la cart con id:${cId} `, { cart });
    } catch (error) {
      req.logger.error('Error al traer el carrito:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al traer el carrito `, { error: error.message });
    }
  };

  updateCartById = async (req, res) => {
    try {
      const { cId } = req.params;
      const updateData = req.body;

      const updatedCart = await this.cartService.updateCartById(cId, updateData);
      if (!updatedCart) {
        req.logger.warn(`Error al actualizar la cart con id ${cId}`);
        return this.httpResponse.NOT_FOUND(res, `Error al actualizar la cart con id  ${cId} `);
      }
      req.logger.info(`Cart actualizada con id ${cId}`, updatedCart);
      return this.httpResponse.OK(res, `Actualizada la cart con id ${cId} `, { data: updatedCart });

    } catch (error) {
      req.logger.error('Error al actualizar el carrito:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al actualizar el carrito con el id proporcionado `, { error });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const deletedCart = await this.cartService.deleteCart(cId);

      if (!deletedCart.success) {
        req.logger.warn(`La cart con id ${cId} no se encuentra o no se pudo borrar`);
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.DB_ERROR}La cart con id ${cId} no se encuentra o no se pudo borrar`);
      }

      req.logger.info(`La cart con id ${cId} ha sido borrada`);
      return this.httpResponse.OK(res, `La cart con id  ${cId} ha sido borrada `);
    } catch (error) {
      req.logger.error('Error al eliminar el carrito:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al Eliminar el carrito con el id proporcionado `, { error });
    }
  };

  deleteAllProductsInCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const deleteAllProductsInCart = await this.cartService.deleteAllProductsInCart(cId);

      if (!deleteAllProductsInCart.success) {
        req.logger.warn(`La cart con id ${cId} no se encuentra o no se pudo vaciar`);
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.DB_ERROR}La cart con id ${cId} no se encuentra o no se pudo vaciar`);
      }

      req.logger.info(`La cart con id ${cId} ha sido vaciada`);
      return this.httpResponse.OK(res, `La cart con id ${cId} ha sido vaciada`);

    } catch (error) {
      req.logger.error('Error al vaciar el carrito:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al vaciar el carrito con el id proporcionado `, { error });

    }
  };

  createProductInCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const { product, quantity } = req.body;

      const updatedCart = await this.cartService.createProductInCart(cId, product, quantity);

      if (!updatedCart) {
        req.logger.warn(`Error al crear o actualizar la cart con id ${cId}`);
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.INVALID_PARAMS}Error al crear o actualizar la cart con id  ${cId} `);
      }

      req.logger.info(`El producto dentro de la cart con el id ${cId} ha sido creado`);
      return this.httpResponse.OK(res, `El producto dentro de la cart con el id  ${cId} ha sido creado `);
    } catch (error) {
      req.logger.error('Error al Crear un producto dentro de la cart:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al Crear un producto dentro de la cart `, { error });

    }
  };

  updateCartItemQuantity = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const { quantity } = req.body;

      if (!quantity || typeof quantity !== 'number') {
        req.logger.warn(`La cantidad ${quantity} es invalida`); // Registro warn
        return this.httpResponse.BAD_REQUEST(res, `La cantidad ${quantity} es invalida`);
      }

      const updatedCart = await this.cartService.updateCartItemQuantity(cId, pId, quantity);

      if (!updatedCart) {
        req.logger.warn(`Error al actualizar la cart con id ${cId}`); // Registro warn
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.INVALID_PARAMS}Error al actualizar cart con id  ${cId} `);
      }

      req.logger.info(`La cart con id ${cId} ha sido actualizada`, updatedCart); // Registro info
      return this.httpResponse.OK(res, `La cart con id  ${cId} ha sido actualizada `, { data: updatedCart });
    } catch (error) {
      req.logger.error('Error al actualizar la cantidad del item en el controlador:', error); // Registro error
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al actualizar la cantidad del item en el controlador:  `, { error });
    }
  };

  deleteItemInCart = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const deleteItemInCart = await this.cartService.deleteItemInCart(cId, pId);
      req.logger.info(`El item con id ${pId} en la cart ${cId} ha sido borrado`, deleteItemInCart); // Registro info
      return this.httpResponse.OK(res, `El item con id ${pId} en la cart ${cId} ha sido borrado `, { data: deleteItemInCart });
    } catch (error) {
      req.logger.error('Error al eliminar el producto del carrito en el controller:', error); // Registro error
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al eliminar el producto del carrito en el controller `, { error });
    }
  };

  purchaseCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const DataUser = req.user;

      const purchaseCart = await this.cartService.purchaseCart(DataUser);
      if (!purchaseCart) {
        req.logger.warn(`Error al comprar el carrito con id ${cId} en el controller`);
        return this.httpResponse.BAD_REQUEST(res, `${this.enumError.DB_ERROR} Error al actualizar cart con id  ${cId} `);
      }
      req.logger.info(`La cart con ${cId} ha sido comprada`, purchaseCart);
      return this.httpResponse.CREATED(res, `La cart con ${cId} ha sido comprada`, { purchasecart: purchaseCart });
    } catch (error) {
      req.logger.error('Error al comprar el carrito en el controller:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al comprar el carrito en el controller `, { error });
    }
  };
}

export default CartController;
