import { Router } from "express";
import {
  captureOrder,
  createOrder,
} from "../../controllers/shop/order.controller.js";

const router = Router();

router.post("/create", createOrder);

router.post("/capture", captureOrder);

export default router;

// localhost:9000/api/shop/order/capture
