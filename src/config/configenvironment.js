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
  CLOUDINARYCLOUD_NAME,
  CLOUDINARYAPI_KEY,
  CLOUDINARYAPISECRET,
  EXPRESS_SESSION_SECRET,
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
  CLOUDINARYCLOUD_NAME,
  CLOUDINARYAPI_KEY,
  CLOUDINARYAPISECRET,
  EXPRESS_SESSION_SECRET,
};

export default configObject;
