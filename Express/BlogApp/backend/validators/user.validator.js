import Joi from "joi";

//! for JOI --> define structure
export let registerSchema = Joi.object({
  email: Joi.string().email().min(5).max(50).required(),
  password: Joi.string().min(5).max(50).required(),
  name: Joi.string().min(3).max(50).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
  password: Joi.string()
    .min(5)
    .max(50)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/
    )
    .message(
      "Password must be strong and include uppercase, lowercase, number, and special character"
    ),
});

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().min(5).max(50).optional(),
});

//!1)  define a JOI schema/structure
//!2)  define one function validate() which will take one parameter, schema
//!3)  inject this middleware in the router and pass the schema as an argument
