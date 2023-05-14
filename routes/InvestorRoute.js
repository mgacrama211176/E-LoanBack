import express from "express";
import InvestorModel from "../models/InvestorModel.js";

import desirealize from "../middleware/desirealize.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import adminModel from "../models/Admin.Model.js";

const router = express.Router();
// router.use(desirealize);

//Adding of new Investor to the database
router.post("/", async (request, response) => {
  const investorInfo = request.body;
  const data = new InvestorModel(investorInfo);
  await data.save();

  //Update Admin Slots
  const updateAdmin = await adminModel.findByIdAndUpdate(
    request.body.managerId,
    {
      $push: { investors: data._id },
    },
    { new: true }
  );
  response.status(HttpSuccessCode.Created).json({ data, updateAdmin });
});

//View ll investors in the system
router.get("/", async (request, response) => {
  const data = await InvestorModel.find({});
  response.status(HttpSuccessCode.Accepted).json(data);
});

//Deletig investor
router.delete("/:id", async (request, response) => {
  try {
    const removeInvestor = await InvestorModel.findByIdAndDelete(
      request.params.id
    );

    //Update Admin Data for Investor
    const updateAdmin = await adminModel.findByIdAndUpdate(
      request.body.managerId,
      {
        $pull: { investors: request.params.id },
      },
      { new: true }
    );
    response.status(200).json({ removeInvestor, updateAdmin });
  } catch (err) {
    response.status(500).json(err);
  }
});

//Update Investor Information
router.put("/:id", async (request, response) => {
  try {
    const updateInvestor = await InvestorModel.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json(updateInvestor);
  } catch (err) {
    response.status(500).json(err);
  }
});

// router.post("/", async (request, response) => {
//   const clientData = request.body;
//   try {
//     const validate = await ClientsModel.findOne({
//       name: clientData.name,
//     });
//     //check if the user already exist in the database
//     if (validate) {
//       response
//         .status(HttpErrorCode.Conflict)
//         .json({ validate, message: "This user already exist!!" });
//     } else {
//continue with the usual process
//       const generateCode = () => {
//         const randomStr = Math.floor(Math.random() * 10000000000);
//         return `${randomStr}`;
//       };
//       const userIdentifier = generateCode();
//       const newClient = new ClientsModel({
//         ...clientData,
//         userIdentifier,
//       });

//       const transactionIdentifier = generateCode();
//       const Data = {
//         clientId: newClient._id,
//         date: clientData.date,
//         dueDate: clientData.dueDate,
//         amount: clientData.amount,
//         paid: false,
//         transactionId: transactionIdentifier,
//       };
//       const Transaction = new newTransaction(Data);
//       newClient.transactions.push(Transaction._id); // push the transaction ID to the newClient's transactions array
//       await newClient.save();
//       await Transaction.save();
//       response.status(HttpSuccessCode.Created).json({ newClient, Transaction });
//     }
//   } catch (err) {
//     response.status(HttpErrorCode.InternalServerError).json(err);
//   }
// });

//GET ALL CLIENTS
// router.get("/", async (request, response) => {
//   try {
//     const Data = await ClientsModel.find({});
//     response.status(HttpSuccessCode.OK).json(Data);
//   } catch (err) {
//     response.status(HttpErrorCode.InternalServerError).json(err);
//   }
// });
//GET SINGLE CLIENT WITH IT'S ID
// router.get("/:id", async (request, response) => {
//   const id = request.params.id;
//   try {
//     const Data = await ClientsModel.findById({ _id: id });
//     response.status(HttpSuccessCode.Accepted).json(Data);
//   } catch (err) {
//     response.status(HttpErrorCode.InternalServerError).json(err);
//   }
// });

export default router;
