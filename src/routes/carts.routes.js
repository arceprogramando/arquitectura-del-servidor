import { Router } from 'express';
import CartController from '../controllers/cart.controller.js';
// import CartModel from '../model/carts.models.js';

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

router.get('/:cId/purchase', cartController.purchaseCart);

export default router;
