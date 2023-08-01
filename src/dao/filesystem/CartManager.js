import { promises as fs } from 'fs';

class cartManager {
  constructor(filepath) {
    this.filepath = filepath;
  }

  // Lectura Carts

  async getCarts() {
    try {
      const data = await fs.readFile(this.filepath, 'utf-8');
      const carts = JSON.parse(data);
      return carts;
    } catch (error) {
      throw new Error('Error al obtener los carts');
    }
  }

  async getCartsById(cid) {
    try {
      const data = await fs.readFile(this.filepath, 'utf-8');
      const carts = JSON.parse(data);
      const cart = carts.find((c) => c.id === parseInt(cid, 10));
      return cart;
    } catch (error) {
      throw new Error('Error al obtener la Cart');
    }
  }

  // Escritura Carts

  async generateCartId() {
    try {
      const carts = await this.getCarts();
      const NextCartId = carts.length > 0 ? carts.length + 1 : 1;
      return NextCartId;
    } catch (error) {
      throw new Error('Error al generar el ID de la Cart');
    }
  }

  async writeCart(cart) {
    try {
      const NextCartId = await this.generateCartId();
      const carts = await this.getCarts();

      const updatedCart = {
        id: NextCartId,
        ...cart,
      };

      const updatedCarts = [...carts, updatedCart];

      await fs.writeFile(
        this.filePath,
        JSON.stringify(updatedCarts, null, '\t'),
      );
      return updatedCart;
    } catch (error) {
      throw new Error('Error al escribir el carrito');
    }
  }

  async updateCart(cartId, productId, quantity) {
    try {
      const carts = await this.getCarts();
      const cart = carts.find((c) => c.id === parseInt(cartId, 10));

      if (!cart) {
        throw new Error('Carrito no encontrado');
      }

      const existingProduct = cart.products.find(
        (p) => p.product === productId,
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.product.push({ product: productId, quantity });
      }

      await fs.writeFile(this.filepath, JSON.stringify(carts, null, '\t'));

      return cart;
    } catch (error) {
      throw new Error('Error al actualizar el carrito');
    }
  }
  // Eliminar

  async deleteCart(cid) {
    try {
      const carts = await this.getCarts();
      const index = carts.findIndex((c) => c.id === parseInt(cid, 10));

      if (index === -1) {
        throw new Error('El id de la Cart no  existe');
      }

      carts.splice(index, 1);

      await fs.writeFile(this.filepath, JSON.stringify(carts, null, '\t'));
    } catch (error) {
      throw new Error('Error al eliminar la cart');
    }
  }
}

export default cartManager;
