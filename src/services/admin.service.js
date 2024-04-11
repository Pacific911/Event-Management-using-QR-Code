import Users from '../database/models/users';

async function changeRole(role, id) {
  const result = await Users.update(
    { role },
    { where: { id }, returning: true },
  );
  return result;
}
export default { changeRole };
