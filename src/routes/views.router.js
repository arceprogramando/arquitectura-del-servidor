import { Router } from 'express';
import productsModel from '../model/products.models.js';
import { isAdmin, isUser } from '../middleware/auth.products.js';
import MessageModel from '../model/message.models.js';
import CartModel from '../model/carts.models.js';

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

router.get('/products', isUser, async (req, res) => {
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

    if (req.user.counter) {
      req.user.counter += 1;
      visit = `Se ha visitado el sitio ${req.user.counter} veces`;
    } else {
      req.user.counter = 1;
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
      user: req.user,
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

router.get('/chat', async (req, res) => {
  try {
    const findmessage = await MessageModel.find({});
    const messages = findmessage.map((message) => message.toObject());

    res.render('chat', {
      messages,
      style: 'index.css',
    });

  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
});

router.get('/carts/:id', async (req, res) => {
  try {
    const cart = await CartModel.findById({ _id: req.params.id }).populate('products.product');
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    return res.render('carts', {
      cart: cart.toObject(),
      style: '../../css/index.css',
    });

  } catch (error) {
    return res.status(500).json({ error: `Error al obtener el carrito ${error}` });
  }
});

router.get('/register', async (req, res) => {
  res.render('register');
});

router.get('/recover', async (req, res) => {
  res.render('recover');
});

router.get('/profile', async (req, res) => {
  const { user } = req.user;
  res.render('profile', {
    followers: user.followers,
    lastname: user.firstname || user.login,
    age: user.age,
    email: user.email,
  });
});

export default router;
