import mongoose from "mongoose";

export const connectDB = async () => {
  let client = await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Database connected to ${client.connection.host}`);
};
