import nodemailer from 'nodemailer';
import configObject from './config.js';

const env = configObject;

const { EMAIL, PSW_EMAIL } = env;

const Transporter = nodemailer.createTransport({
  service: 'gmail',
  user: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PSW_EMAIL,
  },
});

const TransporterData = {
  Transporter, EMAIL,
};

export default TransporterData;
