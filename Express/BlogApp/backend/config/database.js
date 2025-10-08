import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect("mongodb://localhost:27017/blogAPP");
  console.log("database connected");
}

export default connectDB;

//~ here we have only defined the connection to the database along with database name
//! "mongodb://localhost:27017/blogAPP" --> blogAPP database name
