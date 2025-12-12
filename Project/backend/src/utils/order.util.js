import expressAsyncHandler from "express-async-handler";
import OrderModel from "../models/order.model.js";

export const hasUserBoughtProduct = expressAsyncHandler(
  async (userId, productId) => {
    const orders = await OrderModel.findOne({
      userId, //? check wether the order is present of the user
      orderStatus: "Delivered", //? check the status
      cartItems: { $elemMatch: { productId: productId } }, //? check wether the product is present in user's order history
    });

    // if (orders.length > 0) return true;
    // else return false;
    return !!orders;
  }
);
