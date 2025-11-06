import blogModel from "../models/blog.model.js";
import { asyncHandler } from "../utils/catchAsync.util.js";

export const addBlog = asyncHandler(async (req, res) => {
  // try {
  const { title, description } = req.body;
  let newBlog = await blogModel.create({ title, description });
  res.status(201).json({
    success: true,
    message: "blog added",
    newBlog,
  });
  // } catch (error) {
  //   /* if (error.name === "ValidationError") {
  //     res
  //       .status(400) //? 400 --> bad request
  //       .json({ success: false, message: "all inputs are required" });
  //   }
  //   if (error.code === 11000) {
  //     res
  //       .status(409) //? 409 --> conflict
  //       .json({ success: false, message: "blog already exists" });
  //   }
  // } */
  //   next(error); //! from here --> error middleware will be called/invoked
  // }
});

export const getBlogs = async (req, res, next) => {
  try {
    let blogs = await blogModel.find();
    if (blogs.length === 0)
      return res
        .status(200)
        .json({ success: false, message: "no blogs found" });

    res.status(200).json({
      success: true,
      message: "all blogs fetched",
      blogs,
    });
  } catch (error) {
    next(error);
  }
};
export const getBlog = async (req, res) => {
  let blogId = req.params.id;
  let blog = await blogModel.findById(blogId);
  if (!blog)
    return res.status(404).json({ success: false, message: "blog not found" });
  res.status(200).json({ success: true, message: "blog found", blog });
};

export const updateBlog = async (req, res) => {};
export const deleteBlog = async (req, res) => {};

//! express-async-handler --> function wrapper only works for async functions and after using this no need to write try-catch block because error object will be passed on to global error middleware automatically

//? login --> token (server) --> send this token to client (browser : localStorage, cookies)
//? add, delete, create --> req + token --> on server side check for token --> if not found --> return error message to client
//? add, delete, create --> req + token --> on server side check for token --> if found --> check role(authorization) --> if not authorized --> return error message to client

//~ token generation
//! login --> check for email --> if registered --> check for password --> if correct --> generate token (jwt: generate a token based on some user's data: payload (_id)) --> send token to client in encrypted form
