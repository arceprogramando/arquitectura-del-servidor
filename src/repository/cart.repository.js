import CartModel from '../model/carts.models.js';

class CartRepository {
  constructor() {
    this.cartModel = CartModel;
  }

  createCart = async (newCart) => {
    try {
      const cart = await this.cartModel.create(newCart);
      return cart;
    } catch (error) {
      throw new Error(`Error al crear la cart en la base de datos: ${error.message}`);
    }
  };

  getCarts = async (limit) => {
    try {
      let carts = await this.cartModel.find({});
      if (limit) {
        carts = carts.slice(0, limit);
      }
      return carts;
    } catch (error) {
      throw new Error(`Error al obtener los carritos desde la base de datos: ${error.message}`);
    }
  };

  getCartById = async (cId) => {
    try {
      const cart = await this.cartModel.findOne({ id: cId });
      return cart;
    } catch (error) {
      throw new Error(`Error al obtener el carrito con id: ${cId} desde la base de datos: ${error.message}`);
    }
  };

  updateCartById = async (cId, updateData) => {
    try {
      const updatedCart = await this.cartModel.updateOne(
        { _id: cId },
        updateData,
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Error al actualizar el carrito ${error.message}`);
    }
  };

  deleteCart = async (cId) => {
    try {
      const deleteCartById = await this.cartModel.deleteOne({ _id: cId });
      return {
        id: cId,
        success: deleteCartById.deletedCount === 1,
      };
    } catch (error) {
      throw new Error(`Error al borrar  el carrito con el id ${cId} en la base de datos . Error: ${error.message}`);
    }
  };

  createProductInCart = async (cId, pId, quantity) => {
    try {
      const updatedCart = await this.cartModel.updateOne(
        { _id: cId },
        { $push: { products: { product: pId, quantity } } },
      );
      return updatedCart;
    } catch (error) {
      throw new Error(`Error al agregar el producto al carrito en el repository: ${error.message}`);
    }
  };
}

export default CartRepository;

// updateCartItemQuantity = async (cId, pId, quantity) => {
//   try {
//     const updatedCart = await this.cartModel.updateOne(
//       { _id: cId, 'products.product': pId },
//       { $set: { 'products.$.quantity': quantity } },
//     );
//     return updatedCart;
//   } catch (error) {
//     throw new Error(`Error al actualizar la cantidad del producto ${pId} en el carrito
//       con el id ${cId} en la base de datos. Error: ${error.message}`);
//   }
// };
