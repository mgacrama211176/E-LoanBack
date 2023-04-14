import express from "express";
import adminModel from "../models/Admin.Model.js";
import bcrypt from "bcrypt";
const router = express.Router();

/* GET users listing. */
router.post("/", async (request, response) => {
  const { username, password } = request.body;
  console.log("adasdasdasd");

  adminModel.findOne({ username: request.body.username }).then((data) => {
    if (data) {
      bcrypt.compare(request.body.password, data.password).then((result) => {
        // console.log(result);
        if (result) {
          response.status(200).send({ message: `Password Correct` });
        } else {
          response.status(401).send({
            error: `Password Incorrect. Please try again`,
          });
        }
      });
    }
  });
});

export default router;
