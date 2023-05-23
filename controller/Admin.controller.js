import catchAsync from "../middleware/catchAsync.js";
import {
  CreateAdminUserService,
  GetAdminUserService,
  UpdateAdminService,
} from "../service/Admin.Service.js";
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
  const updatedAdmin = await UpdateAdminService(body);
  response.status(HttpSuccessCode.Accepted).json(updatedAdmin);
};
