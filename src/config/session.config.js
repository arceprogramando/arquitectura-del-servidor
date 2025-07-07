import session from 'express-session';
import mongoStore from 'connect-mongo';

export const setupSession = (app) => {
  app.use(
    session({
      store: mongoStore.create({
        mongoUrl: `${app.get('DB_CNN')}${app.get('COLLECTION_NAME')}`,
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
        ttl: 24 * 60 * 60,
      }),
      secret: app.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        secure: app.get('NODE_ENV') === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      },
    }),
  );
};

export default setupSession;
