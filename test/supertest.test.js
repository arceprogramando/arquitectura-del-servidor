/* eslint-disable no-undef */
import supertest from 'supertest';
import { expect } from 'chai';
import configObject from '../src/config/config.js';

const env = configObject;
const BASE_API_URL = `${env.BASE_URL}${env.PORT}/`;
const PRODUCTS_ROUTE = 'api/products';

describe('Functional Test for Products Endpoints', () => {
  let requester;

  const imageUrls = [
    '/upload/AppleMacBookPro.webp',
    '/upload/celular.webp',
    '/upload/chocolate.webp',
    '/upload/milka.webp',
    '/upload/royalcanning.webp',
  ];

  const getRandomImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  before(() => {
    requester = supertest(BASE_API_URL);
  });

  it('should create a new product via POST request', async () => {
    const bodyProduct = {
      title: 'Titulo test',
      description: 'Descripción test',
      price: (Math.random() * (200000 - 10) + 10).toFixed(3),
      stock: Math.floor(Math.random() * (10000 - 10) + 10),
      category: 'Categoria de prueba',
      thumbnails: getRandomImageUrl(),
    };

    const response = await requester.post(PRODUCTS_ROUTE).send(bodyProduct);

    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('should get all product via GET request', async () => {
    const response = await requester.get(PRODUCTS_ROUTE);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal(200);
    expect(response.body.data).to.be.an('object');
    expect(response.body.data.products).to.be.an('array');
  });

  it('should delete /api/products/:pid delete a product sucessfully with code 200', async () => {
    const bodyProduct = {
      title: 'Titulo test',
      description: 'Descripción test',
      price: (Math.random() * (200000 - 10) + 10).toFixed(3),
      stock: Math.floor(Math.random() * (10000 - 10) + 10),
      category: 'Categoria de prueba',
      thumbnails: getRandomImageUrl(),
    };

    const response = await requester.post(PRODUCTS_ROUTE).send(bodyProduct);

    expect(response.statusCode).to.eq(200);
    expect(response._body.data.createdProduct).to.have.property('_id');
  });
});
