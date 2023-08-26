import MessageRepository from '../repository/message.repository.js';

class MessageServices {
  constructor() {
    this.messageRepository = new MessageRepository();
  }

  createMessage = async (newMessage) => {
    try {
      const createMessage = await this.messageRepository.createMessage(newMessage);
      return createMessage;
    } catch (error) {
      throw new Error(`Error al crear el mensaje en el service: ${error.message}`);
    }
  };
}

export default MessageServices;
