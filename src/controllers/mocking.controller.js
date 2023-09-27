import GenerateFakerService from '../services/mocking.services.js';
import Responses from '../middleware/error.handlers.js';

class GenerateFakerController {
  constructor() {
    this.generateFakerService = new GenerateFakerService();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
  }

  generateFakerProducts = async (req, res) => {
    try {
      const generateProduct = await this.generateFakerService.generateFakerProducts();
      return this.httpResponse.OK(res, 'Generando productos con faker', { generateProducts: generateProduct });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}No se han podido crear los productos con faker `, { dataerror: error });
    }
  };
}

export default GenerateFakerController;
