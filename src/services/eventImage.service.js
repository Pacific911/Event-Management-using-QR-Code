import { extractPublicId } from 'cloudinary-build-url';
import EventImages from '../database/models/eventimages';
import Cloudinary from '../helpers/cloudinary.helper';
import uploadToCloudinaryService from './cloudinary.service';

async function addImage(body) {
  const result = await EventImages.create(body);
  return result;
}
async function deleteImage(id) {
  const image = await EventImages.findOne({ where: { id } });
  await EventImages.destroy({ where: { id } });
  const publice = extractPublicId(image.url);
  const data = await Cloudinary.uploader.destroy(publice);
  return { data };
}
async function deleteUrl(url) {
  const publice = extractPublicId(url);
  const result = await uploadToCloudinaryService.deleteFromCloudinary(publice);
  return result;
}

export default { addImage, deleteImage, deleteUrl };
