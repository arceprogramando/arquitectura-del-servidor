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

}

export default ProductService;
