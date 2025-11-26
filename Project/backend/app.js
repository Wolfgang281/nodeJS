import dotenv from "dotenv";
dotenv.config({ quiet: true });

import cookieParser from "cookie-parser";
import express from "express";

import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { seedAdmin } from "./src/seed/admin.seed.js";

import productRoutes from "./src/routes/admin/product.route.js";
import userRoutes from "./src/routes/user/user.route.js";

const app = express();

if (process.argv[2] === "seed") {
  seedAdmin();
}

app.use(cookieParser());
app.use(express.json()); //? to handle json data
app.use(express.urlencoded({ extended: true })); //? to handle form data

app.use("/api/user", userRoutes);
app.use("/api/admin/product", productRoutes);

app.use(errorMiddleware);

export default app;
