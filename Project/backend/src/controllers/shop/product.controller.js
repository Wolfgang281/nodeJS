import expressAsyncHandler from "express-async-handler";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const fetchProducts = expressAsyncHandler(async (req, res, next) => {
  const { category = [], brand = [] } = req.query;

  let filterObject = {};

  if (category.length > 0) {
    filterObject.category = { $in: category.split(",") };
  }
  if (brand.length > 0) {
    filterObject.brand = { $in: brand.split(",") };
  }

  let products = await ProductModel.find(filterObject);

  if (products.length === 0)
    return next(new CustomError(404, "No products found"));

  new ApiResponse(200, "Products Fetched Successfully", products).send(res);
});

export const fetchProduct = expressAsyncHandler(async (req, res, next) => {});

export const searchProducts = expressAsyncHandler(async (req, res, next) => {});

// https://www.amazon.in/s?k=headphones&rh=p_n_feature_two_browse-bin%3A207962822031%257C27344393031%2Cp_123%3A233043&dc&crid=2AY029FVSR2M0&qid=1764742397&rnid=91049095031&sprefix=headphone%2Caps%2C215&ref=sr_nr_p_123_3&ds=v1%3ASHryNqvHFFDenDGu7Qm0lBTDWheWY4476XgruG8sjcQ
