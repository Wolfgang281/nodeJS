//! in every models file, follow these three steps
//~ 1) import mongoose
//~ 2) define a structure/schema [by creating an object of Schema class in mongoose]
//~ 3) create a model/collection of that schema --> with the hep of model()
//~ 4) export that model

//? 1)
// import mongoose from "mongoose";
import { Schema, model } from "mongoose";

//? 2)
let userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    //TODO: insert first doc
    timestamps: true,
  }
);

//? 3)
let userModel = model("User", userSchema); //! name should be passed as singular and should follow camel casing (users)
//! model("name of the collection", schema) -> it will convert the schema into a collection/model
//? name of the collection --> users (plural + lowercase)

//? 4)
export default userModel;
