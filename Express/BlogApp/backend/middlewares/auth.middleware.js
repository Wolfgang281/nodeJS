import CustomError from "../utils/CustomError.js";

export const authentication = (req, res, next) => {
  if (req.cookies.token) next();
  else {
    //! throw an error
    // throw new Error("User not logged in");
    // return res.status(401).json({
    //   success: false,
    //   message: "User not logged in",
    // });
    throw new CustomError("Please login first", 401);
  }
};
