import { Router } from 'express';

import CartModel from '../dao/models/carts.models.js';
import CartController from '../controllers/cart.controller.js';

const router = Router();
const cartController = new CartController();

router.post('/', cartController.createCart);

// router.post('/:cId/product/:pId', cartController.updateCartItem); Sin terminar correctamente

router.get('/', cartController.getCarts);

router.get('/:cId', cartController.getCartById);

router.put('/:cId', cartController.updateCartById);

router.put('/:cId/product/:pId', cartController.updateCartItemQuantity);

router.delete('/:cId', cartController.deleteCart);

router.delete('/:cId/product/:pId', async (req, res) => {
  try {
    const { cId, pId } = req.params;

    const cart = await CartModel.findById({ _id: cId });
    if (!cart) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }

    const productIndex = cart.products.findIndex((product) => product.id === pId);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'El producto no existe en el carrito' });
    }

    cart.products.splice(productIndex, 1);
    const updatedCart = await cart.save();

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

export default router;
