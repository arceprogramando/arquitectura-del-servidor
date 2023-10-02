import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const cartController = new CartController();

const router = Router();

router.post('/', cartController.createCart);

router.get('/', cartController.getCarts);

router.get('/:cId', cartController.getCartById);

router.put('/:cId', cartController.updateCartById);

router.delete('/:cId', cartController.deleteCart);

router.delete('/:cId/deleteproducts', cartController.deleteAllProductsInCart);

router.post('/:cId/products/', cartController.createProductInCart);

router.put('/:cId/products/:pId', cartController.updateCartItemQuantity);

router.delete('/:cId/products/:pId', cartController.deleteItemInCart);

router.get('/:cId/purchase', cartController.purchaseCart);

export default router;
