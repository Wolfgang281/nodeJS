import CustomError from "../utils/CustomError.util.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      new CustomError(
        400, //? status code
        `${error.details.map((ele) => ele.message)}` //? error message
      );
    }
    req.body = value;
    next();
  };
};
