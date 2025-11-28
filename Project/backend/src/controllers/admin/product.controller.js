import expressAsyncHandler from "express-async-handler";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import { uploadImage } from "../../utils/cloudinary.util.js";

export const getURL = (bufferValue, mimetype) => {
  const b64 = bufferValue.toString("base64");
  const imageURL = `data:${mimetype};base64,${b64}`;
  return imageURL;
};

export const updateImage = expressAsyncHandler(async (req, res, next) => {});

export const deleteImage = expressAsyncHandler(async (req, res, next) => {});

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

export const getProducts = expressAsyncHandler(async (req, res, next) => {});

export const getProduct = expressAsyncHandler(async (req, res, next) => {});

export const updateProduct = expressAsyncHandler(async (req, res, next) => {});

export const deleteProduct = expressAsyncHandler(async (req, res, next) => {});

let rep = {
  asset_id: "323f67d633a4de64aa2724a065561984",
  public_id: "products/uzqbe2q36k1p5j6j47yc",
  version: 1764311536,
  version_id: "dd18201d2c7168028e046493d09daa51",
  signature: "933195d62fe3a744b1ec97910df68e2fbbc00597",
  width: 261,
  height: 148,
  format: "jpg",
  resource_type: "image",
  created_at: "2025-11-28T06:32:16Z",
  tags: [],
  bytes: 3367,
  type: "upload",
  etag: "b33b1e9809221203ab1cff073c059678",
  placeholder: false,
  url: "http://res.cloudinary.com/dynuatcqe/image/upload/v1764311536/products/uzqbe2q36k1p5j6j47yc.jpg",
  secure_url:
    "https://res.cloudinary.com/dynuatcqe/image/upload/v1764311536/products/uzqbe2q36k1p5j6j47yc.jpg",
  asset_folder: "products",
  display_name: "uzqbe2q36k1p5j6j47yc",
  api_key: "334918679458119",
};
