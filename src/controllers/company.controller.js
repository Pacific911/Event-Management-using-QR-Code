import companyService from '../services/company.service';

const addCOmpany = async (req, res) => {
  const body = {
    ...req.body,
    UserId: req.user.id,
  };
  const data = await companyService.createCompany(body);
  return res.status(200).json({
    code: 200,
    message: 'successfully registered your company',
    data,
  });
};

const deleteCompany = async (req, res) => {
  try {
    const CompanyId = req.params.id;
    await companyService.deleteCompany(CompanyId);
    res.status(200).json({
      code: 200,
      message: 'successfully deleted a company',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'An error occurred while deleting a company',
      error: error.message,
    });
  }
};

const viewAllCompanies = async (req, res) => {
  const companies = await companyService.getAllCompanies();
  res.status(200).json({ code: 200, message: 'All companies', companies });
};

const viewSingleCompany = async (req, res) => {
  const { cid } = req.params;
  const company = await companyService.getCompanyById(cid);
  res.status(200).json({ code: 200, message: 'Company details', company });
};

const updateCompanies = async (req, res) => {
  try {
    const CompanyId = req.params.cid;
    const updatedDetails = req.body;
    const updatedCompany = await companyService.updateCompany(
      CompanyId,
      updatedDetails,
    );
    res.status(200).json({
      code: 200,
      message: 'Company updated successfully',
      data: updatedCompany,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: 'An error occurred while updating a company',
      error: error.message,
    });
  }
};

export default {
  addCOmpany,
  deleteCompany,
  viewAllCompanies,
  viewSingleCompany,
  updateCompanies,
};
