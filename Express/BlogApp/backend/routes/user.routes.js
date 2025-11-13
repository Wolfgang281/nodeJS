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
  logout,
  updatePassword,
  updateProfile,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
  loginSchema,
  registerSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "../validators/user.validator.js";

let router = Router();

router.post("/add", validate(registerSchema), addUser);
router.get("/all", getUsers);

//! for login
router.post("/login", validate(loginSchema), login);
//~ for logout
router.post("/logout", logout);

router.delete("/:id", deleteUser);
//? localhost:9000/api/delete/123

//~ for password update
router.patch(
  "/update-password/:id",
  validate(updatePasswordSchema),
  updatePassword
);
router.patch(
  "/update-profile/:id",
  validate(updateProfileSchema),
  updateProfile
);

// router.patch("/:id", updateUser);
//? localhost:9000/api/update/123

router.get("/:id", getUser); //? ":xyz" ==> params (parameters)
//? localhost:9000/api/one/123 --> :id dynamic routes (greedy routes)

export default router;
