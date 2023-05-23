import adminModel from "../models/Admin.Model.js";
import bcrypt from "bcrypt";

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

export const ChangePasswordService = async (data) => {
  const { password, email } = data;
  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  const changePass = await adminModel.findOneAndUpdate(
    email,
    { $set: { password: hash } },
    { new: true }
  );
  return changePass;
};
