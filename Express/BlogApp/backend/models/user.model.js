//!  repeat these 4 steps for every model file

//~ 1) import mongoose module
//~ 2) define a schema by creating object of Schema class
//~ 3) create a model/collection of the schema with the help of model()
//~ 4) export the model/collection

//! 1)
import bcryptjs from "bcryptjs";
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

//! pre hook which is provided by mongoose --> middleware
//~! this salt hashing technique is one way encryption
//~ it will run before saving or creating the document
userSchema.pre("save", async function (next) {
  //! if()
  let salt = await bcryptjs.genSalt(10); //? salt generation
  //? req.body ==> object {email:"", password:"abc", phoneNo:""}
  let hashedPassword = await bcryptjs.hash(this.password, salt); //~ this will point to req.body
  this.password = hashedPassword;
  next();
});

//? schemaName.methods.functionName = function () {};
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};
//! 3) create a collection/model
let userModel = mongoose.model("User", userSchema);

//? users (lowercase + plural)

//! 4) EXPORT
export default userModel;
