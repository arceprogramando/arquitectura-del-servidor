import { Router } from 'express';
import productModel from '../dao/models/products.models.js';
import uploadMiddleware from '../services/uploader.js';

const router = Router();

router.post('/', uploadMiddleware, async (req, res) => {
  try {
    const {
      title, description, code, price, status, stock, category,
    } = req.body;

    let thumbnails = null;

    if (req.file) {
      thumbnails = `/upload/${req.file.filename}`;
    }

    if (!(title && description && code && price && status && stock && category && thumbnails)) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }

    const product = {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    };

    const createdProduct = await productModel.create(product);

    return res.send({ status: 'success', payload: createdProduct });

  } catch (error) {

    return res.status(500).send({ status: 'error', error: 'Internal server error' });
  }
});

export default router;
