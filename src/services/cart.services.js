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
      throw new Error(`Error al obtener el carrito ${error.message}`);
    }
  };
}

export default CartService;

// updateCartById = async (cartId, products) => {
//   try {
//     const updatedCart = await this.CartModel.findByIdAndUpdate(cartId, { products }, { new: true });
//     return updatedCart;
//   } catch (error) {
//     throw new Error('Error al actualizar el carrito');
//   }
// };

// deleteCart = async (cartId) => {
//   try {
//     const deletedCart = await this.CartModel.findByIdAndDelete(cartId);
//     return deletedCart;
//   } catch (error) {
//     throw new Error('Error al eliminar la cart');
//   }
// };

// deleteCartItem = async (cId, pId) => {
//   try {
//     const cart = await this.CartModel.findById(cId);
//     if (!cart) {
//       throw new Error('El carrito no existe');
//     }

//     const productIndex = cart.products.findIndex((product) => product._id.toString() === pId);
//     if (productIndex === -1) {
//       throw new Error('El producto no existe en el carrito');
//     }

//     cart.products.splice(productIndex, 1);
//     const updatedCart = await cart.save();

//     return updatedCart;
//   } catch (error) {
//     throw new Error('Error al eliminar el producto del carrito');
//   }
// };
