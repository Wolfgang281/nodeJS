import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(5).max(50).required(),
  email: Joi.string().min(5).max(50).required().email(),
  password: Joi.string().min(5).max(50).required(),
  contactNumber: Joi.string()
    .length(10)
    .required()
    .pattern(/^[6-9]\d{9}$/)
    .message("Invalid Mobile Number"),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(5).max(50).required().email(),
  password: Joi.string().min(5).max(50).required(),
});

export const updateProfileSchema = Joi.object({
  username: Joi.string().min(5).max(50).optional(),
  email: Joi.string().min(5).max(50).optional().email(),
  contactNumber: Joi.string()
    .length(10)
    .optional()
    .pattern(/^[6-9]\d{9}$/)
    .message("Invalid Mobile Number"),
});

export const updatePasswordSchema = Joi.object({
  password: Joi.string().min(5).max(50).required(),
});

export const resendEmailVerificationLinkSchema = Joi.object({
  email: Joi.string().min(5).max(50).required().email(),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().min(5).max(50).required().email(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(5).max(50).required(),
});
