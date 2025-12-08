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
        return_url: "http://localhost:9000/api/shop/order/capture",
        // http://localhost:9000/api/shop/order/capture?paymentId=PAYID-NE3GXRI06V44033Y23791710&token=EC-6XN280338C726660G&PayerID=HTA7B9RLNHGGW
        cancel_url: "http://localhost:5173/cancel",
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map((item) => {
              return {
                name: item.name,
                sku: item.productId,
                //? sku --> stock keeping unit (unique id for product to track inventory in paypal)
                currency: "USD",
                quantity: item.quantity,
                price: item.price.toFixed(2),
              };
            }),
          },
          amount: {
            currency: "USD",
            total: totalAmount.toFixed(2),
          },
          description: "Order Payment",
        },
      ],
    };

    paypal.payment.create(payment_json, async (err, resp) => {
      if (err) console.log(err);
      console.log(resp);
      let approvalUrl = resp.links.filter(
        (link) => link.rel == "approval_url"
      )[0].href;

      let newOrder = await OrderModel.create({
        userId,
        cartId,
        cartItems,
        addressInfo,
        paymentMethod,
        totalAmount,
        paymentId: resp.id,
      });

      new ApiResponse(201, "Order Created Successfully", approvalUrl).send(res);
    });
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

export const captureOrder = expressAsyncHandler(async (req, res, next) => {
  const { paymentId, PayerID } = req.query;

  paypal.payment.execute(
    paymentId,
    { payer_id: PayerID },
    async (err, resp) => {
      if (err) console.log(err);
      // console.log(resp);
      let order = await OrderModel.findOne({ paymentId });
      if (resp.state === "approved") {
        order.paymentStatus = "Paid";
        order.payerId = PayerID;
        await order.save();
        new ApiResponse(200, "Payment Captured Successfully", resp).send(res);
      } else if (resp.state == "Paid") {
        return next(new CustomError(400, "Payment already captured"));
      } else {
        order.paymentStatus = "Cancelled";
        order.payerId = PayerID;
        await order.save();
        return next(
          new CustomError(
            400,
            "Payment not successful, if amount was deducted it will be refunded in 5-7 working days"
          )
        );
      }
    }
  );
});

export const getOrders = expressAsyncHandler(async (req, res, next) => {});

export const getOrder = expressAsyncHandler(async (req, res, next) => {});

//TODO: cancelOrder, refundOrder, returnOrder
export const cancelOrder = expressAsyncHandler(async (req, res, next) => {});

export const refundOrder = expressAsyncHandler(async (req, res, next) => {});

export const returnOrder = expressAsyncHandler(async (req, res, next) => {});
