import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import configObject from './config.js';
import UserModel from '../dao/models/user.models.js';
import encrypt from '../utils/encrypt.js';

const env = configObject;
const LocalStrategy = local.Strategy;

const { GITHUB_CLIENT_ID } = env;
const { GITHUB_CLIENT_SECRET } = env;
const { PORT } = env;

const initializePassport = () => {
  passport.use('github', new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: `http://localhost:${PORT}/api/session/github/callback`,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const findUser = await UserModel.findOne({ email: profile._json?.email });

      if (!findUser) {
        const addNewUser = {
          firstname: profile._json.name,
          lastname: '',
          email: profile._json?.email,
          age: 0,
          password: '',
        };
        const newUser = await UserModel.create(addNewUser);
        return done(null, newUser);
      }
      return done(null, findUser);
    } catch (error) {
      return done(error);
    }
  }));

  passport.use('local-register', new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, username, password, done) => {
      const {
        firstname, lastname, email, age,
      } = req.body;
      try {
        const user = await UserModel.findOne({ email });
        if (user) {
          return done(null, false, { message: 'El correo electrónico ya está registrado.' });
        }

        const hashedPassword = await encrypt.createHash(password);

        const newUser = {
          firstname,
          lastname,
          email,
          age,
          password: hashedPassword,
        };

        const createdUser = await UserModel.create(newUser);

        return done(null, createdUser);
      } catch (error) {
        return done(error);
      }
    },
  ));

  passport.use('local-login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
    try {
      const user = await UserModel.findOne({ email: username });
      if (!user) {
        return done(null, false);
      }
      if (!encrypt.isValidPassword(user, password)) return done(null, false);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await UserModel.findById({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
