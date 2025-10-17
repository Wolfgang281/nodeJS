import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getBlog,
  getBlogs,
  updateBlog,
} from "../controllers/blog.controller.js";

const router = Router();

router.post("/add", addBlog);
router.get("/all", getBlogs);

router.get("/one/:id", getBlog);
router.patch("/edit/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

export default router;
