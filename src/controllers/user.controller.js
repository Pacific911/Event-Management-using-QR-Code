import passport from 'passport';
import { generateToken } from '../utils/token';

const signUp = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    req.login(user, async () => {
      const body = {
        id: user.id,
        names: user.username,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
        status: user.status,
      };
      const token = generateToken(body);
      res
        .status(201)
        .header('authenticate', token)
        .json({ code: 201, message: 'Account Created', token });
    });
  })(req, res, next);
};
const login = async (req, res, next) => {
  passport.authenticate(
    'login',
    { session: false },

    async (err, user, info) => {
      try {
        if (err || !user) {
          return res.status(406).json({ code: 406, message: info.message });
        }
        const data = {
          id: user.id,
          names: user.names,
          email: user.email,
          role: user.role,
          status: user.status,
          telephone: user.telephone,
        };
        const token = generateToken(data);
        req.user = user;
        return res
          .status(200)
          .header('authenticate', token)
          .json({
            Code: 200,
            Message: `Logged In Successfully as ${req.user.names} .`,
            token,
          });
      } catch (error) {
        return next(error);
      }
    },
  )(req, res, next);
};

export default { signUp, login };
