import expressAsyncHandler from "express-async-handler";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import {
  deleteUploadedImage,
  uploadImage,
} from "../../utils/cloudinary.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const getURL = (bufferValue, mimetype) => {
  const b64 = bufferValue.toString("base64");
  const imageURL = `data:${mimetype};base64,${b64}`;
  return imageURL;
};

export const updateImage = expressAsyncHandler(async (req, res, next) => {
  const { public_id, productId } = req.body;

  const bufferValue = req?.file?.buffer;
  const imageURL = getURL(bufferValue, req?.file?.mimetype);

  let existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) next(new CustomError(404, "Product Not Found"));

  const resp = await deleteUploadedImage(public_id);

  if (resp.result !== "ok") return next(new CustomError(500, resp.result));

  const uploadedResp = await uploadImage(imageURL);
  let updatedImages = [
    {
      public_id: uploadedResp.public_id,
      url: uploadedResp.secure_url,
      asset_id: uploadedResp.asset_id,
    },
  ];
  existingProduct.images = updatedImages;
  await existingProduct.save();

  new ApiResponse(200, "Image Updated Successfully").send(res);
});

export const deleteImage = expressAsyncHandler(async (req, res, next) => {
  const { public_id, productId } = req.body;

  let existingProduct = await ProductModel.findById(productId);
  if (!existingProduct) next(new CustomError(404, "Product Not Found"));

  const resp = await deleteUploadedImage(public_id);

  if (resp.result === "ok") {
    existingProduct.images = [];
    await existingProduct.save();
  } else {
    return next(new CustomError(500, resp.result));
  }

  new ApiResponse(200, "Image Deleted Successfully", resp).send(res);
});

export const addProduct = expressAsyncHandler(async (req, res, next) => {
  const bufferValue = req?.file?.buffer;
  const imageURL = getURL(bufferValue, req.file.mimetype);

  const uploadedImage = await uploadImage(imageURL);
  console.log(uploadedImage);

  let imgArr = [
    {
      url: uploadedImage.secure_url,
      public_id: uploadedImage.public_id,
      asset_id: uploadedImage.asset_id,
    },
  ];

  const { name, stock, price, description, category, salePrice, brand } =
    req.body;

  const newProduct = await ProductModel.create({
    name,
    stock,
    price,
    description,
    category,
    salePrice,
    brand,
    images: imgArr,
  });

  new ApiResponse(201, "Product Added Successfully", newProduct).send(res);
});

export const getProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await ProductModel.find();
  if (products.length === 0) next(new CustomError(404, "No Products Found"));
  new ApiResponse(200, "Products Fetched Successfully", products).send(res);
});

export const getProduct = expressAsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const product = await ProductModel.findById(productId);
  if (!product) next(new CustomError(404, "Product Not Found"));
  new ApiResponse(200, "Product Fetched Successfully", product).send(res);
});

//! excluding images
export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    req.body,
    {
      new: true, //? it returns the updated document,
      runValidators: true, //? validate the updated document against the schema
    }
  );

  if (!updatedProduct) next(new CustomError(404, "Product Not Found"));
  new ApiResponse(200, "Product Updated Successfully", updatedProduct).send(
    res
  );
});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const deletedProduct = await ProductModel.findByIdAndDelete(productId);
  if (!deletedProduct) next(new CustomError(404, "Product Not Found"));

  for (let image of deletedProduct.images) {
    await deleteUploadedImage(image.public_id);
  }

  new ApiResponse(200, "Product Deleted Successfully", deletedProduct).send(
    res
  );
});
