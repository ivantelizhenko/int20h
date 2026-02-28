export const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: 400,
      message: "Validation error",
      errors: err.errors.map((e) => e.message),
    });
  }

  // Custom HTTP errors (from http-errors)
  if (err.status) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors || null,
    });
  }

  // Fallback
  return res.status(500).json({
    status: 500,
    message: "Something went wrong",
    data: err.message,
  });
};
