import expressAsyncHandler from "express-async-handler";
import UserModel from "../../models/user.model.js";
import ApiResponse from "../../utils/ApiResponse.util.js";
import CustomError from "../../utils/CustomError.util.js";

export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { username, email, password, contactNumber } = req.body;

  const newUser = await UserModel.create({
    username,
    email,
    password,
    contactNumber,
  });

  //   res
  //     .status(201)
  //     .json({ success: true, message: "User Registered Successfully", newUser });

  new ApiResponse(201, "User Registered Successfully", newUser).send(res);
});

export const loginUser = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser = await UserModel.findOne({ email });
  if (!existingUser) next(new CustomError(400, "Email Not Found!!!"));

  let matchPassword = await existingUser.comparePassword(password);
  if (!matchPassword) {
    // throw new CustomError(401, "Password Not Matched");
    next(new CustomError(401, "Password Not Matched"));
  }

  new ApiResponse("200", "User Logged In Successfully").send(res);
});

export const logoutUser = expressAsyncHandler(async (req, res, next) => {});

export const currentUser = expressAsyncHandler(async (req, res, next) => {});

export const updateProfile = expressAsyncHandler(async (req, res, next) => {});

export const changePassword = expressAsyncHandler(async (req, res, next) => {});

export const forgotPassword = expressAsyncHandler(async (req, res, next) => {});

export const resetPassword = expressAsyncHandler(async (req, res, next) => {});

//! login, logout -> (token generation), authenticate middleware
