import Users from '../database/models/users';
import adminService from '../services/admin.service';

const changeUserRole = async (req, res) => {
  const { role } = req.body;
  const { uid } = req.params;
  const data = await adminService.changeRole(role, uid);

  res.status(200).json({ code: 200, message: 'User role updated', data });
};

const changeUserStatus = async (req, res) => {
  try {
    const { uid: userId } = req.params;

    const userData = await Users.findOne({ where: { id: userId } });

    const newStatus = !userData.deleted;
    const updatedStatus = await Users.update(
      { deleted: newStatus },
      { where: { id: userId } },
    );
    return res.status(200).json({ user: updatedStatus });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export default { changeUserRole, changeUserStatus };
