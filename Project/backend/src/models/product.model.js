import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    salePrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        asset_id: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
        _id: false,
      },
    ],
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"],
      default: 5,
    },
    averageReviews: {
      type: Number,
      default: 0,
    },
    //? comments: {},
    //? slug: {}, SEO
  },
  { timestamps: true, versionKey: false }
);

//? collection/model
const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;

//! insomnia
//! requestly
