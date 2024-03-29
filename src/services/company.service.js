import Companies from '../database/models/company';

async function createCompany(details) {
  const user = await Companies.create(details);
  return user;
}
async function getCompanyByName(name) {
  const user = await Companies.findOne({ where: { name } });
  return user;
}
async function getCompanyById(id) {
  const user = await Companies.findOne({ where: { id } });
  return user;
}
export default { createCompany, getCompanyByName, getCompanyById };
