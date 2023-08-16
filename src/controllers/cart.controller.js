import CartService from '../services/cart.services.js';
// import CartModel from '../dao/models/carts.models.js';

class CartController {

  constructor() {
    this.cartService = new CartService();
  }

  createCart = async (req, res) => {
    try {
      const cartData = req.body;
      const createdCart = await this.cartService.createCart(cartData);
      return res.status(201).json({ status: 'success', cart: createdCart });
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
      res.status(500).json({ error: 'Error al obtener los carritos' });
    }
  };

  getCartById = async (req, res) => {
    try {
      const cartId = req.params.cId;
      const cart = await this.cartService.getCartById(cartId);

      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado' });
      }

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el carrito ${error.message}` });
    }
  };

  updateCartById = async (req, res) => {
    try {
      const { cId } = req.params;
      const { products } = req.body;

      const updatedCart = await this.cartService.updateCartById(cId, products);

      if (updatedCart) {
        return res.status(200).json(updatedCart);
      }
      return res.status(404).json({ error: 'El carrito no existe' });
    } catch (error) {
      return res.status(500).json({ error: 'Error al actualizar el carrito' });
    }
  };
}

export default CartController;
