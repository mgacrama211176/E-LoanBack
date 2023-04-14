import adminModel from "../models/Admin.Model.js";

export const CreateAdminUserService = async (data) => {
  const newUser = await adminModel.create(data);

  const removedProps = {
    email: newUser.email,
    roles: newUser.role,
  };

  return removedProps;
};
