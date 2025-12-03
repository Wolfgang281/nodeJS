import expressAsyncHandler from "express-async-handler";
import CartModel from "../../models/cart.model.js";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

//! add product, if already exists then update quantity
export const addToCart = expressAsyncHandler(async (req, res, next) => {
  // to add product
  const { productId } = req.body;
  // to get the user's cart
  const userId = req.myUser._id;

  // wether the product exists
  let product = await ProductModel.findById(productId);
  if (!product) next(new CustomError(404, "Product Not Found"));

  // get the user's cart if present
  let existingCart = await CartModel.findOne({ userId });
  if (!existingCart) {
    existingCart = await CartModel.create({ userId, items: [] });
  }

  // find if product is already in the cart
  let index = existingCart.items.findIndex((item) => {
    return item.productId.toString() === productId.toString();
  });

  if (index == -1) {
    existingCart.items.push({
      productId,
      quantity: 1,
      // price: product.price,
      // salePrice: product.salePrice,
      // name: product.name,
    });
  } else {
    existingCart.items[index].quantity += 1;
  }
  await existingCart.save();

  let totalAmount = 0;
  for (let item of existingCart.items) {
    totalAmount += item.quantity * item.salePrice;
  }

  new ApiResponse(
    201,
    "Product Added Successfully",
    existingCart,
    totalAmount.toFixed(2)
  ).send(res);
});

//! decrease quantity, if qty===1 then remove
export const removeFromCart = expressAsyncHandler(async (req, res, next) => {
  const { productId } = req.body;
  const userId = req.myUser._id;

  // check product exists
  const product = await ProductModel.findById(productId);
  if (!product) return next(new CustomError(404, "Product Not Found"));

  // find cart
  const existingCart = await CartModel.findOne({ userId });
  if (!existingCart) return next(new CustomError(404, "Cart Not Found"));

  // find product index
  const index = existingCart.items.findIndex(
    (item) => item.productId.toString() === productId.toString()
  );

  if (index === -1) {
    return next(new CustomError(404, "Product Not Found in Cart"));
  }

  // if quantity is 1 --> remove product entirely
  if (existingCart.items[index].quantity === 1) {
    existingCart.items.splice(index, 1);
  } else {
    existingCart.items[index].quantity -= 1;
  }

  await existingCart.save({ validateBeforeSave: false });

  // calculate total
  // const totalAmount = existingCart.items.reduce((acc, item) => {
  //   console.log(item);
  //   return acc + item.quantity * item.salePrice;
  // }, 0);

  new ApiResponse(
    201,
    "Product Removed Successfully",
    existingCart.items.length === 0 ? "No Products in Cart" : existingCart.items
    // totalAmount.toFixed(2)
  ).send(res);
});

export const clearCart = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;
  const existingCart = await CartModel.findOne({ userId });
  if (!existingCart) return next(new CustomError(404, "Cart Not Found"));

  existingCart.items = [];
  await existingCart.save({ validateBeforeSave: false });
  // this validateBeforeSave will not check for the validation against schema, it will simply save the document

  new ApiResponse(200, "Cart Cleared Successfully").send(res);
});

export const getCart = expressAsyncHandler(async (req, res, next) => {
  let userId = req.myUser._id;

  let existingCart = await CartModel.findOne({ userId }).populate({
    path: "items.productId",
    select: "name -_id price salePrice images.url brand",
  });

  // let existingCart = await CartModel.aggregate([
  //   {
  //     $lookup:{
  //       from
  //     }
  //   }
  // ])

  if (!existingCart) return next(new CustomError(404, "Cart Not Found"));

  let flatArray = existingCart.items.map((item) => ({
    name: item.productId.name,
    price: item.productId.price,
    salePrice: item.productId.salePrice,
    url: item.productId.images.url,
    brand: item.productId.brand,
    quantity: item.quantity,
  }));

  new ApiResponse(
    200,
    "Cart Fetched Successfully",
    flatArray.length === 0 ? "No Products in Cart" : flatArray
  ).send(res);
});
