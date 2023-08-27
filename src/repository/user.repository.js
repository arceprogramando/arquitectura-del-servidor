import UserModel from '../model/user.models.js';

class UserRepository {
  constructor() {
    this.sessionModel = UserModel;
  }

  createUser = async (newUser) => {
    try {
      const createUser = await this.sessionModel.create(newUser);
      return createUser;
    } catch (error) {
      throw new Error(`Error al crear la sesión del usuario en la base de datos: ${error.message}`);
    }
  };
}

export default UserRepository;
