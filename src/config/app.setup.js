import configObject from './configenvironment.js';

export const setupAppConfig = (app) => {
  Object.entries(configObject).forEach(([key, value]) => {
    app.set(key, value);
  });

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
};

export const getAppInfo = (app) => ({
  port: app.get('PORT'),
  env: app.get('NODE_ENV'),
  baseUrl: app.get('BASE_URL'),
  dbConnection: app.get('DB_CNN'),
});

export default {
  setupAppConfig,
  getAppInfo,
};
