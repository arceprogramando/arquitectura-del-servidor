import { Router } from 'express';

import CartModel from '../dao/models/carts.models.js';
import CartController from '../controllers/cart.controller.js';

const router = Router();
const cartController = new CartController();

router.post('/', cartController.createCart);

// router.post('/:cId/product/:pId', cartController.updateCartItem); Sin terminar correctamente

router.get('/', cartController.getCarts);

router.get('/:cId', cartController.getCartById);

router.put('/:cId', async (req, res) => {
  try {
    const { cId } = req.params;
    const { products } = req.body;

    const updatedCart = await CartModel.findByIdAndUpdate(cId, { products }, { new: true });

    if (updatedCart) {
      return res.status(200).json(updatedCart);
    }
    return res.status(404).json({ error: 'El carrito no existe' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
});

router.put('/:cId/product/:pId', async (req, res) => {
  try {
    const { cId, pId } = req.params;
    const { quantity } = req.body;

    const cart = await CartModel.findById({ _id: cId });
    if (!cart) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }

    const existingProduct = cart.products.find((cartProduct) => cartProduct.id === pId);
    if (!existingProduct) {
      return res.status(404).json({ error: 'El producto no existe en el carrito' });
    }

    existingProduct.quantity = quantity;
    const updatedCart = await cart.save();

    return res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la cantidad de ejemplares del producto en el carrito' });
  }
});

router.delete('/carts/:cId', async (req, res) => {
  try {
    const { cId } = req.params;
    const cart = await CartModel.findByIdAndDelete(cId);

    if (!cart) {
      return res.status(404).json({ error: 'La cart no existe' });
    }

    return res.status(200).json({ status: 'success', message: 'La cart ha sido eliminada' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la cart' });
  }
});

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
