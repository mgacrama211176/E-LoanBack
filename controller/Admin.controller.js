import catchAsync from "../middleware/catchAsync.js";
import {
  CreateAdminUserService,
  GetAdminUserService,
  UpdateAdminService,
  ChangePasswordService,
} from "../service/Admin.Service.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";

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
