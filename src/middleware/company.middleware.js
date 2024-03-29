import companyService from '../services/company.service';

const companyExists = async (req, res, next) => {
  const data = await companyService.getCompanyByName(req.body.name);
  if (data) {
    return res
      .status(400)
      .json({ code: 400, message: 'the company name already exists' });
  }
  return next();
};
const companyIdExists = async (req, res, next) => {
  const data = await companyService.getCompanyById(req.params.cid);
  if (!data) {
    return res
      .status(400)
      .json({ code: 400, message: 'the company dos not exists' });
  }
  return next();
};

export default { companyExists, companyIdExists };
