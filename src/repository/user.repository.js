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
      throw new Error(
        `Error al buscar el email en la base de datos base de datos: ${error.message}`,
      );
    }
  };

  findUserById = async (uId) => {
    try {
      const find = await this.userModel.findOne({ _id: uId });
      return find;
    } catch (error) {
      throw new Error(
        `Error al buscar el email en la base de datos base de datos: ${error.message}`,
      );
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

  updatePasswordResetRequestAt = async (findUser) => {
    try {
      if (findUser) {
        const resetRequestedAt = new Date();
        const updatedUser = await this.userModel.findOneAndUpdate(
          { _id: findUser[0]._id },
          { passwordResetRequestAt: resetRequestedAt },
          { new: true },
        );

        if (!updatedUser) {
          throw new Error('Usuario no encontrado en la base de datos');
        }

        return updatedUser;
      }
      return null;
    } catch (error) {
      throw new Error(
        `Error al actualizar la fecha de restauración de contraseña: ${error.message}`,
      );
    }
  };

  updateUserById = async (uId, newData) => {
    try {
      const updateUser = await this.userModel.findByIdAndUpdate(uId, newData, { new: true });
      return updateUser;
    } catch (error) {
      throw new Error(
        `Error al actualizar la fecha de restauración de contraseña: ${error.message}`,
      );
    }
  };
}

export default UserRepository;
