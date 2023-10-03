import encrypt from '../helpers/encrypt.js';
import UserService from '../services/user.services.js';
import Responses from '../middleware/error.handlers.js';
import EmailServices from '../services/email.services.js';
import UserModel from '../model/user.models.js';
import generateRecoveryToken from '../utils/generatetimetoken.js';

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

      const recoveryToken = generateRecoveryToken();
      const tokenExpiration = new Date();
      tokenExpiration.setHours(tokenExpiration.getHours() + 1);

      findUser.recoveryToken = recoveryToken;
      findUser.tokenExpiration = tokenExpiration;
      await findUser.save();

      await this.emailService.sendRecoveryEmail(email, recoveryToken);

      return res.redirect('/checkyouremail');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} 'error al enviar recuperación al email`, error);
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

  changeRoleWithId = async (req, res) => {
    try {
      const { uId } = req.params;

      const findUser = await this.userModel.findById(uId);

      if (!findUser) {
        return this.httpResponse.NOT_FOUND(res, `${this.enumError.DB_ERROR} Usuario no encontrado`);
      }

      if (findUser.role === 'USER') {
        findUser.role = 'PREMIUM';
      } else if (findUser.role === 'PREMIUM') {
        findUser.role = 'USER';
      }

      await findUser.save();

      return this.httpResponse.OK(res, `Rol de ${findUser.email} cambiado con éxito a ${findUser.role}`);
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al cambiar el rol de premium a user o viceversa: ${error.message}`);
    }
  };
}

export default UserController;
