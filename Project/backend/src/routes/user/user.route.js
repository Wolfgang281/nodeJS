import { Router } from "express";
import { registerUser } from "../../controllers/user/user.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { registerSchema } from "../../validators/user.validator.js";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);

export default router;
