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
          error: 'Todos los campos son requeridos para crear un producto.',
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
      return res.status(500).json({ status: 'error', error: `Hubo un problema interno en el controlador al crear el productito. ${error}` });
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);

    } catch (error) {
      throw new Error(`Error al obtener los productos desde el controller ${error}`);
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pId } = req.params;

      const product = await this.productService.getProductById(pId);

      if (!product) {
        return res.status(404).json({ error: 'El producto solicitado no existe.' });
      }

      return res.status(200).json(product);

    } catch (error) {
      return res.status(500).json({ error: `Error al obtener el producto en el controller: ${error}` });
    }
  };

  updateProductById = async (req, res) => {
    try {
      const { pId } = req.params;
      const newData = req.body;
      if (req.file) {
        const newImagePath = `/upload/${req.file.filename}`;
        newData.thumbnails = newImagePath;
      }
      const updatedProduct = await this.productService.updateProductById(pId, newData);

      if (!updatedProduct) {
        return res.status(404).json({ error: 'No se encontró el producto para actualizar.' });
      }

      return res.status(200).json({ status: 'success', message: 'Producto actualizado correctamente.', updatedProduct });
    } catch (error) {
      return res.status(500).json({ error: `Error al actualizar el producto en el controller: ${error}` });
    }
  };

}

export default ProductController;

// deleteProduct = async (req, res) => {
//   try {
//     const { pId } = req.params;

//     const deletedProduct = await ProductService.deleteProductById(pId);

//     if (!deletedProduct) {
//       return res.status(404).json({ error: 'No se encontró el producto que se intenta eliminar.' });
//     }

//     return res.status(200).json({ status: 'success', message: 'Producto eliminado correctamente.' });
//   } catch (error) {
//     return res.status(500).json({ error: `Error al eliminar el producto: ${error.message}` });
//   }
// };
