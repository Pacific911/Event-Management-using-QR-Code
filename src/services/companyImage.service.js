import { extractPublicId } from 'cloudinary-build-url';
import CompanyImages from '../database/models/companyImages';
import uploadToCloudinaryService from './cloudinary.service';

async function addImage(body) {
  const result = await CompanyImages.create(body);
  return result;
}
async function deleteUrl(url) {
  const publice = extractPublicId(url);
  const result = await uploadToCloudinaryService.deleteFromCloudinary(publice);
  return result;
}

export default { addImage, deleteUrl };
