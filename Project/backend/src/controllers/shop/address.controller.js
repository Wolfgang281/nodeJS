import expressAsyncHandler from "express-async-handler";
import AddressModel from "../../models/address.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";

export const addAddress = expressAsyncHandler(async (req, res) => {
  const { addressLine, city, state, pinCode, phone, notes } = req.body;
  AddressModel.create({
    addressLine,
    city,
    state,
    pinCode,
    phone,
    notes,
    userId: req.myUser._id,
  });

  new ApiResponse(201, "Address Added Successfully").send(res);
});

export const getAddresses = expressAsyncHandler(async (req, res, next) => {});

export const getAddress = expressAsyncHandler(async (req, res, next) => {});

export const updateAddress = expressAsyncHandler(async (req, res, next) => {});

export const deleteAddress = expressAsyncHandler(async (req, res, next) => {});
