import catchAsync from "../middleware/catchAsync.js";
import { CreateAdminUserService } from "../service/Admin.Service.js";
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
