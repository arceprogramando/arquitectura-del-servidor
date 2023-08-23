import ProductRepository from '../repository/product.repository.js';

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  createProduct = async (productData) => {
    try {
      const createdProduct = await this.productRepository.createProduct(productData);
      return createdProduct;
    } catch (error) {
      throw new Error(`Error al crear el producto en el service: ${error.message}`);
    }
  };

  getAllProducts = async () => {
    try {
      const findProducts = await this.productRepository.getAllProducts();
      return findProducts;
    } catch (error) {
      throw new Error(`Error al buscar todos los productos en el service: ${error.message}`);

    }
  };

  getProductById = async (pId) => {
    try {
      const productById = await this.productRepository.getProductById(pId);
      return productById;
    } catch (error) {
      throw new Error(`Error al traer el producto con el id: ${pId} desde el service. error: ${error.message}`);

    }
  };

  updateProductById = async (pId, newData) => {
    try {
      const updatedProduct = await this.productRepository.updateProductById(pId, newData, { new: true });
      return updatedProduct;
    } catch (error) {
      throw new Error(`Error al actualizar el producto: ${error.message}`);
    }
  };

}

export default ProductService;

// deleteProductById = async (productId) => {
//   try {
//     const product = await ProductsModel.findById(productId);

//     if (!product) {
//       return null;
//     }

//     await ProductsModel.findByIdAndDelete(productId);
//     return product;
//   } catch (error) {
//     throw new Error(`Error al eliminar el producto: ${error}`);
//   }
// };
