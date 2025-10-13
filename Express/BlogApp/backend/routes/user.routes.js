//! 1) destructure Router from express
//! 2) call the top level function
//! 3) export it

import { Router } from "express";
import { addUser, getUser, getUsers } from "../controllers/user.controller.js";

let router = Router();

router.post("/add", addUser);
router.get("/all", getUsers);

router.get("/one/:id", getUser); //? ":xyz" ==> params (parameters)

export default router;
