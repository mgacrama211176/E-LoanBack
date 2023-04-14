// const { TokenExpiredError } = 'jsonwebtoken';
import AppError from "../utils/appError.js";
import logger from "../utils/logger.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";

const sendErrorDev = (error, response) => {
  response.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
    data: error.data,
  });
};

const sendErrorProd = (error, response) => {
  if (error.isOperational) {
    return response.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      data: error.data,
    });
  }

  logger.error(error);
  return response.status(HttpErrorCode.InternalServerError).json({
    status: "error",
    message: "Something went wrong!",
  });
};

const handleJWTError = () => {
  return new AppError(
    "Invalid token. Please sign in again.",
    HttpErrorCode.Unauthorized
  );
};

const handleJWTExpiredError = (error) => {
  const { tokenType } = error;

  const errorCode =
    tokenType === "access"
      ? HttpErrorCode.Unauthorized
      : HttpErrorCode.Forbidden;

  return new AppError("Token expired. Please sign in again.", errorCode);
};

const errorController = (error, _, response, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  const nodeEnvironment = process.env.NODE_ENV.trim();
  const isProd = nodeEnvironment === "production";

  if (isProd) return sendErrorDev(error, response);

  let modifiedError = error;

  if (error.name === "JsonWebTokenError") modifiedError = handleJWTError();

  if (error.name === "TokenExpiredError")
    modifiedError = handleJWTExpiredError(error);

  sendErrorProd(modifiedError, response);
};

export default errorController;
