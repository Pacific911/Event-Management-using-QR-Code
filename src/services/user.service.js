import Users from '../database/models/users';

async function createUser(details) {
  const user = await Users.create(details);
  return user;
}
async function getUserByEmail(email) {
  const user = await Users.findOne({ where: { email } });
  return user;
}

export default {
  createUser,
  getUserByEmail,
};
