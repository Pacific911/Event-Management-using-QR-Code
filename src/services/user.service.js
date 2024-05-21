import Users from '../database/models/users';

async function createUser(details) {
  const user = await Users.create(details);
  return user;
}
async function getUserByEmail(email) {
  const user = await Users.findOne({ where: { email } });
  return user;
}
async function getUserById(id) {
  const user = await Users.findOne({ where: { id } });
  return user;
}

async function getAllUsers() {
  const user = await Users.findAll({
    order: [['createdAt', 'DESC']],
  });
  return user;
}

export default {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
};
