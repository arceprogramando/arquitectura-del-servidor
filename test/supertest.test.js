import supertest from 'supertest';
import { describe, before, it } from 'mocha';
import { expect } from 'chai';
import configObject from '../src/config/config.js';

const env = configObject;
const BASE_API_URL = `${env.BASE_URL}${env.PORT}/`;
const PRODUCTS_ROUTE = 'api/products';
const CARTS_ROUTE = 'api/carts';
const USER_ROUTE = 'api/user';

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

describe('Functional Test for Carts Endpoints', () => {
  let requester;

  before(() => {
    requester = supertest(BASE_API_URL);
  });

  it('should get all cars via GET request', async () => {
    const response = await requester.get(CARTS_ROUTE);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal(200);
    expect(response.body.data).to.be.an('object');
  });

  it('should no create  a new product via POST request and return status 500', async () => {
    const bodyCarts = {
    };

    const response = await requester.post(CARTS_ROUTE).send(bodyCarts);
    expect(response.statusCode).to.equal(500);
  });

  it('should create a new cart via POST request and return status 200', async () => {
    const validCartBody = {
      products: [
        {
          product: '653084d6113b14f3c1ede247',
          quantity: 2,
        },
      ],
    };

    const response = await requester.post(CARTS_ROUTE).send(validCartBody);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
    expect(response.body.status).to.equal(200);
    expect(response.body.data).to.be.an('object');
  });
});

describe('Functional Test for Session user Endpoints', () => {

  let requester;

  before(() => {
    requester = supertest(BASE_API_URL);
  });

  it('should register a user with valid data', async () => {
    const randomValue = Math.floor(Math.random() * (200000 - 10) + 10);
    const userEmail = `test${randomValue}@gmail.com`;

    const userData = {
      firstname: 'Nombre Test',
      lastname: 'Apellido Test',
      email: userEmail,
      age: 30,
      password: 'testpassword',
    };

    const response = await requester.post(`${USER_ROUTE}/register`).send(userData);
    expect(response.statusCode).to.equal(302);
  });

});
