import expressAsyncHandler from "express-async-handler";
import OrderModel from "../../models/order.model.js";
import ProductModel from "../../models/product.model.js";
import ReviewModel from "../../models/review.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const addReview = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;

  const { productId, rating, comments } = req.body;
  //? check wether the productId is present in user's order history --> and also status "delivered"

  let orders = await OrderModel.find({ userId });
  if (orders.length === 0)
    return next(new CustomError(404, "Orders Not Found"));

  let isPresent = false;

  for (let singleOrder of orders) {
    for (let item of singleOrder.cartItems) {
      if (
        item.productId.toString() === productId.toString() &&
        singleOrder.orderStatus === "Delivered"
      ) {
        isPresent = true;
        break;
      }
    }
  }

  if (isPresent === false)
    return next(new CustomError(400, "You are not eligible to give review"));

  let newReview = await ReviewModel.create({
    userId,
    productId,
    rating,
    comments,
  });

  //! find all reviews
  let reviews = await ReviewModel.find({ productId });
  //? totalSUm/total number

  let totalReviews = reviews.length;

  let totalSum = reviews.reduce((acc, curr) => acc + curr.rating, 0);

  let avgReview = (totalSum / totalReviews).toFixed(2);

  await ProductModel.findByIdAndUpdate(productId, {
    averageReviews: avgReview,
  });

  new ApiResponse(201, "Review added successfully", newReview).send(res);
});

export const updateReview = expressAsyncHandler(async (req, res, next) => {
  const { productId, rating, comments, reviewId } = req.body;

  const review = await ReviewModel.findById(reviewId);

  review.rating = rating;
  review.comments = comments;

  await review.save();

  //! avg review of that product
  let reviews = await ReviewModel.find({ productId });
  //? totalSUm/total number

  let totalReviews = reviews.length;

  let totalSum = reviews.reduce((acc, curr) => acc + curr.rating, 0);

  let avgReview = (totalSum / totalReviews).toFixed(2);

  await ProductModel.findByIdAndUpdate(productId, {
    averageReviews: avgReview,
  });

  new ApiResponse(200, "Review updated Successfully").send(res);
});

export const deleteReview = expressAsyncHandler(async (req, res, next) => {
  const { productId, reviewId } = req.body;
  await ReviewModel.findByIdAndDelete(reviewId);

  //! avg review of that product
  let reviews = await ReviewModel.find({ productId });
  //? totalSUm/total number

  let totalReviews = reviews.length;

  let totalSum = reviews.reduce((acc, curr) => acc + curr.rating, 0);

  let avgReview = (totalSum / totalReviews).toFixed(2);

  await ProductModel.findByIdAndUpdate(productId, {
    averageReviews: avgReview,
  });

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
