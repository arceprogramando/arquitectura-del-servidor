import { Router } from 'express';
import MessageModel from '../dao/models/message.models.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { user, message } = req.body;

    if (!user && message) {
      return res.status(400).json({ error: 'Uno de los campos , user o message , no se envio correctamente ' });
    }

    const newMessage = {
      user,
      message,
    };

    const createdMessage = await MessageModel.create(newMessage);

    return res.status(201).json(createdMessage);
  } catch (error) {
    return res.status(500).json({ error: 'Ocurrió un error al guardar el mensaje' });
  }
});
