import CartRepository from '../repository/cart.repository.js';

class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
  }

  createCart = async (cartData) => {
    try {
      const cartItems = cartData.map((product) => ({
        product: product.product,
        quantity: product.quantity,
      }));

      const newCart = {
        products: cartItems,
      };
      const createdCart = await this.cartRepository.createCart(newCart);
      return createdCart;
    } catch (error) {
      throw new Error(`Error al crear el carrito en el service: ${error.message}`);
    }
  };

  getCarts = async (limit) => {
    try {
      const carts = await this.cartRepository.getCarts(limit);
      return carts;
    } catch (error) {
      throw new Error(`Error al obtener los carritos en el service: ${error.message}`);
    }
  };

  getCartById = async (cId) => {
    try {
      const cart = await this.cartRepository.getCartById(cId);
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener el carrito en el service${error.message}`);
    }
  };

  updateCartById = async (cId, updateData) => {
    try {
      const updatedCart = await this.cartRepository.updateCartById(cId, updateData);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error al actualizar el carrito ${error.message}`);
    }
  };

  deleteCart = async (cartId) => {
    try {
      const deletedCart = await this.cartRepository.deleteCart(cartId);
      return deletedCart;
    } catch (error) {
      throw new Error(`Error al eliminar la cart en el services con error: ${error}`);
    }
  };

  createProductInCart = async (cId, pId, quantity) => {
    try {
      const updatedCart = await this.cartRepository.createProductInCart(cId, pId, quantity);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error al crear un producto cart con id ${cId}, en el services con error: ${error}`);
    }
  };

  updateCartItemQuantity = async (cId, pId, quantity) => {
    try {
      const updatedCart = await this.cartRepository.updateCartItemQuantity(cId, pId, quantity);
      return updatedCart;
    } catch (error) {
      throw new Error(`Error al actualizar la cantidad del producto ${pId} en la cart con id ${cId}, en el services con error: ${error}`);
    }
  };

  deleteItemInCart = async (cId, pId) => {
    try {
      const cart = await this.cartRepository.deleteItemInCart(cId);
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

  purchaseCart = async (cId) => {
    try {
      const purchaseCart = await this.cartRepository.purchaseCart(cId);
      return purchaseCart;
    } catch (error) {
      throw new Error(`Error al comprar el carrito con id ${cId}`);

    }
  };
}

export default CartService;
