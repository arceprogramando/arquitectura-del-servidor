import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import configObject from './config.js';
import UserModel from '../model/user.models.js';
import encrypt from '../helpers/encrypt.js';
import CartModel from '../model/carts.models.js';

const env = configObject;
const LocalStrategy = local.Strategy;

const { GITHUB_CLIENT_ID } = env;
const { GITHUB_CLIENT_SECRET } = env;
const { PORT, BASE_URL, RAILWAY_APP_URL } = env;

let callbackURL;

if (RAILWAY_APP_URL || RAILWAY_APP_URL.trim() !== '') {
  callbackURL = `${RAILWAY_APP_URL}/api/user/github/callback`;
} else {
  callbackURL = `${BASE_URL}${PORT}/api/user/github/callback`;
}

console.log(callbackURL);

const initializePassport = () => {

  passport.use('github', new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL,
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

        const newCart = new CartModel();

        await newCart.save();

        const newUser = {
          firstname,
          lastname,
          email,
          age,
          password: hashedPassword,
          carts: [{ cart: newCart._id }],
        };

        const createdUser = await UserModel.create(newUser);

        return done(null, createdUser);
      } catch (error) {
        return done(error);
      }
    },
  ));

  passport.use('local-login', new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const findUser = await UserModel.findOne({ email });
      if (!findUser) {

        return done(null, false);
      }

      if (!encrypt.isValidPassword(password, findUser)) {

        return done(null, false);
      }
      return done(null, findUser);
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
