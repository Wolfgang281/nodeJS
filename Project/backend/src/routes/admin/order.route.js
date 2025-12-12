import { Router } from "express";

import {
  getOrder,
  getOrders,
  updateOrderStatus,
} from "../../controllers/admin/order.controller.js";

const router = Router();

router.get("/all", getOrders);
router.get("/single/:id", getOrder);
router.patch("/edit-status/:id", updateOrderStatus);

export default router;
