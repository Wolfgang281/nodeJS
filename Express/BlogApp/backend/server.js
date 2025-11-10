import dotenv from "dotenv";
dotenv.config(); //? this config() will parse all the .env file variables and load them into process.env

// const dotenv = require("dotenv");
// dotenv.config();

console.log(process.env);

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { connectDB } from "./config/database.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

import blogRoutes from "./routes/blog.routes.js";
import userRoutes from "./routes/user.routes.js";

connectDB();

const app = express();

//~ FE with BE --> CORS
app.use(
  cors({
    origin: ["http://localhost:5173"], //~ defines the origin, only this origin is allowed
    credentials: true, //~ credentials --> send cookies
    methods: ["GET", "POST", "PATCH", "DELETE"], //~ allowed methods
  })
);
app.use(cookieParser());
app.use(express.json()); //? used to parse json data

app.use("/api/users", userRoutes);

app.use("/api/blogs", blogRoutes);

//? "/api" --> api version

app.use(errorMiddleware); //! use the error middleware in the last after declaring all the routes

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log("server running at", process.env.PORT);
});

//! cookie-parser --> used to manage cookies, import the module and simply use it in the middleware

//? CORS --> cross origin resource sharing (cors)
//~ authentication --> the process of checking if the user is logged in or not (token is present or not)
//~ authorization --> the process of checking if the user has the permission to access the resource
