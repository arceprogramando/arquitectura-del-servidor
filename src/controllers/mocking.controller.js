import GenerateFakerService from '../services/mocking.services.js';

class GenerateFakerController {
  constructor() {
    this.generateFakerService = new GenerateFakerService();
  }

  generateFakerProducts = async (req, res) => {
    try {
      const generateProduct = await this.generateFakerService.generateFakerProducts();
      return res.status(200).json(generateProduct);
    } catch (error) {
      return res.status(500).json({ status: 'error', error: `Hubo un problema interno en el controlador al crear el producto. ${error}` });
    }
  };
}

export default GenerateFakerController;
