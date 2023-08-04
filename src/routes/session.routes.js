import { Router } from 'express';
import passport from 'passport';
import UserModel from '../dao/models/user.models.js';
import encrypt from '../utils/encrypt.js';

const router = Router();

router.get('/', (req, res) => {
  const counter = req.session?.counter;

  if (!counter) {
    req.session.counter = 1;
    res.send(`Se ha visitado el sitio ${req.session.counter} vez`);
  } else {
    req.session.counter += 1;
    res.send('Bienvenido');
  }
});

// Register con Passport

router.post('/register', passport.authenticate('local-register', {
  failureRedirect: '/register',
}), async (req, res) => {
  try {
    const {
      firstname, lastname, email, age, password,
    } = req.body;

    const hashedPassword = await encrypt.createHash(password);

    await UserModel.create({
      firstname,
      lastname,
      email,
      age,
      password: hashedPassword,
    });

    res.redirect('/');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ status: 'error', message: 'Hubo un error al registrar el usuario' });
  }
});

router.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }), async (req, res) => {
  if (!req.user) {
    return res.status(400).send({ status: 'error', error: 'Invalid credentials' });
  }

  req.session.user = {
    firstname: req.user.firstname,
    lastname: req.user.lastname,
    age: req.user.age,
    email: req.user.email,
    role: req.user.role,
  };
  return res.redirect('/products');
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      return res.redirect('/');
    }
    return res.status(500).json({ status: 'Error al cerrar la sesion,', body: error });
  });
});

router.post('/recover-psw', async (req, res) => {
  try {
    const { newpassword, email } = req.body;

    const newPasswordHashed = await encrypt.createHash(newpassword);
    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ message: 'Credenciales inválidas o erróneas' });
    }

    const updateUser = await UserModel.findByIdAndUpdate(findUser._id, {
      password: newPasswordHashed,
    });

    if (!updateUser) {
      return res.json({ message: 'Problemas actualizando la contraseña' });
    }

    return res.redirect('/');

  } catch (error) {
    return res.status(500).json({ status: 'Error al actualizar la contraseña', error });
  }
});

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
