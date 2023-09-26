import ProductDTO from '../dto/product.dto.js';
import ProductService from '../services/product.services.js';
import Responses from '../middleware/error.handlers.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;

  }

  createProduct = async (req, res) => {
    try {
      const productDTO = new ProductDTO(req.body);

      if (!productDTO.isValid()) {
        return this.httpResponse.BAD_REQUEST(res, `${this.enumError.INVALID_PARAMS}Todos los campos son requeridos y deben ser válidos para crear un producto.`);
      }

      let thumbnails = null;

      if (req.file) {
        thumbnails = `/upload/${req.file.filename}`;
      }

      const productData = {
        title: productDTO.title,
        description: productDTO.description,
        price: productDTO.price,
        stock: productDTO.stock,
        category: productDTO.category,
        thumbnails,
      };
      await this.productService.createProduct(productData);

      return res.redirect('/profile');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al crear el producto `, { error: error.message });
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      return this.httpResponse.OK(res, 'Tomando productos agregados por el administrador', { products });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al traer los productos `, { error: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pId } = req.params;

      const product = await this.productService.getProductById(pId);

      if (!product) {
        return this.httpResponse.BAD_REQUEST(res, `${this.enumError.INVALID_PARAMS} El producto solicitado no existe.`);
      }

      return this.httpResponse.OK(res, 'El producto fue encontrado ', { product });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al obtener el producto `, { error: error.message });
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
        return this.httpResponse.BAD_REQUEST(res, `${this.enumError.INVALID_PARAMS} No se encontró o no se pudo actualizar el producto solicitado.`);
      }

      return this.httpResponse.OK(res, 'El producto fue actualizado correctamente ', { updatedProduct });

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al actualizar el producto `, { error: error.message });

    }
  };

  deleteProductById = async (req, res) => {
    try {
      const { pId } = req.params;

      const deletedProduct = await this.productService.deleteProductById(pId);

      if (!deletedProduct) {
        return this.httpResponse.BAD_REQUEST(res, `${this.enumError.DB_ERROR} No se encontro o se pudo eliminar el producto solicitado.`);
      }

      return this.httpResponse.OK(res, 'El producto fue eliminado correctamente ');

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al eliminar el producto `, { error: error.message });
    }
  };
}

export default ProductController;
