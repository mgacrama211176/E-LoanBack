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
} from "../controller/Auth.controller.js";

const router = express.Router();

//   //manually adding admin on mongo

//   //bcrypt encrypts the data specially password to hide the password
//   const hashPassword = await bcrypt.hash(request.body.password, 10);
//   const username = request.body.username;
//   const password = hashPassword;

//   try {
//     const administrator = new adminModel({
//       username: username,
//       password: password,
//     });
//     await administrator.save();
//     response.status(201).send({ message: 'Admin Created' });
//   } catch (e) {
//     response.status(500).json(err);
//   }
// });

// same path can be grouped

router;

router.post("/signin", validate(SignInValidator), Signin);
router.get("/logout", Logout);

router.get("/refresh", HandleAuthRefresh);

export default router;
