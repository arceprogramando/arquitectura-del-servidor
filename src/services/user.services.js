import UserRepository from '../repository/user.repository.js';
// import encrypt from '../helpers/encrypt.js';

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

  changePassword = async (findUser, newPasswordHashed) => {
    try {
      const updatedUser = await this.userRepository.changePassword(findUser, newPasswordHashed);
      return updatedUser;
    } catch (error) {
      throw new Error(`Error al cambiar la contraseña: ${error.message}`);
    }
  };

  // comparePassword = async (newpassword, findUser) => {
  //   try {
  //     const encryptNewPassword = await encrypt.createHash(newpassword);

  //     const findUserPassword = findUser[0].password;
  //     const newPasswordHashed = await encrypt.createHash(newpassword);
  //     if (newPasswordHashed === findUser.password) {
  //       return true;
  //     }

  //     const match = encrypt.isValidPassword(findUser, newpassword);
  //     return match;
  //   } catch (error) {
  //     throw new Error(`Error al comparar las contraseñas: ${error.message}`);
  //   }
  // };
}

export default UserService;
