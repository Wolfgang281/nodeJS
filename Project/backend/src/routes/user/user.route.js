import { Router } from "express";
import {
  changePassword,
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
} from "../../controllers/user/user.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
  updatePasswordSchema,
  updateProfileSchema,
} from "../../validators/user.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", authenticate, logoutUser);

router.patch(
  "/update-profile",
  validate(updateProfileSchema),
  authenticate,
  updateProfile
);

router.patch(
  "/update-password",
  validate(updatePasswordSchema),
  authenticate,
  changePassword
);

//~ this is for frontend protected routes
router.get("/current", authenticate, currentUser);

export default router;
