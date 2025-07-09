import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import express from 'express';
import { engine } from 'express-handlebars';
import passport from 'passport';

import __dirname from '../utils.js';
import setLogger from '../utils/logger.js';
import { setupSession } from './session.config.js';
import initializePassport from './passport.config.js';

export const setupMiddlewares = (app) => {
  app.use(
    cors({
      origin: app.get('CORS_ORIGIN') || '*',
      methods: app.get('METHOD_ORIGINS')?.split(',') || ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );

  app.use(cookieParser());
  app.use(compression({ brotli: { enable: true, zlib: {} } }));
  app.use(setLogger);

  app.use(express.static(`${__dirname}/public`));
  app.use(express.json({ limit: '500kb' }));
  app.use(express.urlencoded({ extended: true }));
};

export const setupViewEngine = (app) => {
  app.engine(
    'handlebars',
    engine({
      defaultLayout: 'main',
      partialsDir: `${__dirname}/views/partials`,
      helpers: {
        currentYear: () => new Date().getFullYear(),
        eq: (a, b) => a === b,
        formatDate: (date) => new Date(date).toLocaleDateString('es-ES'),
        json: (context) => JSON.stringify(context),
      },
    }),
  );
  app.set('views', `${__dirname}/views`);
  app.set('view engine', 'handlebars');
};

export const setupAuthentication = (app) => {
  setupSession(app);

  initializePassport();
  app.use(passport.initialize());
  app.use(passport.session());
};

export default {
  setupMiddlewares,
  setupViewEngine,
  setupAuthentication,
};
