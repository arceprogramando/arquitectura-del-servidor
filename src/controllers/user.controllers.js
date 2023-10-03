import encrypt from '../helpers/encrypt.js';
import UserService from '../services/user.services.js';
import Responses from '../middleware/error.handlers.js';
import EmailServices from '../services/email.services.js';
import UserModel from '../model/user.models.js';

class UserController {
  constructor() {
    this.userModel = UserModel;
    this.userService = new UserService();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
    this.emailService = new EmailServices();
  }

  logoutUser = async (req, res) => {
    try {
      req.session.destroy();
      return res.redirect('/');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}error al crear el carrito`, { error: error.message });
    }
  };

  recoverWithEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const findUser = await this.userService.findUserByEmail(email);

      if (!findUser) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.DB_ERROR} El usuario con EMAIL: ${email} no fue encontrado`);

      }

      await this.emailService.sendEmail(email);

      return res.redirect('/checkyouremail');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} 'error al enviar recuperacion al email`, error);

    }
  };

  resetPassword = async (req, res) => {
    try {
      const { email, newpassword } = req.body;

      const findUser = await UserModel.findOne({ email });

      if (!findUser) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.DB_ERROR} El usuario con EMAIL: ${email} no fue encontrado`);
      }

      const findUserPasswordHashed = findUser.password;

      const comparePassword = await encrypt.comparePasswords(newpassword, findUserPasswordHashed);

      if (comparePassword) {
        return this.httpResponse.BAD_REQUEST(res, 'No se puede usar la misma contraseña anterior.');
      }

      const newPasswordHashed = await encrypt.createHash(newpassword);

      const updateUser = await this.userService.changePassword(findUser, newPasswordHashed);

      if (!updateUser) {
        return this.httpResponse.ERROR(res, `${this.enumError.DB_ERROR} error al actualizar la contraseña.`);
      }

      return res.redirect('/');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} error al resetear la contraseña: ${error.message}`);
    }
  };

}

export default UserController;
