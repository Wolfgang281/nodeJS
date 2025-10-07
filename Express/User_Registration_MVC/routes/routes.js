//~ 1)
import { Router } from "express";
//? const { Router } = require("express");

import { allUSers, dFP, dHP, submitForm } from "../controller/controller.js";

//~ 2)
let router = Router();

//! home page
router.get("/", dHP);

//! form page
router.get("/get-form", dFP);

router.post("/submit-form", submitForm);

router.get("/all-users", allUSers);

//~ 3)
export default router;
