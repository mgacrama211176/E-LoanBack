import express from "express";
import ClientsModel from "../models/ClientsModel.js";
import newTransaction from "../models/TransactionModel.js";
import adminModel from "../models/Admin.Model.js";
import InvestorModel from "../models/InvestorModel.js";

import desirealize from "../middleware/desirealize.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";

const router = express.Router();
// router.use(desirealize);

/* Adding of Clients */
router.post("/", async (request, response) => {
  const clientData = request.body;

  try {
    const checkSlot = await adminModel.find({ _id: clientData.adminId });
    const slotAvailable = checkSlot[0].slots;
    if (slotAvailable === 0) {
      return response.status(401).json("Buy more slots!");
    }

    try {
      const validate = await ClientsModel.findOne({
        name: clientData.name,
      });
      //check if the user already exist in the database
      if (validate) {
        response
          .status(HttpErrorCode.Conflict)
          .json({ validate, message: "This user already exist!!" });
      } else {
        //continue with the usual process
        const generateCode = () => {
          const randomStr = Math.floor(Math.random() * 10000000000);
          return `${randomStr}`;
        };
        const userIdentifier = generateCode();
        const newClient = new ClientsModel({
          ...clientData,
          userIdentifier,
        });
        const transactionIdentifier = generateCode();
        const Data = {
          clientId: newClient._id,
          date: clientData.date,
          dueDate: clientData.dueDate,
          amount: clientData.amount,
          paid: false,
          transactionId: transactionIdentifier,
        };
        //Update Admin Slots
        const updateAdmin = await adminModel.findByIdAndUpdate(
          request.body.adminId,
          {
            $inc: { slots: -1 },
            $push: { clients: newClient._id },
          },
          { new: true }
        );

        //Update Investor Balance
        const investorBalance = await InvestorModel.findByIdAndUpdate(
          request.body.investorId,
          {
            $inc: {
              inventmentRemaining: -clientData.amount,
            },
          },
          { new: true }
        );

        const Transaction = new newTransaction(Data);
        newClient.transactions.push(Transaction._id); // push the transaction ID to the newClient's transactions array
        await newClient.save();
        await Transaction.save();
        response
          .status(HttpSuccessCode.Created)
          .json({ newClient, Transaction, updateAdmin, investorBalance });
      }
    } catch (err) {
      response.status(HttpErrorCode.InternalServerError).json(err);
    }
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

//GET ALL CLIENTS
router.get("/", async (request, response) => {
  try {
    const Data = await ClientsModel.find({});
    response.status(HttpSuccessCode.OK).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

//GET SINGLE CLIENT WITH IT'S ID
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  try {
    const Data = await ClientsModel.findById({ _id: id });
    response.status(HttpSuccessCode.Accepted).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

//GET SINGLE CLIENT Using userIdentifier/Account Id
router.get("/search/:userIdentifier", async (request, response) => {
  const userIdentifier = request.params.userIdentifier;
  try {
    const Data = await ClientsModel.find({ userIdentifier: userIdentifier });
    response.status(HttpSuccessCode.Accepted).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updateClient = await newClients.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json(updateClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const removeClient = await newClients.findByIdAndDelete(request.params.id);
    response.status(200).json(removeClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
