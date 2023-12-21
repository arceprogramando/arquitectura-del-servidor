import configObject from '../config/configenvironment.js';
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

  sendDeleteEMail = async (emails) => {
    try {
      if (Array.isArray(emails)) {
        const sendManyDeleteEmails = await Promise.all(
          emails.map((email) => this.sendSingleDeleteEmail(email)),
        );
        return sendManyDeleteEmails;
      }
      return this.sendSingleDeleteEmail(emails);

    } catch (error) {
      throw new Error(`Error al enviar el email de eliminación de cuenta en el servicio: ${error.message}`);
    }
  };

  sendSingleDeleteEmail = async (email) => TransporterData.Transporter.sendMail({
    from: TransporterData.EMAIL,
    to: email,
    subject: 'Enviando email de borrado de cuenta por no conectarse',
    html: `
        <div>
            <h1>Borrado de cuenta </h1>
            <p> Hola  ${email} la cuenta fue borrada por inactividad </p>
            <a href="${env.BASE_URL}/">Iniciar sesión nuevamente</a>
        </div>
        `,
  });

  sendDeleteProduct = async (email) => {
    try {
      const result = await TransporterData.Transporter.sendMail({
        from: TransporterData.EMAIL,
        to: email,
        subject: 'Enviando email de que se borro un producto de un usuario premium',
        html: `
        <div>
            <h1>Recuperación de contraseña</h1>
            <p>Hola  ${email}  se ha borrado un producto del carro de creacion de productos:</p>
            <a href="${env.BASE_URL}/products">Ver Productos</a>
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
