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

  getCarts = async (limit) => {
    try {
      let query = this.CartModel.find({});

      if (limit) {
        query = query.limit(parseInt(limit, 10));
      }

      const carts = await query.exec();
      return carts;
    } catch (error) {
      throw new Error('Error al obtener los carritos');
    }
  };

  getCartById = async (cartId) => {
    try {
      const cart = await this.CartModel.findById(cartId).populate('products.product');
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener el carrito ${error.message}`);
    }
  };

  updateCartById = async (cartId, products) => {
    try {
      const updatedCart = await this.CartModel.findByIdAndUpdate(cartId, { products }, { new: true });
      return updatedCart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  };

  deleteCart = async (cartId) => {
    try {
      const deletedCart = await this.CartModel.findByIdAndDelete(cartId);
      return deletedCart;
    } catch (error) {
      throw new Error('Error al eliminar la cart');
    }
  };

  deleteCartItem = async (cId, pId) => {
    try {
      const cart = await this.CartModel.findById(cId);
      if (!cart) {
        throw new Error('El carrito no existe');
      }

      const productIndex = cart.products.findIndex((product) => product._id.toString() === pId);
      if (productIndex === -1) {
        throw new Error('El producto no existe en el carrito');
      }

      cart.products.splice(productIndex, 1);
      const updatedCart = await cart.save();

      return updatedCart;
    } catch (error) {
      throw new Error('Error al eliminar el producto del carrito');
    }
  };

}

export default CartService;
