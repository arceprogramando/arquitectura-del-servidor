import UserModel from '../model/user.models.js';

class UserRepository {
  constructor() {
    this.userModel = UserModel;
  }

  findUserByEmail = async (email) => {
    try {
      const find = await this.userModel.find({ email });
      return find;
    } catch (error) {
      throw new Error(`Error al buscar el email en la base de datos base de datos: ${error.message}`);
    }
  };

  changePassword = async (userId, newPasswordHashed) => {
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        userId,
        { password: newPasswordHashed },
        { new: true },
      );

      return updatedUser;
    } catch (error) {
      throw new Error(`Error al cambiar la contraseña en la base de datos: ${error.message}`);
    }
  };

}

export default UserRepository;
