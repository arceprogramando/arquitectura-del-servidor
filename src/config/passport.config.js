import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import configObject from './config.js';
import userModel from '../dao/models/user.models.js';

const env = configObject;

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
      console.log('🚀 ~ file: passport.config.js:16 ~ initializePassport ~ profile:', profile);
      const findUser = await userModel.findOne({ email: profile._json?.email });

      if (!findUser) {
        const addNewUser = {
          firstname: profile._json.name,
          lastname: '',
          email: profile._json?.email,
          age: 0,
          password: '',
        };
        const newUser = await userModel.create(addNewUser);
        return done(null, newUser);
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
      const user = await userModel.findById({ _id: id });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

export default initializePassport;
