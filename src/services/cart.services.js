import CartModel from '../dao/models/carts.models.js';

class CartService {
  constructor() {
    this.CartModel = CartModel;
  }

  createCart = async (cartData) => {
    try {
      const cartItems = cartData.map((product) => ({
        product: product.product,
        quantity: product.quantity,
      }));

      const newCart = new this.CartModel({
        products: cartItems,
      });

      const createdCart = await newCart.save();
      return createdCart;
    } catch (error) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  };
}

export default CartService;
