import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/session.controllers.js';

const router = Router();
const userController = new UserController();

// Register con Passport y refactor

router.post('/register', passport.authenticate('local-register', {
  failureRedirect: '/register',
}), async (req, res) => {
  try {
    await userController.createUser(req, res);
  } catch (error) {

    res.status(500).json({ status: 'error', message: 'Hubo un error al registrar el usuario en router . linea 19' });
  }
});

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }), userController.loginUser);

router.get('/logout', userController.logoutUser);

// Me encuentro haciendo este refactor

router.post('/recover-psw', userController.resetPassword);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
  try {
    const authenticatedUser = req.user;
    console.log('🚀 ~ file: session.routes.js:138 ~ router.get ~ authenticatedUser:', authenticatedUser);
    res.redirect('/product');

  } catch (error) {
    console.error('Error en la autenticación de GitHub:', error);
    res.status(500).json({ message: 'Error en la autenticación de GitHub' });
  }
});

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), async (req, res) => {
  try {

    console.log('***Usuario endpoint de github/callback para comunicarnos***');
    req.session.user = req.user;

    res.redirect('/profile');
  } catch (error) {
    console.log('🚀 ~ file: session.routes.js:195 ~ router.get ~ error:', error);
  }
});

export default router;
