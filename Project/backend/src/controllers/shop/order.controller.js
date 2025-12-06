import expressAsyncHandler from "express-async-handler";
import paypal from "../../config/paypal.config.js";
import AddressModel from "../../models/address.model.js";
import CartModel from "../../models/cart.model.js";
import OrderModel from "../../models/order.model.js";
import ProductModel from "../../models/product.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const createOrder = expressAsyncHandler(async (req, res, next) => {
  const userId = req.myUser._id;
  const { cartId, addressId, paymentMethod } = req.body;

  let cart = await CartModel.findById(cartId);
  if (!cart) return next(new CustomError(404, "Cart Not Found"));

  let address = await AddressModel.findById(addressId);
  if (!address) return next(new CustomError(404, "Address Not Found"));

  if (
    cart.userId.toString() !== userId.toString() ||
    address.userId.toString() !== userId.toString()
  )
    return next(
      new CustomError(403, "You are not authorized to create this order")
    );

  let cartItems = [];
  let totalAmount = 0;

  //   cart.items.forEach(async (item) => {
  for (let item of cart.items) {
    let product = await ProductModel.findById(item.productId);

    cartItems.push({
      productId: product._id,
      name: product.name,
      image: product.images[0].url,
      price: product.salePrice,
      quantity: item.quantity,
    });

    totalAmount += item.quantity * product.salePrice;
  }
  //   });
  console.log(cartItems);
  console.log(totalAmount);

  let addressInfo = {
    addressId: address._id,
    addressLine: address.addressLine,
    city: address.city,
    state: address.state,
    pincode: address.pinCode,
    phone: address.phone,
    notes: address.notes || "",
  };

  if (paymentMethod === "Online") {
    let payment_json = {
      intent: "sale",
      payer: { payment_method: "paypal" },
      redirect_urls: {
        return_url: "",
        cancel_url: "",
      },
      transactions: [
        {
          item_list: {},
          amount: "",
          description: "",
        },
      ],
    };

    paypal.payment.create(
      {
        intent: "sale",
        payer: { payment_method: "paypal" },
        redirect_urls: {
          return_url: "http://localhost:9000/someting",
          cancel_url: "http://localhost:9000/failed",
        },
        transactions: [
          {
            item_list: {},
            amount: "",
            description: "",
          },
        ],
      },
      (err, resp) => {
        if (err) console.log(err);
        console.log(resp);
      }
    );
  } else {
    let newOrder = await OrderModel.create({
      userId,
      cartId,
      cartItems,
      addressInfo,
      paymentMethod,
      totalAmount,
    });

    new ApiResponse(201, "Order Places Successfully", newOrder).send(res);
  }
});

export const captureOrder = expressAsyncHandler(async (req, res, next) => {});
