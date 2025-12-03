import { Router } from "express";
import {
  fetchProduct,
  fetchProducts,
  searchProducts,
} from "../../controllers/shop/product.controller.js";

const router = Router();

router.get("/all", fetchProducts);
router.get("/all/:id", fetchProduct);
router.get("/search", searchProducts);

export default router;
