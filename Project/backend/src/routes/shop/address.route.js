import { Router } from "express";
import { addAddress } from "../../controllers/shop/address.controller.js";

const router = Router();

router.post("/add", addAddress);

export default router;
