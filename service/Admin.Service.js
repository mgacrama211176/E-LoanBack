import adminModel from "../models/Admin.Model.js";

export const CreateAdminUserService = async (data) => {
  const newUser = await adminModel.create(data);

  const removedProps = {
    email: newUser.email,
    roles: newUser.role,
  };
  return removedProps;
};

export const GetAdminUserService = async (data) => {
  const admins = await adminModel.find({});
  return admins;
};

export const UpdateAdminService = async (data) => {
  const admin = await adminModel.findOneAndUpdate(
    data.email,
    {
      $set: data,
    },
    { new: true }
  );
  return admin;
};
