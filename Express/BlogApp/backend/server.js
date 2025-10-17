import express from "express";

import { connectDB } from "./config/database.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

connectDB();

const app = express();

app.use(express.json()); //? used to parse json data

app.use("/api/users", userRoutes);

app.use("/api/blogs", blogRoutes);

//? "/api" --> api version

app.use(errorMiddleware); //! use the error middleware in the last after declaring all the routes

app.listen(9000, (err) => {
  if (err) console.log(err);
  console.log("server running");
});
