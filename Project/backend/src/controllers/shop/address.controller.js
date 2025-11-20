import expressAsyncHandler from "express-async-handler";
import AddressModel from "../../models/address.model";

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
});

export const getAddresses = expressAsyncHandler(async (req, res, next) => {});

export const getAddress = expressAsyncHandler(async (req, res, next) => {});

export const updateAddress = expressAsyncHandler(async (req, res, next) => {});

export const deleteAddress = expressAsyncHandler(async (req, res, next) => {});
