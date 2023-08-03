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

router.post('/register', async (req, res) => {
  try {
    const {
      firstname, lastname, email, age, password,
    } = req.body;

    if (!firstname || !lastname || !email || !age || !password) {
      return res.status(400).json({ state: 'fallido', message: 'Por favor, completa todos los campos.' });
    }

    const existingUser = await UserModel.findOne(
      { email },
      {
        email: 1,
        firstname: 1,
        lastname: 1,
        password: 1,
      },
    );

    if (existingUser) {
      return res.status(409).json({ state: 'fallido', message: 'El correo electrónico ya está registrado.' });
    }

    if (age <= 0) {
      return res.status(400).json({ state: 'fallido', message: 'La edad debe ser un número positivo.' });
    }

    const newUser = await UserModel.create({
      firstname,
      lastname,
      email,
      age,
      password: await encrypt.createHash(password),
    });

    req.session.user = { ...newUser };
    return res.redirect('/');
  } catch (error) {
    console.log('🚀 ~ file: session.routes.js:58 ~ router.post ~ error:', error);
    return res.status(500).json({ state: 'fallido', message: 'Hubo un error al registrar el usuario', error });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ status: 'fallido', error: 'valores incompletos' });
    }

    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      console.log('Usuario no encontrado');
      return res.status(401).json({ message: 'Usuario no registrado o existente' });
    }

    const isValid = await encrypt.isValidPassword(findUser, password);
    if (!isValid) {
      console.log('Contraseña incorrecta');
      return res.status(403).send({ status: 'error', error: 'Contraseña incorrecta' });
    }

    const cleanUser = {
      email: findUser.email,
      firstname: findUser.firstname,
      lastname: findUser.lastname,
      role: findUser.role, // Agregar el campo role
    };

    req.session.user = cleanUser;

    return res.redirect('/products');
  } catch (error) {
    console.log('Error en el proceso de inicio de sesión:', error);
    return res.status(401).json({ message: 'Error al logear' });
  }
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
