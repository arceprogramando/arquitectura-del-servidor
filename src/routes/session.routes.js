import { Router } from 'express';
import userModel from '../dao/models/user.models.js';
import encrypt from '../utils/encrypt.js';

const router = Router();

router.get('/', (req, res) => {
  if (req.session.counter) {
    req.session.counter += 1;
    res.send(`Se ha visitado el sitio ${req.session.counter} veces`);
  } else {
    req.session.counter = 1;
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

    const existingUser = await userModel.findOne(
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

    const newUser = await userModel.create({
      firstname,
      lastname,
      email,
      age,
      password: encrypt.createHash(password),
    });

    req.session.user = { ...newUser };
    return res.redirect('/');
  } catch (error) {
    return res.status(500).json({ state: 'fallido', message: 'Hubo un error al registrar el usuario' });
  }
});

export default router;
