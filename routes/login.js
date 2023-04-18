import express from "express";
import adminModel from "../models/Admin.Model.js";
import bcrypt from "bcrypt";
const router = express.Router();

/* GET users listing. */
router.post("/", async (request, response) => {
  const { email, password } = request.body;
  console.log(email);

  adminModel.findOne({ email: request.body.email }).then((data) => {
    if (data) {
      console.log(data);
      // bcrypt.compare(password, data.password).then((result) => {
      //   if (result) {
      //     response.status(200).send({ message: `Password Correct` });
      //   } else {
      //     response.status(401).send({
      //       error: `Password Incorrect. Please try again`,
      //     });
      //   }
      // });
    }
  });
});

export default router;
