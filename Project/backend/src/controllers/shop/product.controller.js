import expressAsyncHandler from "express-async-handler";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const fetchProducts = expressAsyncHandler(async (req, res, next) => {
  const {
    category = [],
    brand = [],
    sortBy,
    minPrice = 1,
    maxPrice = Number.MAX_SAFE_INTEGER,
  } = req.query;

  category = category.toLocaleLowerCase();
  brand = brand.toLocaleLowerCase();

  let filterObject = {};
  let sortObject = {};

  if (category.length > 0) {
    filterObject.category = { $in: category.split(",") };
  }
  if (brand.length > 0) {
    filterObject.brand = { $in: brand.split(",") };
  }
  if (minPrice && maxPrice) {
    filterObject.price = { $and: [{ $gte: minPrice }, { $lte: maxPrice }] };
  }

  if (sortBy == "lowToHigh") {
    sortObject.price = 1;
  }
  if (sortBy == "highToLow") {
    sortObject.price = -1;
  }
  if (sortBy == "aToZ") {
    sortObject.name = 1;
  }
  if (sortBy == "zToA") {
    sortObject.name = -1;
  }

  sortObject.createdAt = -1;

  let products = await ProductModel.find(filterObject).sort(sortObject);

  if (products.length === 0)
    return next(new CustomError(404, "No products found"));

  new ApiResponse(200, "Products Fetched Successfully", products).send(res);
});

export const fetchProduct = expressAsyncHandler(async (req, res, next) => {});

export const searchProducts = expressAsyncHandler(async (req, res, next) => {
  const keyword = req.query.keyword;
  let pattern = new RegExp(keyword, "i");

  let products = await ProductModel.find({
    $or: [
      { name: { $regex: pattern } },
      { description: { $regex: pattern } },
      { category: { $regex: pattern } },
      { brand: { $regex: pattern } },
    ],
  });

  if (products.length === 0)
    return next(new CustomError(404, "No products found"));

  new ApiResponse(200, "Products Fetched Successfully", products).send(res);
});

// https://www.amazon.in/s?k=headphones&rh=p_n_feature_two_browse-bin%3A207962822031%257C27344393031%2Cp_123%3A233043&dc&crid=2AY029FVSR2M0&qid=1764742397&rnid=91049095031&sprefix=headphone%2Caps%2C215&ref=sr_nr_p_123_3&ds=v1%3ASHryNqvHFFDenDGu7Qm0lBTDWheWY4476XgruG8sjcQ

let filterObject = {
  category: { $in: ["electronics"] },
  price: { $and: [[Object], [Object]] },
};
