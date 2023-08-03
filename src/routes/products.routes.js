import { Router } from 'express';
import ProductModel from '../dao/models/products.models.js';
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

    const createdProduct = await ProductModel.create(product);

    return res.send({ status: 'success', payload: createdProduct });

  } catch (error) {

    return res.status(500).send({ status: 'error', error: 'Problema interno con el servidor' });
  }
});

router.get('/:pId', async (req, res) => {
  try {
    const product = await ProductModel.findById({ _id: req.params.pId });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ error: 'El producto no existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  }
});

router.put('/:pId', uploadMiddleware, async (req, res) => {
  try {
    const { pId } = req.params;
    const {
      title, description, code, price, status, stock, category,
    } = req.body;

    let thumbnails = null;
    if (req.file) {
      thumbnails = `/upload/${req.file.filename}`;
    }

    if (
      !title
      || !description
      || !code
      || !price
      || !status
      || !stock
      || !category
      || !thumbnails
    ) {
      return res.status(400).json({
        error: 'Todos los campos son requeridos',
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      pId,
      {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      },
      { new: true },
    );

    if (updatedProduct) {
      return res.status(200).json({ status: 'success', product: updatedProduct });
    }
    return res.status(404).json({ error: 'El producto no existe' });
  } catch (error) {
    return res.status(500).json({ error: `Error al actualizar el producto ${error}` });
  }
});

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
