import CartService from '../services/cart.services.js';
import TicketController from './ticket.controller.js';

class CartController {

  constructor() {
    this.cartService = new CartService();
    this.ticketController = new TicketController();

  }

  createCart = async (req, res) => {
    try {
      const cartData = req.body;
      const createCart = await this.cartService.createCart(cartData);
      return res.status(201).json({ status: 'success', cart: createCart });
    } catch (error) {
      return res.status(500).json({ error: `Error al crear el carrito: ${error.message}` });
    }
  };

  getCarts = async (req, res) => {
    try {
      const { limit } = req.query;
      const carts = await this.cartService.getCarts(limit);
      if (limit) {
        const limitedCarts = carts.slice(0, limit);
        res.status(200).json(limitedCarts);
      } else {
        res.status(200).json(carts);
      }
    } catch (error) {
      res.status(500).json({ error: `Error al obtener los carritos en el controller ${error}` });
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cId } = req.params;

      const cart = await this.cartService.getCartById(cId);

      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado en validacion del controller' });
      }

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el carrito ${error.message}` });
    }
  };

  updateCartById = async (req, res) => {
    try {
      const { cId } = req.params;
      const updateData = req.body;

      const updatedCart = await this.cartService.updateCartById(cId, updateData);
      if (!updatedCart) {
        return res.status(404).json({ error: 'El carrito no existe' });
      }
      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: `Error al actualizar el carrito con el id proporcionado ${error}` });
    }
  };

  deleteCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const deletedCart = await this.cartService.deleteCart(cId);
      if (!deletedCart.success) {
        return res.status(404).json({ error: 'La cart no existe' });
      }
      return res.status(200).json({ status: 'success', message: 'La cart ha sido eliminada' });
    } catch (error) {
      return res.status(500).json({ error: `Error al eliminar la cart en controller: ${error}` });
    }
  };

  createProductInCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const { product, quantity } = req.body;

      const updatedCart = await this.cartService.createProductInCart(cId, product, quantity);

      if (!updatedCart) {
        return res.status(404).json({ error: 'El carrito no existe' });
      }

      return res.status(200).json(updatedCart);
    } catch (error) {
      return res.status(500).json({ error: `Error al crear un producto en la cart en controller: ${error.message}` });
    }
  };

  updateCartItemQuantity = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const { quantity } = req.body;

      if (!quantity || typeof quantity !== 'number') {
        return res.status(400).json({ error: `La cantidad ${quantity} es invalida` });
      }

      const updatedCart = await this.cartService.updateCartItemQuantity(cId, pId, quantity);

      if (!updatedCart) {
        return res.status(404).json({ error: 'El carrito o el producto no fueron encontrados' });
      }

      return res.status(200).json({ status: 'success', updatedCart });
    } catch (error) {
      return res.status(500).json({ error: `Error al actualizar la cantidad del item en el controlador: ${error.message}` });
    }
  };

  deleteItemInCart = async (req, res) => {
    try {
      const { cId, pId } = req.params;
      const deleteItemInCart = await this.cartService.deleteItemInCart(cId, pId);
      return res.status(200).json(deleteItemInCart);
    } catch (error) {
      return res.status(500).json({ error: `'Error al eliminar el producto del carrito en el controller ${error}'` });
    }
  };

  purchaseCart = async (req, res) => {
    try {
      const DataUser = req.user;
      const purchaseCart = await this.cartService.purchaseCart(DataUser);

      return res.status(201).json({ status: 'success', purchasecart: purchaseCart });
    } catch (error) {
      return res.status(500).json({ error: `'Error al comprar el carrito en el controller ${error}'` });

    }
  };
}

export default CartController;
