const AppError = require("../config/AppError");

const globalErrorHandler = (err, req, res, next) => {
  // If the error is an instance of AppError, it was generated in the application
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // If it's an unexpected error
  console.error(err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong. Please try again later.",
  });
};
module.exports = globalErrorHandler;
