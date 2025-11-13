import CustomError from "../utils/CustomError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    let { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      console.log(error);
      next(
        new CustomError(
          `${error.details.map((ele) => {
            return ele.message;
          })}`,
          400 //? bad request
        )
      );
    }
    req.body = value;
    next();
  };
};
