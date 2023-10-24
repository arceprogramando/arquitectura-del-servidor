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
      const { user } = req;
      req.user.last_connection = new Date();
      await user.save();

      req.session.destroy();

      return res.redirect('/');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}error al crear el carrito`,
        { error: error.message },
      );
    }
  };

  recoverWithEmail = async (req, res) => {
    try {
      const { email } = req.body;
      const findUser = await this.userService.findUserByEmail(email);

      if (!findUser) {
        return this.httpResponse.NOT_FOUND(
          res,
          `${this.enumError.DB_ERROR} El usuario con EMAIL: ${email} no fue encontrado`,
        );
      }

      await this.userService.updatePasswordResetRequestAt(findUser);
      await this.emailService.sendEmail(email);

      return res.redirect('/checkyouremail');
    } catch (error) {
      console.log(error);
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} 'error al enviar recuperacion al email `,
        error.message,
      );
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { email, newpassword } = req.body;

      const findUser = await UserModel.findOne({ email });

      if (!findUser) {
        return this.httpResponse.NOT_FOUND(
          res,
          `${this.enumError.DB_ERROR} El usuario con EMAIL: ${email} no fue encontrado`,
        );
      }

      const resetRequestedAt = findUser.passwordResetRequestAt;
      const currentTime = new Date();
      const timeDifference = currentTime - resetRequestedAt;

      const timeLimit = 60 * 60 * 1000;

      if (timeDifference > timeLimit) {
        return res.status(400).redirect('/emailwithrecover');
      }

      const findUserPasswordHashed = findUser.password;

      const comparePassword = await encrypt.comparePasswords(newpassword, findUserPasswordHashed);

      if (comparePassword) {
        return this.httpResponse.BAD_REQUEST(res, 'No se puede usar la misma contraseña anterior.');
      }

      const newPasswordHashed = await encrypt.createHash(newpassword);

      const updateUser = await this.userService.changePassword(findUser, newPasswordHashed);

      if (!updateUser) {
        return this.httpResponse.ERROR(
          res,
          `${this.enumError.DB_ERROR} error al actualizar la contraseña.`,
        );
      }

      return res.redirect('/');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} error al resetear la contraseña: ${error.message}`,
      );
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

      return this.httpResponse.OK(
        res,
        `Rol de ${findUser.email} cambiado con éxito a ${findUser.role}`,
      );
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} Error al cambiar el rol de premium a user o viceversa: ${error.message}`,
      );
    }
  };

  uploadDocuments = async (req, res) => {
    try {
      const { uId } = req.params;
      const { user } = req;

      const { newData } = req.body;

      const newImagePath = `/upload/${req.file.filename}`;
      newData.thumbnails = newImagePath;

      let uploadFolder = '';
      if (req.file.fieldname === 'profileImage') {
        uploadFolder = 'profiles';
        user.uploadedDocuments.identification = true;
      } else if (req.file.fieldname === 'identificationImage') {
        uploadFolder = 'documents/identificationImage';
        user.uploadedDocuments.addressProof = true;
      } else if (req.file.fieldname === 'residenceImage') {
        uploadFolder = 'documents/residenceImage';
        user.uploadedDocuments.proofOfAccountStatus = true;
      } else if (req.file.fieldname === 'accountstatusImage') {
        uploadFolder = 'documents/accountStatusImage';
        user.uploadedDocuments.accountstatusImage = true;
      }
      await user.save();
      const thumbnails = `/upload/${uploadFolder}/${req.file.filename}`;
      newData.document = thumbnails;

      await this.userModel.findByIdAndUpdate(uId, newData);

      return this.httpResponse.OK(res, 'Documentos cargados exitosamente');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} Error al subir al cargar los documentos: ${error.message}`,
      );
    }
  };

}

export default UserController;
