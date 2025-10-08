import userModel from "../models/user.model.js";
//! import the model/collection

export const addUser = async (req, res) => {
  console.log(req.body);
  let { name, email, password } = req.body;
  console.log(name, email, password);
};

export const getUsers = async (req, res) => {};

export const getUser = async (req, res) => {};

export const updateUser = async (req, res) => {};

export const deleteUser = async (req, res) => {};

//? http://localhost:9000/api/user/add
