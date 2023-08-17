import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/session.controllers.js';

const router = Router();
const userController = new UserController();

// Register con Passport y refactor

router.post('/register', passport.authenticate('local-register', { failureRedirect: '/register' }), userController.createUser);

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }), userController.loginUser);

router.get('/logout', userController.logoutUser);

router.post('/recover-psw', userController.resetPassword);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), userController.authenticateGitHub);

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), userController.handleGitHubCallback);

export default router;
