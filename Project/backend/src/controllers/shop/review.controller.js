import expressAsyncHandler from "express-async-handler";
import OrderModel from "../../models/order.model.js";
import ReviewModel from "../../models/review.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;

  const { productId, rating, comments } = req.body;

  let orders = await OrderModel.find(userId);
  console.log(orders);
  //   if (orders.length === 0)
  //     return next(new CustomError(404, "Place an order first"));

  let idx = 0;
  for (let order of orders) {
    idx = order.cartItems.findIndex(
      (item) => item.productId.toString() === productId.toString()
    );
  }
  if (idx === -1)
    return next(new CustomError(400, "Not eligible to add a review"));

  let newReview = await ReviewModel.create({
    userId,
    productId,
    rating,
    comments,
  });

  new ApiResponse(201, "Review added Successfully", newReview).send(res);
});

export const updateReview = expressAsyncHandler(async (req, res, next) => {});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {});

export const getAllReviews = expressAsyncHandler(async (req, res, next) => {});
