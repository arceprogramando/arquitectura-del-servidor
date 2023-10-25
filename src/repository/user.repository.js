import UserModel from '../model/user.models.js';
import EmailServices from '../services/email.services.js';

class UserRepository {
  constructor() {
    this.userModel = UserModel;
    this.emailService = new EmailServices();
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

  getAllUsers = async () => {
    try {
      const getAllUsers = await this.userModel.find({});
      return getAllUsers;
    } catch (error) {
      throw new Error(
        `Error al traer a todos los usuarios${error.message}`,
      );
    }
  };

  findInactiveUsers = async () => {
    try {
      const today = new Date();
      const twoDaysAgo = today.setDate(today.getDate() - 2);

      const inactiveUsers = await this.userModel.find({
        last_connection: { $lt: twoDaysAgo },
        role: { $ne: 'ADMIN' },
      });
      return inactiveUsers;
    } catch (error) {
      throw new Error(
        `Error al traer a los usuarios inactivos o notificarlos: ${error.message}`,
      );
    }
  };

  deleteManyUsers = async (inactiveUserIds) => {
    try {
      if (Array.isArray(inactiveUserIds)) {
        const deleteManyUsers = await this.userModel.deleteMany({ _id: { $in: inactiveUserIds } });
        return deleteManyUsers;
      }
      const deleteUser = await this.userModel.deleteOne({ _id: inactiveUserIds });
      return deleteUser;

    } catch (error) {
      throw new Error(`Error al borrar el/los usuarios: ${error.message}`);
    }
  };

  notifyDeleteWithEmail = async (inactiveUserEmails) => {
    try {
      const sendDeleteEmails = await this.emailService.sendDeleteEMail(inactiveUserEmails);
      return sendDeleteEmails;
    } catch (error) {
      throw new Error(`Error al notificar el borrado con email ${error.message}`);
    }
  };

  deleteInactiveUsersAndNotify = async () => {
    try {
      // const deleteInactiveUsersAndNotify = await this.userModel.deleteMany({});
      return this.deleteInactiveUsersAndNotify;
    } catch (error) {
      throw new Error(
        `Error al borrar a los usuarios inactivos o notificarlos${error.message}`,
      );
    }
  };
}

export default UserRepository;
