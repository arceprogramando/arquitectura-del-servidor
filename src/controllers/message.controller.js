import MessageServices from '../services/message.services.js';
import Responses from '../middleware/error.handlers.js';

class messageController {
  constructor() {
    this.messageServices = new MessageServices();
    this.httpResponse = new Responses.HttpResponse();

  }

  createMessage = async (req, res) => {
    try {
      const { user, message } = req.body;
      if (!user || !message) {
        return this.httpResponse.BAD_REQUEST(res, 'Uno de los campos, user o messsage, no se envió correctamente');
      }
      const newMessage = {
        user,
        message,
      };

      const createdMessage = await this.messageServices.createMessage(newMessage);
      return this.httpResponse.CREATED(res, 'Mensaje Creado', { data: createdMessage });
    } catch (error) {
      return this.httpResponse.ERROR(res, 'No se ha podido crear el mensaje', { dataerror: error });
    }
  };
}
export default messageController;
