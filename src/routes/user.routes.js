import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controllers.js';

const router = Router();

const userController = new UserController();

router.post('/register', passport.authenticate('local-register', { failureRedirect: '/register', successRedirect: '/' }));

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/', successRedirect: '/products' }));

router.get('/logout', userController.logoutUser);

router.post('/recover-psw', userController.resetPassword);

export default router;

// router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), userController.authenticateGitHub);

// router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), userController.handleGitHubCallback);
