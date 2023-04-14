import express from "express";
// import adminModel from "../models/Admin.Model.js";
// import bcrypt from "bcrypt";

// middleware
import validate from "../middleware/validate.js";

// utils
import { createAdminValidator } from "../validation/adminValidator.js";

// controller
import { CreateAdmin } from "../controller/Admin.controller.js";

const router = express.Router();

/* GET users listing. */
// router.post('/', async (request, response) => {

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

router
  .route("/")
  .get()
  .post(validate(createAdminValidator), CreateAdmin)
  .patch()
  .delete();

export default router;
