import MessageModel from '../model/message.models.js';

class MessageRepository {
  constructor() {
    this.messageModel = MessageModel;
  }

  createMessage = async (newMessage) => {
    try {
      const createMessage = await this.messageModel.create(newMessage);
      return createMessage;
    } catch (error) {
      throw new Error(`Error al crear el mensaje en la base de datos: ${error.message}`);
    }
  };
}

export default MessageRepository;
