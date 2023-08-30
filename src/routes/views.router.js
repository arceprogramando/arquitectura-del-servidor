import { Router } from 'express';
import ViewController from '../controllers/views.controller.js';

const viewController = new ViewController();
const router = Router();

router.get('/', viewController.showLoginPage);

router.get('/products', viewController.getProducts);

router.get('/chat', viewController.getMessages);

router.get('/carts/:cId', viewController.populateProductInCart);

export default router;

// router.get('/carts/:cId', async (req, res) => {
//   try {
//     const cart = await CartModel.findById({ _id: req.params.cId }).populate('products.product');
//     if (!cart) {
//       return res.status(404).json({ error: 'Carrito no encontrado' });
//     }

//     return res.render('carts', {
//       cart: cart.toObject(),
//       style: '../../css/index.css',
//     });

//   } catch (error) {
//     return res.status(500).json({ error: `Error al obtener el carrito ${error}` });
//   }
// });

// router.get('/register', async (req, res) => {
//   res.render('register');
// });

// router.get('/recover', async (req, res) => {
//   res.render('recover');
// });

// router.get('/profile', async (req, res) => {
//   const { user } = req.session;
//   res.render('profile', {
//     followers: user.followers,
//     lastname: user.firstname || user.login,
//     age: user.age,
//     email: user.email,
//   });
// });
