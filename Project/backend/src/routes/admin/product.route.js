import { Router } from "express";
import {
  addProduct,
  uploadImage,
} from "../../controllers/admin/product.controller.js";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", authenticate, authorize, addProduct);

router.post("/image", upload.single("images"), uploadImage);

export default router;
