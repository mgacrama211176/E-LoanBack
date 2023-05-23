import express from "express";
// import adminModel from "../models/Admin.Model.js";
// import bcrypt from "bcrypt";

// middleware
import validate from "../middleware/validate.js";

// utils
import { createAdminValidator } from "../validation/adminValidator.js";

// controller
import {
  CreateAdmin,
  getAllAdmin,
  updateAdmin,
} from "../controller/Admin.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllAdmin)
  .post(validate(createAdminValidator), CreateAdmin)
  .put(updateAdmin)
  .delete();

export default router;
