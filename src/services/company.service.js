import Companies from '../database/models/company';
import Events from '../database/models/events';

async function createCompany(details) {
  const user = await Companies.create(details);
  return user;
}
async function getCompanyByName(name) {
  const user = await Companies.findOne({ where: { name } });
  return user;
}
async function getCompanyById(id) {
  const user = await Companies.findOne({
    where: { id },
    include: [
      {
        model: Events,
        as: 'Events',
      },
    ],
  });
  return user;
}
async function deleteCompany(id) {
  const user = await Companies.destroy({ where: { id } });
  return user;
}
async function getAllCompanies() {
  const user = await Companies.findAll({
    include: [
      {
        model: Events,
        as: 'Events',
      },
    ],
  });
  return user;
}
async function updateCompany(id, details) {
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      throw new Error('Company not found');
    }
    await company.update(details);
    return company;
  } catch (error) {
    throw new Error(`Error updating company: ${error.message}`);
  }
}
export default {
  createCompany,
  getCompanyByName,
  getCompanyById,
  deleteCompany,
  getAllCompanies,
  updateCompany,
};
