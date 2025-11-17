import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

import userRoutes from "./src/routes/user/user.route.js";

const app = express();

app.use(express.json()); //? to handle json data
app.use(express.urlencoded({ extended: true })); //? to handle form data

app.use("/api/user", userRoutes);

app.use(errorMiddleware);

export default app;
