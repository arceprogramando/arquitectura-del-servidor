import express from 'express';
import displayRoutes from 'express-routemap';

import { setupMiddlewares, setupViewEngine, setupAuthentication } from './config/middleware.config.js';
import configObject from './config/configenvironment.js';
import configureRoutes from './config/routes.config.js';
import initializeDatabase from './dao/factory.js';

const fastLogger = {
  info: configObject.NODE_ENV === 'dev' ? console.log : () => {},
  error: console.error,
  warn: console.warn,
  time: configObject.NODE_ENV === 'dev' ? console.time : () => {},
  timeEnd: configObject.NODE_ENV === 'dev' ? console.timeEnd : () => {},
};

const initializeApp = () => {
  const app = express();

  try {
    fastLogger.time('⏱️ Tiempo de inicialización total');
    fastLogger.time('⏱️ Configuración de aplicación');

    Object.entries(configObject).forEach(([key, value]) => {
      app.set(key, value);
    });

    setupMiddlewares(app);
    setupViewEngine(app);
    setupAuthentication(app);
    configureRoutes(app);

    fastLogger.timeEnd('⏱️ Configuración de aplicación');

    initializeDatabase()
      .then(() => fastLogger.info('✅ Base de datos conectada'))
      .catch((error) => fastLogger.error('❌ Error conectando a la base de datos:', error));

    return app;
  } catch (error) {
    fastLogger.error('❌ Error durante la inicialización:', error);
    process.exit(1);
    return null;
  }
};

const startServer = () => {
  const app = initializeApp();

  app.listen(app.get('PORT'), () => {
    fastLogger.info('🚀 Servidor iniciado exitosamente');
    fastLogger.info(`📍 URL: ${app.get('BASE_URL')}`);
    fastLogger.info(`🌍 Entorno: ${app.get('NODE_ENV')}`);
    fastLogger.info(`📡 Puerto: ${app.get('PORT')}`);

    if (app.get('NODE_ENV') === 'dev') {
      fastLogger.info('📋 Mostrando rutas disponibles:');
      displayRoutes(app);
    }

    fastLogger.timeEnd('⏱️ Tiempo de inicialización total');
  });
};

startServer();
