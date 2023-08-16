import ProductsModel from '../dao/models/products.models.js';

class ProductService {
  constructor() {
    this.ProductsModel = ProductsModel;
  }

  createProduct = async (productData) => {
    try {
      const createdProduct = await ProductsModel.create(productData);
      return createdProduct;
    } catch (error) {
      throw new Error(`Error al crear el producto: ${error.message}`);
    }
  };

  updateProduct = async (productId, newData) => {
    try {
      const updatedProduct = await ProductsModel.findByIdAndUpdate(
        productId,
        newData,
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

  deleteProductById = async (productId) => {
    try {
      const product = await ProductsModel.findById(productId);

      if (!product) {
        return null;
      }

      await ProductsModel.findByIdAndDelete(productId);
      return product;
    } catch (error) {
      throw new Error(`Error al eliminar el producto: ${error}`);
    }
  };
}

export default ProductService;
