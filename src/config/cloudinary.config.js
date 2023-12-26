import { v2 as cloudinary } from 'cloudinary';
import configObject from './configenvironment.js';

const env = configObject;

cloudinary.config({
  cloud_name: 'dp47983sq',
  api_key: '168954138249455',
  api_secret: `${env.CLOUDINARYAPISECRET}`,
});

export default cloudinary;
