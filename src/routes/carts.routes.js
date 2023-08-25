import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';

const cartController = new CartController();

const router = Router();

router.post('/', cartController.createCart);

router.get('/', cartController.getCarts);

router.get('/:cId', cartController.getCartById);

router.put('/:cId', cartController.updateCartById);

router.delete('/:cId', cartController.deleteCart);

router.post('/:cId/product/', cartController.createProductInCart);

export default router;

// router.put('/:cId/product/:pId', cartController.updateCartItemQuantity);

// router.delete('/:cId/product/:pId', cartController.deleteCartItem);
