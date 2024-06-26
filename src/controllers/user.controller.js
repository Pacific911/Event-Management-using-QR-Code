import passport from 'passport';
import { generateToken } from '../utils/token';
import userService from '../services/user.service';

const signUp = async (req, res, next) => {
  passport.authenticate('signup', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    req.login(user, async () => {
      const body = {
        id: user.id,
        names: user.names,
        email: user.email,
        telephone: user.telephone,
        role: user.role,
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
const fetchAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ code: 200, message: 'All users', users });
  } catch (error) {
    res.status(500).json({
      code: 500,
      message: 'Server Error',
      error: error.message,
    });
  }
};

export default { signUp, login, fetchAllUsers };
