import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ProductModel from "../models/product.model.js";
import ReviewModel from "../models/review.model.js";

export const updateAverageProductReview = expressAsyncHandler(
  async (productId) => {
    const result = await ReviewModel.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    const average = result.length > 0 ? result[0].averageRating.toFixed(2) : 0;
    console.log(average);

    const res = await ProductModel.findByIdAndUpdate(productId, {
      averageReviews: average,
    });

    console.log(res);
  }
);

updateAverageProductReview("6931221ac0f94464bce18e72");
