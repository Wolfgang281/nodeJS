import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },

    cartItems: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: {
          type: String,
          required: true,
          trim: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    addressInfo: {
      addressId: {
        type: Schema.Types.ObjectId,
        ref: "Address",
        required: true,
      },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      phone: { type: String, required: true },
      notes: { type: String, default: "" },
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Placed",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentId: { type: String, default: null },
    payerId: { type: String, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
