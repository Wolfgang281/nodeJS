import expressAsyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import CustomError from "../utils/CustomError.js";
import { generateToken } from "../utils/jwt.util.js";

export const addUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    /* //! generate a salt (random string)
    let salt = await bcryptjs.genSalt(10);//
    //! generate hashed Password
    let hashedPassword = await bcryptjs.hash(password, salt);
    //! save the hashed password in db */
    let newUser = await userModel.create({
      email,
      password /* : hashedPassword, */,
      name,
    });
    res
      .status(201)
      .json({ success: true, message: "User added successfully", newUser });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res) => {
  let users = await userModel.find();
  if (users.length === 0)
    return res.status(200).json({ success: false, message: "No users found" });
  res.status(200).json({
    success: true,
    noOfUsers: users.length,
    message: "users fetched",
    users,
  });
};

export const getUser = async (req, res) => {
  try {
    let userID = req.params.id; //! this id variable is defined in routes file
    let user = await userModel.findById(userID); //? user variable is holding an object, if not found then it holds null
    if (!user)
      //~ "!user" === (user==null)
      return res.status(404).json({ success: false, message: "no user found" });
    res.status(200).json({ success: true, message: "user found", user });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "something went wrong", error });
  }
};

export const updateUser = async (req, res) => {
  let userId = req.params.id;

  // let existingUser = await userModel.findById(userId);

  // if (!existingUser)
  //   return res.status(404).json({ success: false, message: "no user found" });
  // /*
  // ? let updatedData = {
  // ?  name: req.body.name,
  // ?  email: req.body.email,
  // ?  password: req.body.password,
  // ? };
  // ? let user = await userModel.updateOne({ _id: userId }, { $set: updatedData });
  // */
  // let user = await userModel.updateOne(
  //   { _id: userId }, //? filter
  //   {
  //     //? update
  //     $set: req.body,
  //   }
  // );

  //! find
  let updatedUser = await userModel.findByIdAndUpdate(userId, req.body, {
    new: true, //~ this will return the updated document
  });
  if (!updatedUser)
    return res.status(404).json({ success: false, message: "user not found" });
  res.status(200).json({ success: true, message: "updated", updatedUser });
  //! findByIdAndUpdate() will find the document first, if not found it will not do anything else document will be updated
};

export const deleteUser = async (req, res) => {
  let userId = req.params.id;

  // let deletedUser = await userModel.deleteOne({ _id: userId });
  let deletedUser = await userModel.findByIdAndDelete(userId);
  if (!deletedUser)
    return res.status(404).json({ success: false, message: "user not found" });

  res.status(200).json({
    success: true,
    message: "user deleted",
  });
};

export const login = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //~ verify the email
  let existingUser = await userModel.findOne({ email }); //? object
  if (!existingUser) {
    return res.status(401).json({
      success: false,
      message: "Email not found",
    });
  }

  //! let isMatch2 = await bcrypt.compare(password, existingUser.password);

  //~ compare the password
  let isMatch = await existingUser.comparePassword(password);
  console.log(isMatch);
  if (!isMatch) {
    // throw new CustomError("Password did not match", 401); //? implicit calling of error middleware

    //! explicit
    next(new CustomError("Password did not match", 401));
    // return res
    //   .status(401)
    //   .json({ success: false, message: "Password did not match" });
  }

  let token = generateToken(existingUser._id);
  console.log(token);

  //~ cookie("tokenName, value, {options})
  //? {maxAge: in milliseconds, httpOnly: true}
  /*  res.cookie("token", token, {
    maxAge: 1 * 60 * 60 * 1000, //! pass expiration time in milliseconds (1hr)
    httpOnly: true, //~ can only be accessed by server not by browser
  }); */

  res
    .cookie("token", token, {
      maxAge: 1 * 60 * 60 * 1000, //! pass expiration time in milliseconds (1hr)
      httpOnly: true, //~ can only be accessed by server not by browser
    })
    .status(200)
    .json({
      success: true,
      message: "User logged in successfully",
    });
});

export const logout = expressAsyncHandler(async (req, res, next) => {
  // res.clearCookie("token", "", { maxAge: 0 });
  res.clearCookie("token");
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
});
