import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';
import CartModel from '../model/carts.models.js';

const cartController = new CartController();

const router = Router();

router.post('/', cartController.createCart);

router.get('/', cartController.getCarts);

router.get('/:cId', cartController.getCartById);

router.put('/:cId', cartController.updateCartById);

router.delete('/:cId', cartController.deleteCart);

router.post('/:cId/products/', cartController.createProductInCart);

router.put('/:cId/products/:pId', cartController.updateCartItemQuantity);

router.delete('/:cId/products/:pId', cartController.deleteItemInCart);

router.post('/:cId/purchase', async (req, res) => {
  try {
    // Saco mi id de la Cart
    const { cId } = req.params;
    // guardo en la cart la cart con la populacion de el array de productos y el product
    const cart = await CartModel.findById(cId).populate('products.product');
    // Si la cart no existe  retorno el carrito no fue encontrado
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }
    console.log('🚀 ~ file: carts.routes.js:32 ~ router.post ~ cart:', cart);

    // Creo un array para guardar los productos que no pudieron ser procesados
    const productNotProcessed = [];

    // Uso el método forEach para iterar sobre los elementos de cart.products
    cart.products.forEach(async (cartProduct) => {
      // Creo una constante product con el valor recibido de cartProduct.product llamandola product
      const { product } = cartProduct;

      // Si el stock es menor igual a la el valor de quantity dentro de cartProduct
      if (product.stock >= cartProduct.quantity) {
        // guardo en product.stock la resta de cantidad de quantity dentro de cartProduct
        product.stock -= cartProduct.quantity;
        // guardo el stock producto
        await product.save();
      } else {
        // sino guardo dentro de mi array productNoProcessed el producto con id de que no pudo ser comprado
        productNotProcessed.push(product._id);
      }
    });

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: 'Error en la compra' });
  }
});

export default router;
