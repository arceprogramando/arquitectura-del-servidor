import ProductsModel from '../model/products.models.js';
import MessageModel from '../model/message.models.js';
import CartModel from '../model/carts.models.js';

class ViewRepository {
  constructor() {
    this.productsModel = ProductsModel;
    this.messageModel = MessageModel;
    this.cartModel = CartModel;
  }

  getProducts = async (query, options) => {
    try {
      return await this.productsModel.paginate(query, options);
    } catch (error) {
      throw new Error(`Error al usar el metodo paginate en el modelo de productos de la base de datos: ${error.message}`);

    }
  };

  getMessages = async () => {
    try {
      const findMessage = await this.messageModel.find({});
      return findMessage;
    } catch (error) {
      throw new Error(`Error al usar al buscar los mensajes para visualizar segun el modelo  de mensjaes en la base de datos: ${error.message}`);
    }
  };

  populateProductInCart = async (cId) => {
    try {
      const populateProduct = await CartModel.findById({ _id: cId }).populate('products.product');
      return populateProduct;
    } catch (error) {
      throw new Error(`Error al usar al buscar los mensajes para visualizar segun el modelo  de mensjaes en la base de datos: ${error.message}`);

    }
  };

}

export default ViewRepository;
