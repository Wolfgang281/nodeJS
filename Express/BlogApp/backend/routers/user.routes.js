import { Router } from "express";
import { addUser, getUsers } from "../controllers/user.controller.js";

const router = Router();

router.post("/add", addUser);

router.get("/all", getUsers);

export default router;
