import UserModel from '../model/user.models.js';

class UserRepository {
  constructor() {
    this.userModel = UserModel;
  }

  createUser = async (newUser) => {
    try {
      const createUser = await this.userModel.create(newUser);
      return createUser;
    } catch (error) {
      throw new Error(`Error al crear la sesión del usuario en la base de datos: ${error.message}`);
    }
  };

  loginUser = async (email) => {
    try {
      const find = await this.userModel.find({ email });
      return find;
    } catch (error) {
      throw new Error(`Error al buscar el email en la base de datos base de datos: ${error.message}`);
    }
  };
}

export default UserRepository;
