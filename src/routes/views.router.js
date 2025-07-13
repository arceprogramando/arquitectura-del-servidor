import { Router } from 'express';
import ViewController from '../controllers/views.controller.js';
import upload from '../middleware/multeruploader.js';

const viewController = new ViewController();
const router = Router();

router.get('/', viewController.showHomePage);

router.get('/login', viewController.showLoginPage);

router.get('/products', viewController.getProducts);

router.get('/chat', viewController.getMessages);

router.get('/carts/:cId', viewController.populateProductInCart);

router.get('/register', viewController.viewRegister);

router.get('/recover', viewController.viewRecover);

router.get('/emailwithrecover', viewController.viewEmailToRecover);

router.get('/checkyouremail', viewController.viewCheckYourEmail);

router.get('/profile', viewController.viewProfile);

router.get('/cartsuser', viewController.viewCartUser);

router.get('/completeProfile', upload.single('image'), viewController.viewUpdateCompleteProfile);

router.get('/usermanagement', viewController.viewUserManagement);

router.get('/product/:id', viewController.showProductDetail);

router.get('/logout', (req, res) => {
  // Redirigir a la ruta real de logout en la API
  res.redirect('/api/session/logout');
});

export default router;
