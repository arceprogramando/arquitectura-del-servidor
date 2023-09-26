import encrypt from '../helpers/encrypt.js';
import UserService from '../services/user.services.js';
import Responses from '../middleware/error.handlers.js';

class UserController {
  constructor() {
    this.userService = new UserService();
    this.httpResponse = new Responses.HttpResponse();

  }

  logoutUser = async (req, res) => {
    try {
      req.session.destroy();
      return res.redirect('/');
    } catch (error) {
      return this.httpResponse.ERROR(res, 'error al crear el carrito', { error: error.message });
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { email, newpassword } = req.body;
      const newPasswordHashed = await encrypt.createHash(newpassword);
      const findUser = await this.userService.findUserByEmail(email);

      if (!findUser) {
        return this.httpResponse.NOT_FOUND(res, `El usuario con EMAIL: ${email} no fue encontrado`);

      }

      const updateUser = await this.userService.changePassword(findUser, newPasswordHashed);

      if (!updateUser) {
        return this.httpResponse.ERROR(res, 'error al actualizar el carrito el carrito');

      }

      return res.redirect('/');
    } catch (error) {
      return this.httpResponse.ERROR(res, 'error al resetear la contraseña');
    }
  };
}
export default UserController;
