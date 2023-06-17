import express from "express";

// middleware
import validate from "../middleware/validate.js";

// utils
import { SignInValidator } from "../validation/AuthValidator.js";

// controller
import {
  HandleAuthRefresh,
  Logout,
  Signin,
  UpdateAccount,
} from "../controller/Auth.controller.js";

const router = express.Router();

router;

router.post("/signin", validate(SignInValidator), Signin);
router.get("/logout", Logout);
router.put("/updateAccount", UpdateAccount);

router.get("/refresh", HandleAuthRefresh);

export default router;
