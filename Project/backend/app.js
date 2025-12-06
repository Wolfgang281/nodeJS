import dotenv from "dotenv";
dotenv.config({ quiet: true });

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { seedAdmin } from "./src/seed/admin.seed.js";

import { authenticate, authorize } from "./src/middlewares/auth.middleware.js";

import productRoutes from "./src/routes/admin/product.route.js";
import shopAddressRoutes from "./src/routes/shop/address.route.js";
import cartRoutes from "./src/routes/shop/cart.route.js";
import shopOrderRoutes from "./src/routes/shop/order.route.js";
import shopProductRoutes from "./src/routes/shop/product.route.js";
import userRoutes from "./src/routes/user/user.route.js";

const app = express();

if (process.argv[2] === "seed") {
  seedAdmin();
}

app.use(
  cors({
    origin: ["http://localhost:5173", ""],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"], // CSRF
  })
);
app.use(cookieParser());
app.use(express.json()); //? to handle json data
app.use(express.urlencoded({ extended: true })); //? to handle form data

app.use("/api/user", userRoutes);
app.use("/api/admin/product", authenticate, authorize, productRoutes);
app.use("/api/shop/cart", authenticate, cartRoutes);
app.use("/api/shop/product", shopProductRoutes);
app.use("/api/shop/order", authenticate, shopOrderRoutes);
app.use("/api/shop/address", authenticate, shopAddressRoutes);

app.use(errorMiddleware);

export default app;

//! CORS --> cross origin resource sharing
