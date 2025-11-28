import v2 from "../config/cloudinary.config.js";

export const uploadImage = async (imageURL) => {
  const resp = await v2.uploader.upload(imageURL, {
    folder: "products",
  });

  return resp;
};
