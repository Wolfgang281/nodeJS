import expressAsyncHandler from "express-async-handler";
import ReviewModel from "../../models/review.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";
import { hasUserBoughtProduct } from "../../utils/order.util.js";
import { updateAverageProductReview } from "../../utils/review.util.js";

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;

  const { productId, rating, comments } = req.body;

  let eligible = await hasUserBoughtProduct(userId, productId);
  console.log(eligible);
  if (!eligible)
    return next(new CustomError(400, "Not eligible to add a review"));

  await ReviewModel.create({
    userId,
    rating,
    comments,
    productId,
  });

  await updateAverageProductReview(productId);

  new ApiResponse(201, "Review added successfully").send(res);
});

export const updateReview = expressAsyncHandler(async (req, res, next) => {
  const { productId, rating, comments, reviewId } = req.body;

  const review = await ReviewModel.findById(reviewId);

  review.rating = rating;
  review.comments = comments;

  await review.save();

  await updateAverageProductReview(productId);

  new ApiResponse(200, "Review updated Successfully").send(res);
});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {
  const { productId, reviewId } = req.body;
  await ReviewModel.findByIdAndDelete(reviewId);

  await updateAverageProductReview(productId);

  new ApiResponse(200, "Review deleted Successfully").send(res);
});

export const getAllReviews = expressAsyncHandler(async (req, res, next) => {
  let { productId } = req.body;
  let reviews = await ReviewModel.find({ productId })
    .populate({
      path: "productId",
      select: "name brand -_id",
    })
    .populate({
      path: "userId",
      select: "username -_id",
    });
  if (reviews.length === 0)
    return next(new CustomError(404, "Reviews Not Found"));

  new ApiResponse(200, "Reviews fetched successfully", reviews).send(res);
});
