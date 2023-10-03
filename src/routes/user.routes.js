import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controllers.js';

const router = Router();

const userController = new UserController();

router.post('/register', passport.authenticate('local-register', { failureRedirect: '/register', successRedirect: '/' }));

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/', successRedirect: '/profile' }));

router.get('/logout', userController.logoutUser);

router.post('/recover-psw', userController.resetPassword);

router.post('/recoverwithemail', userController.recoverWithEmail);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/products' }));

export default router;
