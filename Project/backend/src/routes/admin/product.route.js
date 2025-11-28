import { Router } from "express";
import { addProduct } from "../../controllers/admin/product.controller.js";

import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.single("images"), addProduct);

export default router;
