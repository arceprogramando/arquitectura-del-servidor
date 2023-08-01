import { promises as fs } from 'fs';

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  // Lectura Product
  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);

      return products;
    } catch (error) {
      throw new Error('Error al obtener los productos');
    }
  }

  async getProductsById(pid) {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      const products = JSON.parse(data);
      const product = products.find((p) => p.id === parseInt(pid, 10));
      return product;
    } catch (error) {
      throw new Error('Error al obtener el producto');
    }
  }

  // Escritura Product

  async generateProductId() {
    try {
      const products = await this.getProducts();
      const nextProductId = products.length > 0 ? products.length + 1 : 1;
      return nextProductId;
    } catch (error) {
      throw new Error('Error al generar el id del producto');
    }
  }

  async writeProduct(product) {
    try {
      const nextProductId = await this.generateProductId();
      const products = await this.getProducts();
      const updatedProduct = { id: nextProductId, ...product };
      const updatedProducts = [...products, updatedProduct];

      await fs.writeFile(
        this.filePath,
        JSON.stringify(updatedProducts, null, '\t'),
      );

      return updatedProducts;
    } catch (error) {
      throw new Error('Error al escribir el producto');
    }
  }

  async updateProduct(pid, updateFields) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === parseInt(pid, 10));

      if (index === -1) {
        throw new Error('El producto no existe');
      }

      const updatedProduct = {
        ...products[index],
        ...updateFields,
      };

      products[index] = updatedProduct;

      await fs.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
      return updatedProduct;
    } catch (error) {
      throw new Error('Error al actualizar el producto');
    }
  }

  async deleteProduct(pid) {
    try {
      const products = await this.getProducts();
      const index = products.findIndex((p) => p.id === parseInt(pid, 10));

      if (index === -1) {
        throw new Error('El producto no existe');
      }

      products.splice(index, 1);
      await fs.writeFile(this.filePath, JSON.stringify(products, null, '\t'));
    } catch (error) {
      throw new Error('Error al eliminar el producto', error);
    }
  }
}

export default ProductManager;
