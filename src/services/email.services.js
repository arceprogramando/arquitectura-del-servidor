import configObject from '../config/config.js';
import TransporterData from '../config/nodemailer.config.js';
import Responses from '../middleware/error.handlers.js';

const env = configObject;

class EmailServices {
  constructor() {
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
  }

  sendEmail = async (email) => {
    try {
      const result = await TransporterData.Transporter.sendMail({
        from: TransporterData.EMAIL,
        to: email,
        subject: 'Enviando email de recuperación de contraseña',
        html: `
        <div>
            <h1>Recuperación de contraseña</h1>
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
            <a href="${env.BASE_URL}/recover">Restablecer Contraseña</a>
        </div>
        `,
      });
      return result;
    } catch (error) {
      throw new Error(`Error al enviar el email de recuperacion en el service: ${error.message}`);
    }
  };
}

export default EmailServices;
