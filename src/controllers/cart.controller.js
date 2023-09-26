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
      const createCart = await this.cartService.createCart(cartData);
      return this.httpResponse.OK(res, 'creando carrito', { cart: createCart });

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al crear el carrito`, { error: error.message });
    }
  };

  getCarts = async (req, res) => {
    try {
      const { limit } = req.query;
      const carts = await this.cartService.getCarts(limit);
      if (limit) {
        const limitedCarts = carts.slice(0, limit);
        return this.httpResponse.OK(res, 'Tomando Carritos', { carts: limitedCarts });
      }
      return this.httpResponse.OK(res, 'Tomando Carritos', { carts });

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al traer los carritos`, { error: error.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cId } = req.params;
      const cart = await this.cartService.getCartById(cId);
      if (!cart) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.INVALID_PARAMS}La cart con id  ${cId} no existe`);
      }
      return this.httpResponse.OK(res, `Se encontro la cart con id:${cId} `, { cart });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al traer el carrito `, { error: error.message });

    }
  };

  updateCartById = async (req, res) => {
    try {
      const { cId } = req.params;
      const updateData = req.body;

      const updatedCart = await this.cartService.updateCartById(cId, updateData);
      if (!updatedCart) {
        return this.httpResponse.NOT_FOUND(res, `Error al actualizar la cart  con id  ${cId} `);
      }
      return this.httpResponse.OK(res, `Actualizada  la cart  con id  ${cId} `, { data: updatedCart });

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al actualizar el carrito con el id proporcionado `, { error });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const deletedCart = await this.cartService.deleteCart(cId);

      if (!deletedCart.success) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.DB_ERROR}La cart con id ${cId} no se encuentra o no se pudo borrar`);
      }

      return this.httpResponse.OK(res, `La cart  con id  ${cId} ha sido borrada `);
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al Eliminar el carrito con el id proporcionado `, { error });
    }
  };

  createProductInCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const { product, quantity } = req.body;

      const updatedCart = await this.cartService.createProductInCart(cId, product, quantity);

      if (!updatedCart) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.INVALID_PARAMS}Error al crear un actualizar cart  con id  ${cId} `);
      }

      return this.httpResponse.OK(res, `El producto dentro de la cart con el id  ${cId} ha sido creado `);
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al Crear un producto dentro de la cart `, { error });

    }
  };

  updateCartItemQuantity = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const { quantity } = req.body;

      if (!quantity || typeof quantity !== 'number') {
        return this.httpResponse.BAD_REQUEST(res, `La cantidad ${quantity} es invalida`);
      }

      const updatedCart = await this.cartService.updateCartItemQuantity(cId, pId, quantity);

      if (!updatedCart) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.INVALID_PARAMS}Error al actualizar cart  con id  ${cId} `);
      }

      return this.httpResponse.OK(res, `La cart  con id  ${cId} ha sido borrada `, { data: updatedCart });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al actualizar la cantidad del item en el controlador:  `, { error });
    }
  };

  deleteItemInCart = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const deleteItemInCart = await this.cartService.deleteItemInCart(cId, pId);
      return this.httpResponse.OK(res, `El item con id ${pId} en la cart ${cId} ha sido borrado `, { data: deleteItemInCart });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al eliminar el producto del carrito en el controller `, { error });
    }
  };

  purchaseCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const DataUser = req.user;

      const purchaseCart = await this.cartService.purchaseCart(DataUser);
      if (!purchaseCart) {
        return this.httpResponse.BAD_REQUEST(res, `${this.enumError.DB_ERROR} Error al actualizar cart  con id  ${cId} `);
      }
      return this.httpResponse.CREATED(res, `La cart con ${cId} ha sido comprado`, { purchasecart: purchaseCart });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al comprar el carrito en el controller `, { error });
    }
  };
}

export default CartController;
