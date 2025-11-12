import Joi from "joi";

//! for JOI --> define structure
export let registerSchema = Joi.object({
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
  name: Joi.string().min(3).max(50).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
});
