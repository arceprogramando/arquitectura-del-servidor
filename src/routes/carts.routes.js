import { Router } from 'express';

import CartModel from '../dao/models/carts.models.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const products = req.body;

    const cartItems = products.map((product) => ({
      product: product.product,
      quantity: product.quantity,
    }));

    const newCart = new CartModel({
      products: cartItems,
    });

    const createdCart = await newCart.save();
    return res.status(201).json({ status: 'success', cart: createdCart });
  } catch (error) {
    return res.status(500).json({ error: `Error al crear el carrito ${error}` });
  }
});

router.post('/:cId/product/:pId', async (req, res) => {
  try {
    const { cId, pId } = req.params;
    const { quantity } = req.body;

    const cart = await CartModel.findById(cId);

    if (!cart) {
      return res.status(404).json({ error: 'La cart no existe' });
    }

    const productIndex = cart.products.findIndex((product) => product.id === pId);

    if (productIndex !== -1) {
      cart.product[productIndex].quantity = quantity;
    } else {
      cart.product.push({ id: pId, quantity });
    }

    const updatedCart = await cart.save();

    return res.status(200).json(updatedCart);

  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar o modificar el producto en el carrito' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { limit } = req.query;
    let query = CartModel.find({});

    if (limit) {
      query = query.limit(parseInt(limit, 10));
    }

    const carts = await query.exec();

    if (limit) {
      const limitedCarts = carts.slice(0, limit);
      res.status(200).json(limitedCarts);
    } else {
      res.status(200).json(carts);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los carritos' });
  }
});

router.get('/:cId', async (req, res) => {
  try {
    const cart = await CartModel.findById({ _id: req.params.cId }).populate('product.product');

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ error: `Error al obtener el carrito ${error}` });
  }
});

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
