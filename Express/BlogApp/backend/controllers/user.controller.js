import userModel from "../models/user.model.js";

export const addUser = async (req, res) => {
  const { email, password, name } = req.body;
  let newUser = await userModel.create({ email, password, name });
  res
    .status(201)
    .json({ success: true, message: "User added successfully", newUser });
};

export const getUsers = async (req, res) => {
  let users = await userModel.find();
  res.status(200).json({ success: true, message: "users fetched", users });
};

export const getUser = async (req, res) => {
  console.log(req.params);
  let userID = req.params.id; //! this id variable is defined in routes file
  let user = await userModel.findOne({ _id: userID });
  res.status(200).json({ success: true, message: "user found", user });
};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};
