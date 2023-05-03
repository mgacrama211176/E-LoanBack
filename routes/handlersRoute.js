import express from "express";
import InvestorModel from "../models/InvestorModel.js";

import desirealize from "../middleware/desirealize.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import adminModel from "../models/Admin.Model.js";
import HandlerModel from "../models/handlerModel.js";

const router = express.Router();
// router.use(desirealize);

//Adding of new Handlers to the database
router.post("/", async (request, response) => {
  const handlerInfo = request.body;
  try {
    const data = new HandlerModel(handlerInfo);
    await data.save();
    response.status(HttpSuccessCode.Created).json(data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError);
  }
});

//getting all the handlers in the system
router.get("/", async (request, response) => {
  try {
    const fetchHandlers = await HandlerModel.find({});
    response.status(HttpSuccessCode.OK).json(fetchHandlers);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});
// router.post("/", async (request, response) => {
//   const investorInfo = request.body;
//   const data = new InvestorModel(investorInfo);
//   await data.save();

//   //Update Admin Slots
//   const updateAdmin = await adminModel.findByIdAndUpdate(
//     request.body.managerId,
//     {
//       $push: { investors: data._id },
//     },
//     { new: true }
//   );
//   response.status(HttpSuccessCode.Created).json({ data, updateAdmin });
// });

export default router;
