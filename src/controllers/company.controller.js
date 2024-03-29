import companyService from '../services/company.service';

const addCOmpany = async (req, res) => {
  const body = {
    ...req.body,
    UserId: req.user.id,
  };
  const data = await companyService.createCompany(body);
  return res.status(200).json({
    code: 200,
    message: 'successfully registers your company',
    data,
  });
};
export default { addCOmpany };
