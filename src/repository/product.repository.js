import ProductModel from '../model/products.models.js';
import EmailServices from '../services/email.services.js';

class ProductRepository {
  constructor() {
    this.productModel = ProductModel;
    this.emailService = new EmailServices();

  }

  createProduct = async (productData) => {
    try {
      const product = await this.productModel.create(productData);
      return product;
    } catch (error) {
      throw new Error(`Error al crear el producto en la base de datos: ${error.message}`);
    }
  };

  getAllProducts = async () => {
    try {
      const findProducts = await this.productModel.find({});
      return findProducts;
    } catch (error) {
      throw new Error(`Error al obtener todos los productos de la base de datos: ${error.message}`);
    }
  };

  getProductById = async (pId) => {
    try {
      const productById = await this.productModel.findById(pId);
      return productById;
    } catch (error) {
      throw new Error(`Error al obtener el producto con id: ${pId} en la base de datos: ${error.message}`);
    }
  };

  updateProductById = async (pId, newData) => {
    try {
      const updatedProduct = await this.productModel.updateOne({ _id: pId }, newData);
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto con id: ${pId} en la base de datos: ${error.message}`);
    }
  };

  deleteProductById = async (pId) => {
    try {
      const deleteProductById = await this.productModel.deleteOne({ _id: pId });
      return deleteProductById;
    } catch (error) {
      throw new Error(`Error al eliminar el producto con id: ${pId} en la base de datos: ${error.message}`);
    }
  };

  sendEmailDeleteProduct = async (emailProduct) => {
    try {
      const sendEmailDeleteProduct = await this.emailService.sendDeleteProduct(emailProduct);
      return sendEmailDeleteProduct;
    } catch (error) {
      throw new Error(`Error al enviar el email de borrado de producto ${emailProduct}  ${error.message}`);

    }
  };
}

export default ProductRepository;
