import { config } from 'dotenv';

config({
  path: `.env.${process.env.NODE_ENV || 'development'}.local`,
});

const {
  DB_PORT,
  PORT,
  DB_CNN,
  DB_HOST,
  COLLECTION_NAME,
  NODE_ENV,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  PERSISTENCE,
  EMAIL,
  PSW_EMAIL,
  BASE_URL,
  CLOUDINARYAPISECRET,
  SESSION_SECRET,
  CORS_ORIGIN,
} = process.env;

const configObject = {
  DB_PORT,
  PORT,
  DB_CNN,
  DB_HOST,
  COLLECTION_NAME,
  NODE_ENV,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  PERSISTENCE,
  EMAIL,
  PSW_EMAIL,
  BASE_URL,
  CLOUDINARYAPISECRET,
  SESSION_SECRET,
  CORS_ORIGIN,
};

export default configObject;
