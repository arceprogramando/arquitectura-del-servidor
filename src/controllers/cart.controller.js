import CartService from '../services/cart.services.js';

class CartController {

  constructor() {
    this.cartService = new CartService();
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
      const { cId } = req.params.cId;

      const cart = await this.cartService.getCartById(cId);

      if (!cart) {
        return res.status(404).json({ error: 'Carrito no encontrado en validacion del controller' });
      }

      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el carrito ${error.message}` });
    }
  };
}

export default CartController;

// updateCartById = async (req, res) => {
//   try {
//     const { cId } = req.params;
//     const { products } = req.body;

//     const updatedCart = await this.cartService.updateCartById(cId, products);

//     if (updatedCart) {
//       return res.status(200).json(updatedCart);
//     }
//     return res.status(404).json({ error: 'El carrito no existe' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Error al actualizar el carrito' });
//   }
// };

// updateCartItemQuantity = async (req, res) => {
//   try {
//     const { cId, pId } = req.params;
//     const { quantity } = req.body;

//     const updatedCart = await this.cartService.updateCartItemQuantity(cId, pId, quantity);

//     return res.status(200).json(updatedCart);
//   } catch (error) {
//     return res.status(500).json({ error: 'Error al actualizar la cantidad de ejemplares del producto en el carrito' });
//   }
// };

// deleteCart = async (req, res) => {
//   try {
//     const { cId } = req.params;

//     const deletedCart = await this.cartService.deleteCart(cId);
//     if (!deletedCart) {
//       return res.status(404).json({ error: 'La cart no existe' });
//     }

//     return res.status(200).json({ status: 'success', message: 'La cart ha sido eliminada' });
//   } catch (error) {
//     return res.status(500).json({ error: 'Error al eliminar la cart' });
//   }
// };

// deleteCartItem = async (req, res) => {
//   try {
//     const { cId, pId } = req.params;
//     const updatedCart = await this.cartService.deleteCartItem(cId, pId);
//     return res.status(200).json(updatedCart);
//   } catch (error) {
//     return res.status(500).json({ error: `'Error al eliminar el producto del carrito ${error}'` });
//   }
// };
