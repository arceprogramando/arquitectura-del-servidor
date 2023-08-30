// Server

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import displayRoutes from 'express-routemap';
import { engine } from 'express-handlebars';
import passport from 'passport';
import configObject from './config/config.js';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import userRoutes from './routes/user.routes.js';
import initializePassport from './config/passport.config.js';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/carts.routes.js';
import messageRouter from './routes/message.routes.js';
import initializeDatabase from './dao/factory.js';

const app = express();
const env = configObject;

app.use(cors());
app.use(cookieParser());

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

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: `${app.get('DB_CNN')}${app.get('DB_NAME')}`,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 40,
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
  console.log(`=Encendido servidor en puerto ${app.get('PORT')}= \n====== http://localhost:${app.get('PORT')}/ =====`);
  console.log(`==========ENV:${app.get('NODE_ENV')}===========`);
  console.log(`=======PERSISTENCE:${app.get('PERSISTENCE')}=============`);
  displayRoutes(app);
  initializeDatabase();
});

app.use('/', viewsRouter);
app.use('/api/user', userRoutes);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/chat', messageRouter);
