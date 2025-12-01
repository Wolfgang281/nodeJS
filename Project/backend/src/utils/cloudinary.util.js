import v2 from "../config/cloudinary.config.js";
import CustomError from "./CustomError.util.js";

export const uploadImage = async (imageURL) => {
  try {
    const resp = await v2.uploader.upload(imageURL, {
      folder: "products",
    });

    return resp;
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};

export const deleteUploadedImage = async (publicId) => {
  console.log(publicId);
  try {
    const resp = await v2.uploader.destroy(publicId);
    console.log(resp);
    return resp;
  } catch (error) {
    throw new CustomError(500, error.message);
  }
};
