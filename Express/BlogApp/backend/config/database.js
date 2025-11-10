import mongoose from "mongoose";

export async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  //? 127.0.0.1 this or localhost
  console.log("database connected");
}

// ? mongodb://localhost:27017/blogApp --> "blogApp" is database name
