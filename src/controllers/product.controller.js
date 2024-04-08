import ProductDTO from '../dto/product.dto.js';
import ProductService from '../services/product.services.js';
import Responses from '../middleware/error.handlers.js';
import UserModel from '../model/user.models.js';
import cloudinary from '../config/cloudinary.config.js';

class ProductController {
  constructor() {
    this.productService = new ProductService();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
    this.userModel = UserModel;
  }

  createProduct = async (req, res) => {
    try {
      const productDTO = new ProductDTO(req.body);

      if (!productDTO.isValid()) {
        return this.httpResponse.BAD_REQUEST(
          res,
          `${this.enumError.INVALID_PARAMS} Todos los campos son requeridos y deben ser válidos para crear un producto.`,
        );
      }

      let thumbnails = null;

      if (req.file) {
        try {
          const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'products',
          });

          thumbnails = result.secure_url;
        } catch (cloudinaryError) {
          return this.httpResponse.ERROR(
            res,
            'Error al subir la imagen a Cloudinary',
            {
              error: cloudinaryError.message,
            },
          );
        }
      }

      const productData = {
        title: productDTO.title,
        description: productDTO.description,
        price: productDTO.price,
        stock: productDTO.stock,
        category: productDTO.category,
        email: req.user.email,
        thumbnails,
      };

      if (req.user && req.user.role === 'PREMIUM') {
        productData.owner = req.user.email;
      } else {
        productData.owner = 'ADMIN';
      }

      const createdProduct = await this.productService.createProduct(
        productData,
      );

      return this.httpResponse.OK(
        res,
        'Agregando productos a la base de datos',
        { createdProduct },
      );
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}Error al crear el producto `,
        {
          error: error.message,
        },
      );
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const products = await this.productService.getAllProducts();
      const simplifiedProducts = products.map((product) => ({
        id: product._id,
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        thumbnails: product.thumbnails,
      }));
      return res.json(simplifiedProducts);
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}Error al traer los productos `,
        {
          error: error.message,
        },
      );
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pId } = req.params;

      const product = await this.productService.getProductById(pId);

      if (!product) {
        return this.httpResponse.BAD_REQUEST(
          res,
          `${this.enumError.INVALID_PARAMS} El producto solicitado no existe.`,
        );
      }

      return this.httpResponse.OK(res, 'El producto fue encontrado ', {
        product,
      });
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} Error al obtener el producto `,
        {
          error: error.message,
        },
      );
    }
  };

  updateProductById = async (req, res) => {
    try {
      const { pId } = req.params;
      const newData = req.body;
      if (req.file) {
        const newImagePath = `/upload/products/${req.file.filename}`;
        newData.thumbnails = newImagePath;
      }
      const updatedProduct = await this.productService.updateProductById(
        pId,
        newData,
      );

      if (!updatedProduct) {
        return this.httpResponse.BAD_REQUEST(
          res,
          `${this.enumError.INVALID_PARAMS} No se encontró o no se pudo actualizar el producto solicitado.`,
        );
      }

      return this.httpResponse.OK(
        res,
        'El producto fue actualizado correctamente ',
        { updatedProduct },
      );
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} Error al actualizar el producto `,
        {
          error: error.message,
        },
      );
    }
  };

  deleteProductById = async (req, res) => {
    try {
      const { pId } = req.params;
      const findUserProduct = await this.productService.getProductById(pId);
      const emailProduct = findUserProduct.email;
      await this.productService.sendEmailDeleteProduct(emailProduct);
      const deletedProduct = await this.productService.deleteProductById(pId);

      if (!deletedProduct) {
        return this.httpResponse.BAD_REQUEST(
          res,
          `${this.enumError.DB_ERROR} No se encontro o se pudo eliminar el producto solicitado.`,
        );
      }

      return this.httpResponse.OK(
        res,
        'El producto fue eliminado correctamente ',
      );
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}error al eliminar el producto `,
        {
          error: error.message,
        },
      );
    }
  };
}

export default ProductController;
