import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";

const desirealize = (request, response, next) => {
  const authHeader =
    request.headers.authorization || request.headers.Authorization;

  if (!authHeader?.startsWith("Bearer"))
    throw new AppError(
      "You need to be logged in to proceed in this page",
      HttpErrorCode.Unauthorized
    );

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET, (err, decoded) => {
    if (err)
      throw new AppError(
        "Token Invalid or Expired - Please sign in again",
        HttpErrorCode.BadRequest
      ); // invalid token

    response.locals.email = decoded.email;
    next();
  });
};

export default desirealize;
