const errorHandler = (err, req, res, next) => {
  console.error("Error Middleware: ==============> ", err);

  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json({
    success: false,
    status,
    message,
  });
};
export default errorHandler;
