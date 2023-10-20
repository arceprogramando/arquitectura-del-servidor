import { Router } from 'express';
import uploadMiddleware from '../middleware/uploader.js';
import ProductController from '../controllers/product.controller.js';
import { isAdminOrPremium } from '../middleware/auth.products.js';

const productController = new ProductController();

const router = Router();

router.get('/', productController.getAllProducts);

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', isAdminOrPremium, uploadMiddleware, productController.updateProductById);

router.delete('/:pId', isAdminOrPremium, productController.deleteProductById);

export default router;
