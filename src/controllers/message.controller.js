import MessageServices from '../services/message.services.js';

class messageController {
  constructor() {
    this.messageServices = new MessageServices();
  }

  createMessage = async (req, res) => {
    try {
      const { user, message } = req.body;
      if (!user && message) {
        return res.status(400).json({ error: 'Uno de los campos , user o message , no se envio correctamente ' });
      }
      const newMessage = {
        user,
        message,
      };

      const createdMessage = await this.messageServices.createMessage(newMessage);
      return res.status(201).json(createdMessage);
    } catch (error) {
      return res.status(500).json({ error: 'Ocurrió un error al guardar el mensaje' });

    }
  };
}
export default messageController;
