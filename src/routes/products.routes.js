import { Router } from 'express';
import uploadMiddleware from '../middleware/uploader.js';
import ProductController from '../controllers/product.controller.js';

const productController = new ProductController();

const router = Router();

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:pId', productController.getProductById);

router.put('/:pId', uploadMiddleware, productController.updateProductById);

router.delete('/:pId', productController.deleteProductById);

export default router;
