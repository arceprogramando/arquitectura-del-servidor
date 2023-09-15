import CartRepository from '../repository/cart.repository.js';
import TicketService from './ticket.services.js';

class CartService {
  constructor() {
    this.cartRepository = new CartRepository();
    this.ticketService = new TicketService();
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

  purchaseCart = async (DataUser) => {
    try {
      // Desestructuro el data user
      const { email, carts } = DataUser;

      // Verifica si hay carritos en DataUser
      if (carts && carts.length > 0) {
        const firstCart = carts[0]; // Suponiendo que solo haya un carrito
        const cId = firstCart.cart.toString();

        // Populo La cart traída por id
        const cart = await this.cartRepository.getCartByIdPopulate(cId);

        // Entro a los productos dentro de la cart
        const productsInCart = cart.products;

        // Realizo una operación para cada uno
        const productsProcessed = productsInCart.reduce((processed, cartItem) => {
          // Traigo el producto
          const { product } = cartItem;

          // Traigo la cantidad de producto que quiero comprar
          const quantityToPurchase = cartItem.quantity;

          // Si el stock del producto es mayor o igual a la cantidad de producto que quiero comprar
          if (product.stock >= quantityToPurchase) {
            // Hago una resta del stock del producto la cantidad a comprar
            product.stock -= quantityToPurchase;
            // y uso el método process para pushear el cambio de cantidad
            processed.push({ product: product._id, quantity: quantityToPurchase });
          }

          return processed;
        }, []);

        const totalAmount = productsProcessed.reduce((total, cartItem) => {
          const { product } = cartItem;
          const productTotal = product.price * cartItem.quantity;
          return total + productTotal;
        }, 0);

        const DataTicket = {
          email,
          totalAmount,
          cart: carts,
        };

        // Crea el ticket antes de actualizar el carrito
        const createTicket = await this.ticketService.createTicket(DataTicket);

        // Actualiza el carrito del usuario con los productos que se pudieron comprar
        const updatedCartData = { products: [] }; // Deja el carrito vacío
        const updatedCart = await this.updateCartById(cId, updatedCartData);

        return { updatedCart, createTicket };
      }

      throw new Error('No se encontraron carritos en el usuario.');
    } catch (error) {
      throw new Error(`Error al comprar el carrito en el servicio: ${error}`);
    }
  };

}

export default CartService;
