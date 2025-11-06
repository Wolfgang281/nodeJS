//! 1) destructure Router from express
//! 2) call the top level function
//! 3) export it

import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  updateUser,
} from "../controllers/user.controller.js";

let router = Router();

router.post("/add", addUser);
router.get("/all", getUsers);

//! for login
router.post("/login", login);

router.delete("/:id", deleteUser);
//? localhost:9000/api/delete/123

router.patch("/:id", updateUser);
//? localhost:9000/api/update/123

router.get("/:id", getUser); //? ":xyz" ==> params (parameters)
//? localhost:9000/api/one/123 --> :id dynamic routes (greedy routes)

export default router;
