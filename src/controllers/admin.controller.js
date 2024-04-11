import adminService from '../services/admin.service';

const changeUserRole = async (req, res) => {
  const { role } = req.body;
  const { uid } = req.params;
  const data = await adminService.changeRole(role, uid);

  res.status(200).json({ code: 200, message: 'User role updated', data });
};

export default { changeUserRole };
