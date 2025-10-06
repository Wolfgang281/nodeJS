//! step --> 1
import { Router } from "express";
import {
  displayFormPage,
  displayHomePage,
  getAllUSers,
  submitForm,
} from "./controller.js";

//! step --> 2
let router = Router();

//! home page
router.get("/", displayHomePage);

//! form page
router.get("/get-form", displayFormPage);

//! submit form
router.post("/submit-form", submitForm);

//! list
router.get("/all-users", getAllUSers);

//! step --> 3
export default router;
