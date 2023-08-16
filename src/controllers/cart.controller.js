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
}

export default CartController;
