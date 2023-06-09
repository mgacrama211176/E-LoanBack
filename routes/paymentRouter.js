import express from "express";
import PaymentModel from "../models/PaymentModel.js";
import newTransaction from "../models/TransactionModel.js";
import desirealize from "../middleware/desirealize.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import InvestorModel from "../models/InvestorModel.js";
import HandlerModel from "../models/handlerModel.js";

const router = express.Router();
// router.use(desirealize);

/* Adding of Payments */
router.post("/", async (request, response) => {
  const Data = request.body;
  const Id = Data.transactionId;

  try {
    // Check if the transaction ID is found on the database
    const retrieveData = await newTransaction.findOne({
      transactionId: Id,
    });

    // If the transaction ID is not found, return an error response
    if (!retrieveData) {
      return response.status(HttpErrorCode.BadRequest).json({
        TransactionId: Id,
        message: "Transaction not found",
      });
    }

    // Create a new payment record
    if (retrieveData.amount <= 0) {
      return response
        .status(HttpErrorCode.BadRequest)
        .json({ message: "Balance is less than ZERO" });
    } else {
      // Update the transaction amount
      const updatedTransaction = await newTransaction.findByIdAndUpdate(
        retrieveData._id,
        { $set: { amount: retrieveData.amount - Data.amount } },
        { new: true }
      );

      //Update Investor Balance
      const investorBalance = await InvestorModel.findByIdAndUpdate(
        Data.investorId,
        {
          $inc: {
            inventmentRemaining: +Data.amount,
          },
        },
        { new: true }
      );

      //Update Handler Status
      const UpdateHandlerStatus = await HandlerModel.findOneAndUpdate(
        Data.handlerName,
        {
          $inc: {
            totalHandledAmount: -Data.amount,
          },
        },
        { new: true }
      );

      if (updatedTransaction.amount === 0) {
        const balanceStatus = await newTransaction.findByIdAndUpdate(
          retrieveData._id,
          { $set: { paid: true } },
          { new: true }
        );
      }

      const newPayment = new PaymentModel(Data);
      await newPayment.save();
      // Return the updated transaction
      return response
        .status(HttpSuccessCode.OK)
        .json({ newPayment, investorBalance, UpdateHandlerStatus });
    }
  } catch (err) {
    // Return an error response if there is an issue with the database
    return response.status(HttpErrorCode.InternalServerError).json({
      message: err.message,
    });
  }
});

//retrieving all payment transactions
router.get("/:clientId", async (request, response) => {
  const id = request.params.clientId;
  try {
    const Data = await PaymentModel.find({ clientId: id });
    response.status(HttpSuccessCode.OK).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

export default router;
