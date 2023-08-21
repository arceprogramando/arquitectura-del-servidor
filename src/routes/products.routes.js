import { Router } from 'express';
import ProductModel from '../model/products.models.js';
import uploadMiddleware from '../middleware/uploader.js';
import ProductController from '../controllers/product.controller.js';

const productController = new ProductController();

const router = Router();

router.post('/', uploadMiddleware, productController.createProduct);

router.get('/', productController.getAllProducts);

router.get('/:pId', productController.getProductById);

router.put('/:pId', uploadMiddleware, productController.updateProduct);

router.delete('/:pId', async (req, res) => {
  try {
    const { pId } = req.params;

    const product = await ProductModel.findById({ _id: pId });

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    await ProductModel.findByIdAndDelete({ _id: pId });

    return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    return res.status(500).json({ error: `Error al eliminar el producto: ${error}` });
  }
});

export default router;
