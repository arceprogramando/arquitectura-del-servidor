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

  // resetPassword = async (req, res) => {
  //   try {
  //     const { email, newpassword } = req.body;
  //     console.log('🚀 ~ file: user.controllers.js:22 ~ UserController ~ resetPassword= ~ newpassword:', newpassword);
  //     console.log('🚀 ~ file: user.controllers.js:22 ~ UserController ~ resetPassword= ~ email:', email);

  //     await this.userService.updatePassword(email, newpassword);

  //     return res.redirect('/');
  //   } catch (error) {
  //     console.error('Error al actualizar la contraseña:', error);
  //     return res.status(500).json({ status: 'Error al actualizar la contraseña', error: error.message });
  //   }
  // };

  authenticateGitHub = async (req, res) => {
    try {
      const authenticatedUser = req.user;
      console.log('🚀 ~ file: user.controllers.js:75 ~ UserController ~ authenticateGitHub= ~ authenticatedUser:', authenticatedUser);
      res.redirect('/product');
    } catch (error) {
      console.error('Error en la autenticación de GitHub:', error);
      res.status(500).json({ message: 'Error en la autenticación de GitHub' });
    }
  };

  handleGitHubCallback = async (req, res) => {
    try {
      console.log('***Usuario endpoint de github/callback para comunicarnos***');
      req.user.user = req.user;
      res.redirect('/profile');
    } catch (error) {
      console.log('Error en el callback de GitHub:', error);
      res.status(500).json({ message: 'Error en la autenticación de GitHub' });
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
      console.log('hasta aca todo bien XD');

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
