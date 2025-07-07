import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import passport from 'passport';
import displayRoutes from 'express-routemap';
import compression from 'compression';

import __dirname from './utils.js';
import setLogger from './utils/logger.js';
import configObject from './config/configenvironment.js';
import initializePassport from './config/passport.config.js';
import { setupSession } from './config/session.config.js';
import setupRoutes from './config/routes.config.js';
import initializeDatabase from './dao/factory.js';

const app = express();

Object.entries(configObject).forEach(([key, value]) => {
  app.set(key, value);
});

app.use(
  cors({
    origin: app.get('CORS_ORIGIN') || '*',
    methods: app.get('METHOD_ORIGINS').split(',') || 'GET,POST,PUT,DELETE',
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(compression({ brotli: { enable: true, zlib: {} } }));
app.use(setLogger);

app.use(express.static(`${__dirname}/public`));
app.use(express.json({ limit: '500kb' }));
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

setupSession(app);
initializePassport();

app.use(passport.initialize());
app.use(passport.session());

setupRoutes(app);

app.listen(app.get('PORT'), () => {
  initializeDatabase();
  if (app.get('NODE_ENV') === 'dev') {
    displayRoutes(app);
    console.log('====== Corriendo en modo desarrollo ======');
    console.log(`====== Corriendo en ${app.get('BASE_URL')} =====`);
  }
});
