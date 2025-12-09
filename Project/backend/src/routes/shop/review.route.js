import { Router } from "express";
import {
  addReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../../controllers/shop/review.controller.js";

const router = Router();

router.post("/add", addReview);
router.post("/all", getAllReviews);

router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
