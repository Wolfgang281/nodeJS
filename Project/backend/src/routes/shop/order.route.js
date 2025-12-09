import { Router } from "express";
import {
  captureOrder,
  createOrder,
  getOrders,
} from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/create", createOrder);

router.post("/capture", captureOrder);

router.get("/all", getOrders);

export default router;

// localhost:9000/api/shop/order/capture
