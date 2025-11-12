import mongoose from "mongoose";

let blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"], //! database level validation
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "at-least 10 characters are required"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", //TODO:populate()
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
//? blogs (lowercase + plural)

//! title--> string, required, trim
//! description -->
//! createdBy: TODO

//! controller -->
//! addBlog --> /add
//! getBlogs --> /all
//! getBlog --> /single/:id
//! updateBlog --> /edit/:id
//! deleteBlog --> /delete/:id

//? api version ==> /api/blogs/v1

//! working postman/ thunerclient examples (API)

//? JOI --> validation ()
