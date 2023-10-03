// EmailController.js
import Responses from '../middleware/error.handlers.js';
import EmailServices from '../services/email.services.js';

class EmailController {
  constructor() {
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
    this.emailService = new EmailServices();
  }

  sendEmail = async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return this.httpResponse.BAD_REQUEST(res, 'No se proporcionó el email para el envío de la recuperación de contraseña');
      }

      const result = await this.emailService.sendEmail(email);

      if (result.accepted.length > 0) {
        req.logger.info(`Email sent to: ${email}`);
        return this.httpResponse.OK(res, `Email sent to: ${email}`);
      }

      req.logger.error('Error al enviar el email:', result.rejected);

      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al enviar el email de recuperación`, { error: result.rejected });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al enviar el mensaje de recuperación`, { error: error.message });
    }
  };
}

export default EmailController;
