import Cloudinary from '../helpers/cloudinary.helper';

async function uploadToCloudinary(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}
async function deleteFromCloudinary(publicId) {
  const image = await Cloudinary.uploader.destroy(publicId);
  return { image };
}

export default { uploadToCloudinary, deleteFromCloudinary };
