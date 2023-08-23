import ProductRepository from '../repository/product.repository.js';

class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(productData) {
    try {

      const createdProduct = await this.productRepository.createProduct(productData);
      return createdProduct;
    } catch (error) {
      throw new Error(`Error al crear el producto en el service: ${error.message}`);
    }
  }
}

export default ProductService;

// updateProduct = async (productId, newData) => {
//   try {
//     const updatedProduct = await ProductsModel.findByIdAndUpdate(
//       productId,
//       newData,
//       { new: true },
//     );
//     return updatedProduct;
//   } catch (error) {
//     throw new Error(`Error al actualizar el producto: ${error.message}`);
//   }
// };

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
