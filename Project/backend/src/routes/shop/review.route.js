import { Router } from "express";
import {
  addReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../../controllers/shop/review.controller.js";

const router = Router();

router.post("/add", addReview);
router.get("/all", getAllReviews);

router.patch("/update", updateReview);
router.delete("/delete", deleteReview);

export default router;
