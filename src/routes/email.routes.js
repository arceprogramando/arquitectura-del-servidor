import { Router } from 'express';
import nodemailer from 'nodemailer';
import configObject from '../config/config.js';

const env = configObject;

const { EMAIL } = env;
const { PSW_EMAIL } = env;

const router = Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  user: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PSW_EMAIL,
  },
});

router.post('/', async (req, res) => {
  try {

    const result = await transporter.sendMail({
      from: EMAIL,
      to: req.body.email,
      subject: 'Sending email with nodemailer and gmail as provider',
      html: `
      <div>
      <h1>Este es un email de nodemailer</h1>
      </div>
      `,
    });

    if (result.accepted.length > 0) {
      console.log(`Email sent to ${req.body.email}`);
      return res.send({ ok: true, message: `Email sent to ${req.body.email}` });
    }
    console.error('Error sending email:', result.rejected);

    return res.status(500).send({ ok: false, message: 'Error sending email', error: result.rejected });

  } catch (error) {
    console.error('Error en el servidor:', error);
    return res.status(500).send({ ok: false, message: 'Server error', error: error.message });
  }
});

export default router;