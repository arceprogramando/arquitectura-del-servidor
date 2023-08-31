import ViewRepository from '../repository/views.repository.js';

class ViewService {
  constructor() {
    this.viewRepository = new ViewRepository();
  }

  getProducts = async (query, options) => {
    try {
      const findProduct = await this.viewRepository.getProducts(query, options);
      return findProduct;
    } catch (error) {
      throw new Error(`Error al tomar los productos desde el views Services: ${error.message}`);
    }
  };

  getMessages = async () => {
    try {
      const findMessage = await this.viewRepository.getMessages();
      return findMessage;
    } catch (error) {
      throw new Error(`Error al tomar los mensajes desde el views Services: ${error.message}`);
    }
  };

  populateProductInCart = async (cId) => {
    try {
      const populateProduct = await this.viewRepository.populateProductInCart(cId);
      return populateProduct;
    } catch (error) {
      throw new Error(`Error al utilizar populate en los  desde el views Services: ${error.message}`);
    }
  };
}

export default ViewService;
