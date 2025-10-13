import express from "express";

import { connectDB } from "./config/database.js";

import userRoutes from "./routes/user.routes.js";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", userRoutes);
//? "/api" --> api version

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running");
});
