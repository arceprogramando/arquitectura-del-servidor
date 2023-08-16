import ProductService from '../services/product.services.js';
import ProductsModel from '../dao/models/products.models.js';

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

  // getProductById = async (req, res) => {
  //   try {
  //     const product = await this.productService.getProductById(req.params.pId);

  //     if (product) {
  //       return res.redirect(`/product/${product._id}`);
  //     }
  //     return res.redirect('/');

  //   } catch (error) {
  //     return res.status(500).json({ error: 'Error al obtener el producto con el id solicitado' });
  //   }
  // };

}

export default ProductController;
