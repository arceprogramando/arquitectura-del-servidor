import { v2 as cloudinary } from 'cloudinary';
import configObject from './configenvironment.js';

const env = configObject;

cloudinary.config({
  cloud_name: `${env.CLOUDINARYCLOUD_NAME}`,
  api_key: `${env.CLOUDINARYAPI_KEY}`,
  api_secret: `${env.CLOUDINARYAPISECRET}`,
});

export default cloudinary;
