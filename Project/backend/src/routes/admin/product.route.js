import { Router } from "express";
import {
  addProduct,
  deleteImage,
  deleteProduct,
  getProduct,
  getProducts,
  updateImage,
  updateProduct,
} from "../../controllers/admin/product.controller.js";

import upload from "../../middlewares/multer.middleware.js";

const router = Router();

router.post("/add", upload.single("images"), addProduct);
router.patch("/delete-image", deleteImage);
router.patch("/update-image", upload.single("images"), updateImage);

router.get("/all", getProducts);
router.get("/:productId", getProduct);
router.patch("/:productId", updateProduct);
router.patch("/:productId", deleteProduct);

export default router;
