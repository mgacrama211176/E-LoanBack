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

    //Update Admin Data for Investor
    const updateAdmin = await adminModel.findByIdAndUpdate(
      request.body.managerId,
      {
        $push: { handlers: request.params.id },
      },
      { new: true }
    );
    response.status(HttpSuccessCode.Created).json({ data, updateAdmin });
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

//Deleting Handler
router.delete("/:id", async (request, response) => {
  router.delete("/:id", async (request, response) => {
    try {
      const removeInvestor = await HandlerModel.findByIdAndDelete(
        request.params.id
      );

      //Update Admin Data for Investor
      const updateAdmin = await adminModel.findByIdAndUpdate(
        request.body.managerId,
        {
          $pull: { handlers: request.params.id },
        },
        { new: true }
      );
      response.status(200).json({ removeInvestor, updateAdmin });
    } catch (err) {
      response.status(500).json(err);
    }
  });
});

//Update Investor Information
router.put("/:id", async (request, response) => {
  try {
    const updateHandler = await HandlerModel.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json(updateHandler);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
