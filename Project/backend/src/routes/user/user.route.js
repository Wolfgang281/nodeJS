import { Router } from "express";
import {
  changePassword,
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  verifyEmail,
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

router.get("/verify-email/:emailToken", verifyEmail);
//? http://localhost:5173/api/user/verify-email/26cb6ddbf799816891ba5c7fc1ed7ff167a0e9534efca532507645d98ad81730

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
