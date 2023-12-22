import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { isAdminOrPremium } from '../middleware/auth.products.js';
import upload from '../middleware/multeruploader.js';

const productController = new ProductController();

const router = Router();

router.get('/', productController.getAllProducts);

router.post('/', upload.single('image'), productController.createProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', isAdminOrPremium, upload.single('image'), productController.updateProductById);

router.delete('/:pId', isAdminOrPremium, productController.deleteProductById);

export default router;
