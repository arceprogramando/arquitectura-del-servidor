import { Router } from 'express';
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

router.delete('/:cId/product/:pId', cartController.deleteCartItem);

export default router;
