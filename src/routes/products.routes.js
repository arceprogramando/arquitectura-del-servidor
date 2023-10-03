import { Router } from 'express';
import uploadMiddleware from '../middleware/uploader.js';
import ProductController from '../controllers/product.controller.js';
import { isAdminOrPremium, isAuthenticated } from '../middleware/auth.products.js';

const productController = new ProductController();

const router = Router();

router.post('/', isAuthenticated, uploadMiddleware, productController.createProduct);

router.get('/', isAuthenticated, productController.getAllProducts);

router.get('/:pId', isAuthenticated, productController.getProductById);

router.put('/:pId', isAdminOrPremium, uploadMiddleware, productController.updateProductById);

router.delete('/:pId', isAdminOrPremium, productController.deleteProductById);

export default router;
