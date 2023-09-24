import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  //apart from our custom errors, generally js error class do have message value
  const message = err.message || "Something went Wrong";
  res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
