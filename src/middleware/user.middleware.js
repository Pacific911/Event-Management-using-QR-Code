import userService from '../services/user.service';

const userExists = async (req, res, next) => {
  const data = await userService.getUserById(req.params.uid);
  if (!data) {
    return res.status(400).json({ code: 400, message: 'User does not exist' });
  }
  return next();
};

export default { userExists };
