import adminModel from "../models/Admin.Model.js";
import bcrypt from "bcrypt";
import AppError from "../utils/appError.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import clearCookie from "../utils/clearCookie.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";

export const CheckEmailandPasswordService = async (data) => {
  const { email, password } = data;

  // search in the database
  const foundUser = await adminModel
    .findOne({ email })
    .select("+password +refreshToken")
    .exec();

  if (!(foundUser && bcrypt.compare(password, foundUser.password)))
    throw new AppError("Invalid Email or Password", HttpErrorCode.BadRequest);

  return foundUser;
};

export const LougoutService = async (refreshToken, request, response) => {
  const user = await adminModel
    .findOne({ refreshToken })
    .select("+refreshToken");

  // if there is no user found in the db but has jwt we will just clear the cookie and log the user out
  console.log(user);
  if (!user) {
    clearCookie(request, response);
    return response
      .status(HttpSuccessCode.Accepted)
      .send("Successfully Logged out");
  }
  return user;
};

export const HandleRefreshTokenService = async (refreshToken) => {
  const user = await adminModel
    .findOne({ refreshToken })
    .select("+refreshToken");

  // user has refreshToken but either it was already removed in the DB or refreshToken reuse
  if (!user)
    throw new AppError(
      "Request Denied - Invalid Token",
      HttpErrorCode.BadRequest
    );

  return user;
};
