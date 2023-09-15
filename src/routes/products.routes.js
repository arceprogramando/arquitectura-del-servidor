import { Router } from 'express';
import uploadMiddleware from '../middleware/uploader.js';
import ProductController from '../controllers/product.controller.js';
import { isAdmin, isAuthenticated } from '../middleware/auth.products.js';

const productController = new ProductController();

const router = Router();

router.post('/', isAdmin, uploadMiddleware, productController.createProduct);

router.get('/', isAuthenticated, productController.getAllProducts);

router.get('/:pId', isAuthenticated, productController.getProductById);

router.put('/:pId', isAdmin, uploadMiddleware, productController.updateProductById);

router.delete('/:pId', isAdmin, productController.deleteProductById);

export default router;
