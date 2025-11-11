import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";

export const authentication = async (req, res, next) => {
  let token = req?.cookies?.token; //? (optional chaining)
  if (!token) {
    next(new CustomError("PLease login first", 401));
    // return res
    //   .status(401)
    //   .json({ success: false, message: "Please login first" });
  }
  let decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  //! { id: '69118557f65020643504c2fb', iat: 1762838290, exp: 1762924690 }
  let user = await userModel.findById(decodedToken.id);
  req.myUser = user;
  next();
};
