import catchAsync from "../middleware/catchAsync.js";
import {
  CreateAdminUserService,
  GetAdminUserService,
  UpdateAdminService,
  ChangePasswordService,
} from "../service/Admin.Service.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import { Vonage } from "@vonage/server-sdk";

//SENDING OTP
export const sendOTP = catchAsync(async (request, response, next) => {
  const randomNumber = Math.floor(Math.random() * 900000) + 100000;
  const vonage = new Vonage({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_SECRET_KEY,
  });

  const from = "E-Loan";
  const to = "639151091814";
  const text = `This is an automatic OTP generation OTP: ${randomNumber}`;

  async function sendSMS() {
    await vonage.sms
      .send({ to, from, text })
      .then((resp) => {
        console.log("Message sent successfully");
        console.log(resp);
      })
      .catch((err) => {
        console.log("There was an error sending the messages.");
        console.error(err);
      });
  }
  response.status(HttpSuccessCode.OK).json({ message: "OTP has been sent!" });
  sendSMS();
});

// create low level admin user
export const CreateAdmin = catchAsync(async (request, response, next) => {
  const { body } = request;

  const newAdminUser = await CreateAdminUserService(body);

  return response.status(HttpSuccessCode.Accepted).json({
    status: "success",
    data: newAdminUser,
  });
});

export const getAllAdmin = async (request, response, next) => {
  const { body } = request;
  const GetAdmin = await GetAdminUserService(body);
  response.status(HttpSuccessCode.OK).json(GetAdmin);
};

export const updateAdmin = async (request, response, next) => {
  const { body } = request;
  try {
    const updatedAdmin = await UpdateAdminService(body);
    response.status(HttpSuccessCode.Accepted).json(updatedAdmin);
  } catch (err) {
    response.status(HttpErrorCode.BadRequest);
  }
};

export const changePassword = async (request, response, next) => {
  const { body } = request;
  const changePassAdmin = await ChangePasswordService(body);
  response.status(HttpSuccessCode.Accepted).json(changePassAdmin);
};
