import ProductService from '../services/product.services.js';
import ProductsModel from '../model/products.models.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req, res) => {
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

      const productData = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      await this.productService.createProduct(productData);
      return res.redirect('/products');
    } catch (error) {
      return res.status(500).json({ status: 'error', error: 'Problema interno con el servidor' });
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await ProductsModel.find({});
      res.status(200).json(products);
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pId } = req.params;

      const product = await ProductsModel.findById(pId);

      if (!product) {
        return res.status(404).json({ error: 'El producto no existe' });
      }

      return res.status(200).json(product);

    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el producto ${error}` });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pId } = req.params;
      const newData = req.body;

      if (req.file) {
        const newImagePath = `/upload/${req.file.filename}`;
        newData.thumbnails = newImagePath;
      }

      const updatedProduct = await this.productService.updateProduct(pId, newData);

      if (!updatedProduct) {
        return res.status(404).json({ error: 'El producto no existe' });
      }

      return res.status(200).json({ status: 'success', updatedProduct });

    } catch (error) {
      return res.status(500).json({ error: `Error al actualizar el producto: ${error}` });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pId } = req.params;

      const deletedProduct = await ProductService.deleteProductById(pId);

      if (!deletedProduct) {
        return res.status(404).json({ error: 'El producto no existe' });
      }

      return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente' });
    } catch (error) {
      return res.status(500).json({ error: `Error al eliminar el producto: ${error.message}` });
    }
  };
}

export default ProductController;
