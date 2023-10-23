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
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import configObject from './config/config.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import userRoutes from './routes/user.routes.js';
import initializePassport from './config/passport.config.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import messageRouter from './routes/message.routes.js';
import sendEmail from './routes/email.routes.js';
import ticketRouter from './routes/ticket.routes.js';
import mockingRouter from './routes/mocking.routes.js';
import initializeDatabase from './dao/factory.js';
import setLogger from './utils/logger.js';
import loggerRouter from './routes/logger.routes.js';
import swaggerOpts from './config/swagger.config.js';

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
app.set('DB_NAME', env.DB_NAME);
app.set('PERSISTENCE', env.PERSISTENCE);
app.set('BASE_URL', env.BASE_URL);

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: `${app.get('DB_CNN')}${app.get('DB_NAME')}`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 1000,
    }),
    secret: 'mi_clave_secreta',
    saveUninitialized: false,
    resave: false,
  }),
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.listen(app.get('PORT'), () => {
  console.log(
    `=Encendido servidor en puerto ${app.get('PORT')}= \n====== ${app.get('BASE_URL')}/ =====`,
  );
  console.log(`==========ENV:${app.get('NODE_ENV')}===========`);
  console.log(`=======PERSISTENCE:${app.get('PERSISTENCE')}=============`);
  console.log(`=======PROCESS:${process.pid}=============`);
  displayRoutes(app);
  initializeDatabase();
});

const specs = swaggerJSDoc(swaggerOpts);

app.use('/', viewsRouter);
app.use('/api/user', userRoutes);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', messageRouter);
app.use('/api/email', sendEmail);
app.use('/api/tickets', ticketRouter);
app.use('/mockingproducts', mockingRouter);
app.use('/loggertest', loggerRouter);
app.use('/api/docs/', swaggerUi.serve, swaggerUi.setup(specs));
