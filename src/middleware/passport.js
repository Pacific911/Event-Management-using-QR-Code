import passport from 'passport';
import LocalStrategy from 'passport-local';
import userService from '../services/user.service';
import { hashPassword, comparePassword } from '../utils/password';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await userService.getUserByEmail(email);
      if (user) {
        const passCheck = await comparePassword(password, user.password);
        if (passCheck) {
          return done(null, user.dataValues, {
            message: 'Logged In Successfully',
          });
        }
        return done(null, false, { message: 'Password is incorrect' });
      }
      return done(null, false, { message: 'User not Found.' });
    },
  ),
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = {
          email: email.trim(),
          names: req.body.names,
          telephone: req.body.telephone,
          password: await hashPassword(password),
        };
        const user = await userService.createUser(data);
        done(null, user.dataValues);
      } catch (error) {
        done(error);
      }
    },
  ),
);
