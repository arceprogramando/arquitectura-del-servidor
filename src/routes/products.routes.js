import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import { isAdminOrPremium } from '../middleware/auth.products.js';
import { uploadProducts } from '../middleware/uploader.js';

const productController = new ProductController();

const router = Router();

router.get('/', productController.getAllProducts);

router.post('/', uploadProducts.single('productImage'), productController.createProduct);

router.get('/:pId', productController.getProductById);

router.put('/:pId', isAdminOrPremium, uploadProducts.single('productImage'), productController.updateProductById);

router.delete('/:pId', isAdminOrPremium, productController.deleteProductById);

export default router;
