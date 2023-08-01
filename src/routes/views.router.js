import { Router } from 'express';
import productsModel from '../dao/models/products.models.js';
import isLogged from '../middleware/auth.products.js';
import messageModel from '../dao/models/message.models.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    return res.render('login', {
      style: 'index.css',
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error al visualizar el login' });
  }
});

router.get('/products', isLogged, async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'desc';

    const query = {};

    if (req.query.query) {
      query.title = { $regex: req.query.query, $options: 'i' };
    }

    const options = { page, limit, lean: true };

    if (sort === 'asc') {
      options.sort = { price: 1 };
    } else if (sort === 'desc') {
      options.sort = { price: -1 };
    }

    const {
      docs, hasPrevPage, hasNextPage, prevPage, nextPage,
    } = await productsModel.paginate(query, options);

    let visit;

    if (req.session.counter) {
      req.session.counter += 1;
      visit = `Se ha visitado el sitio ${req.session.counter} veces`;
    } else {
      req.session.counter = 1;
      visit = 'Se ha visitado el sitio 1 vez';
    }

    res.render('products', {
      visit,
      products: docs,
      style: 'index.css',
      page,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      user: req.session.user,
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/chat', async (req, res) => {
  try {
    const findmessage = await messageModel.find({});
    const messages = findmessage.map((message) => message.toObject());

    res.render('chat', {
      messages,
      style: 'index.css',
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

export default router;
