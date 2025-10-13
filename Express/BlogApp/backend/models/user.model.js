//!  repeat these 4 steps for every model file

//~ 1) import mongoose module
//~ 2) define a schema by creating object of Schema class
//~ 3) create a model/collection of the schema with the help of model()
//~ 4) export the model/collection

//! 1)
import mongoose from "mongoose";

//! 2) define schema
let userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

//! 3) create a collection/model
let userModel = mongoose.model("User", userSchema);
//? users (lowercase + plural)

//! 4) EXPORT
export default userModel;
