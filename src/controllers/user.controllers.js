import encrypt from '../helpers/encrypt.js';
import UserService from '../services/user.services.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  logoutUser = async (req, res) => {
    try {
      req.session.destroy();
      res.redirect('/');

    } catch (error) {
      console.error('Error al deslogear:', error);
      res.status(400).send({ status: 'error', error: `Error al deslogear: ${error}` });
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { email, newpassword } = req.body;
      const newPasswordHashed = await encrypt.createHash(newpassword);
      const findUser = await this.userService.findUserByEmail(email);
      if (!findUser) {
        throw new Error('Usuario no encontrado');
      }

      const updateUser = await this.userService.changePassword(findUser, newPasswordHashed);
      console.log('updateuser', updateUser);
      if (!updateUser) {
        throw new Error('Problemas al actualizar la contraseña');
      }

      return res.redirect('/');
    } catch (error) {
      return res.status(500).json({ message: `Error al resetar la contraseña ${error}` });
    }
  };
}
export default UserController;
