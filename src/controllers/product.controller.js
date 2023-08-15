import ProductService from '../services/product.services.js';

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
}

export default ProductController;
