import express from "express";

// middleware
import validate from "../middleware/validate.js";

// utils
import { createAdminValidator } from "../validation/adminValidator.js";

// controller
import {
  CreateAdmin,
  getAllAdmin,
  updateAdmin,
  changePassword,
  sendOTP,
} from "../controller/Admin.controller.js";

const router = express.Router();

router
  .route("/")
  .get(getAllAdmin)
  .post(validate(createAdminValidator), CreateAdmin)
  .put(updateAdmin)
  .delete();

export default router;

router.put("/changePassword", changePassword);
router.post("/OTP", sendOTP);
