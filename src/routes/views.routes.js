import { Router } from 'express';
// import productsModel from '../dao/models/products.models';

const router = Router();

router.get('/', async (req, res) => {
  try {
    return res.render('login', {
      style: 'index.css',
    });
  } catch (error) {
    return console.log('🚀 ~ file: views.routes.js:13 ~ router.get ~ error:', error);
  }
});

export default router;
