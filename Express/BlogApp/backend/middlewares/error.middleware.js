//! global error middleware
export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message;
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "something already used";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid id";
  }
  res.status(statusCode).json({ success: false, message, errObj: err });
};

//! use this error middleware in the last
