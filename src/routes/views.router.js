import { Router } from 'express';
import ViewController from '../controllers/views.controller.js';
import { uploadDocuments } from '../middleware/uploader.js';

const viewController = new ViewController();
const router = Router();

router.get('/', viewController.showLoginPage);

router.get('/products', viewController.getProducts);

router.get('/chat', viewController.getMessages);

router.get('/carts/:cId', viewController.populateProductInCart);

router.get('/register', viewController.viewRegister);

router.get('/recover', viewController.viewRecover);

router.get('/emailwithrecover', viewController.viewEmailToRecover);

router.get('/checkyouremail', viewController.viewCheckYourEmail);

router.get('/profile', viewController.viewProfile);

router.get('/cartsuser', viewController.viewCartUser);

router.get('/completeProfile', uploadDocuments.single('document'), viewController.viewUpdateCompleteProfile);

export default router;
