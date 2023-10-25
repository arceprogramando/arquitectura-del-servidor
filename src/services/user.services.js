import UserRepository from '../repository/user.repository.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  updatePassword = async (findUser, newPasswordHashed) => {
    try {
      const updatedUser = await this.userRepository.updatePassword(findUser, newPasswordHashed);

      if (!updatedUser) {
        throw new Error('Problemas al actualizar la contraseña');
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Error al actualizar la contraseña: ${error.message}`);
    }
  };

  findUserByEmail = async (email) => {
    try {
      const user = await this.userRepository.findUserByEmail(email);
      return user;
    } catch (error) {
      throw new Error(`Error al buscar el email: ${error.message}`);
    }
  };

  findUserById = async (uId) => {
    try {
      const user = await this.userRepository.findUserById(uId);
      return user;
    } catch (error) {
      throw new Error(`Error al buscar el email: ${error.message}`);
    }
  };

  changePassword = async (findUser, newPasswordHashed) => {
    try {
      const updatedUser = await this.userRepository.changePassword(findUser, newPasswordHashed);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al cambiar la contraseña: ${error.message}`);
    }
  };

  updatePasswordResetRequestAt = async (findUser) => {
    try {
      const updateUser = await this.userRepository.updatePasswordResetRequestAt(findUser);
      return updateUser;
    } catch (error) {
      throw new Error(`Error al hacer el ResetRequest at: ${error.message}`);
    }
  };

  updateUserById = async (uId, newData) => {
    try {
      const updateUser = await this.userRepository.updateUserById(uId, newData);
      return updateUser;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  };

  getAllUsers = async () => {
    try {
      const getAllUsers = await this.userRepository.getAllUsers();
      return getAllUsers;
    } catch (error) {
      throw new Error(`Error al traer a los usuarios ${error.message}`);

    }
  };
}

export default UserService;
