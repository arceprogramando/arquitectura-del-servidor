import { faker } from '@faker-js/faker';
import ProductsModel from '../model/products.models.js';

class GenerateFakerService {
  constructor() {
    this.productsModel = ProductsModel;
  }

  generateFakerProducts = async (count = 10) => {
    try {
      const imageUrls = [
        '/upload/bermuda_short.webp',
        '/upload/auricular.webp',
        '/upload/chocolate.webp',
      ];

      const getRandomImageUrl = () => {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        return imageUrls[randomIndex];
      };
      const fakeProducts = [];

      for (let i = 0; i < count; i += 1) {
        const fakerProduct = {
          title: faker.commerce.product(),
          description: faker.commerce.productDescription(),
          price: faker.number.float({ min: 10, max: 200000, precision: 0.001 }),
          stock: faker.number.int({ min: 10, max: 10000 }),
          category: faker.commerce.department(),
          thumbnails: getRandomImageUrl(),
        };

        this.productsModel.create(fakerProduct);
      }

      return fakeProducts;
    } catch (error) {
      throw new Error(`Hubo un problema al generar productos ficticios: ${error}`);
    }
  };
}

export default GenerateFakerService;
