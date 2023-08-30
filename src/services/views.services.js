import ViewRepository from '../repository/views.repository.js';

class ViewService {
  constructor() {
    this.viewRepository = new ViewRepository();
  }

  getProducts = async (limit, page, sort, query) => {
    try {
      const options = { page, limit, lean: true };

      if (sort === 'asc') {
        options.sort = { price: 1 };
      } else if (sort === 'desc') {
        options.sort = { price: -1 };
      }

      return await this.viewRepository.getProducts(query, options);
    } catch (error) {

      throw new Error(`Error al tomar los productos en views Services: ${error.message}`);

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
