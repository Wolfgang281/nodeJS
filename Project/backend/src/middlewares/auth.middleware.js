import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import CustomError from "../utils/CustomError.util.js";

export const authenticate = expressAsyncHandler(async (req, res, next) => {
  const token = req?.cookies?.token;
  if (!token || token === undefined)
    next(new CustomError(401, "Please login to access this route"));

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await UserModel.findById(decodedToken.id);
  if (!user) next(new CustomError(401, "Invalid Session, Please login again")); //? {_id, username, }

  req.myUser = user;
  next();
});

export const authorize = expressAsyncHandler(async (req, res, next) => {
  if (req.myUser.role === "admin") next();
  else
    next(new CustomError(403, "You are not authorized to access this route"));
});
