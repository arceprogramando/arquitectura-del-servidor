// Server

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import passport from 'passport';
import compression from 'express-compression';
import configObject from './config/configenvironment.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import userRoutes from './routes/user.routes.js';
import initializePassport from './config/passport.config.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import messageRouter from './routes/message.routes.js';
import sendEmail from './routes/email.routes.js';
import sessionRouter from './routes/session.routes.js';
import ticketRouter from './routes/ticket.routes.js';
import docsRouter from './routes/docs.routes.js';
import initializeDatabase from './factory/factory.js';
import setLogger from './utils/logger.js';
import loggerRouter from './routes/logger.routes.js';

const app = express();
const env = configObject;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.use(cookieParser());
app.use(compression({ brotli: { enable: true, zlib: {} } }));
app.use(setLogger);

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.set('PORT', env.PORT || 8080);
app.set('NODE_ENV', env.NODE_ENV || 'development');
app.set('DB_CNN', env.DB_CNN);
app.set('COLLECTION_NAME', env.COLLECTION_NAME);
app.set('BASE_URL', env.BASE_URL);
app.set('EXPRESS_SESSION_SECRET', env.EXPRESS_SESSION_SECRET);

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: `${app.get('DB_CNN')}${app.get('COLLECTION_NAME')}`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 1000,
    }),
    secret: `${app.get('EXPRESS_SESSION_SECRET')}`,
    saveUninitialized: false,
    resave: false,
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.listen(app.get('PORT'), () => {
  console.log(`====== ${app.get('BASE_URL')} =====`);
  displayRoutes(app);
  initializeDatabase();
});

app.use('/', viewsRouter);
app.use('/api/users', userRoutes);
app.use('/api/session', sessionRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', messageRouter);
app.use('/api/email', sendEmail);
app.use('/api/tickets', ticketRouter);
app.use('/loggertest', loggerRouter);
app.use('/api/docs', docsRouter);
