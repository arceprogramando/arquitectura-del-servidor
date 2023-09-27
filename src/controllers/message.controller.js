import MessageServices from '../services/message.services.js';
import Responses from '../middleware/error.handlers.js';

class messageController {
  constructor() {
    this.messageServices = new MessageServices();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
  }

  createMessage = async (req, res) => {
    try {
      const { user, message } = req.body;
      if (!user) {
        const errorMessage = `${this.enumError.INVALID_PARAMS} El campo "user" es obligatorio`;
        req.logger.warn(errorMessage);
        return this.httpResponse.BAD_REQUEST(res, errorMessage);
      }
      if (!message) {
        const errorMessage = `${this.enumError.INVALID_PARAMS} El campo "message" es obligatorio`;
        req.logger.warn(errorMessage);
        return this.httpResponse.BAD_REQUEST(res, errorMessage);
      }

      const newMessage = {
        user,
        message,
      };

      const createdMessage = await this.messageServices.createMessage(newMessage);
      req.logger.info('Mensaje creado:', createdMessage);
      return this.httpResponse.CREATED(res, 'Mensaje Creado', { data: createdMessage });
    } catch (error) {
      req.logger.error('Error al crear el mensaje:', error);
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} No se ha podido crear el mensaje`, { dataerror: error });
    }
  };
}

export default messageController;
