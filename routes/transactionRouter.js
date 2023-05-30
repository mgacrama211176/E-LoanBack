import express from "express";
import newTransaction from "../models/TransactionModel.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HandlerModel from "../models/handlerModel.js";
const router = express.Router();

/* Adding of Transactions */
router.post("/", async (request, response) => {
  const transactionData = request.body;

  //generates new transaction IF every transaction since this would be the data needed when processing the payment
  const generateCode = () => {
    const randomStr = Math.floor(Math.random() * 10000000000);
    return `${randomStr}`;
  };
  const transactionId = generateCode();

  try {
    //ADDDING NEW TRANSACTION
    const Transaction = new newTransaction({
      ...transactionData,
      transactionId,
    });
    await Transaction.save();

    //Update Handler Status
    const UpdateHandlerStatus = await HandlerModel.findOneAndUpdate(
      transactionData.handlerName,

      //we need to check first if the clientID already exists on the handler array if not insert it on its array and remove it from it's previous handler array.

      {
        $inc: {
          totalHandledAmount: +transactionData.amount,
        },

        $addToSet: {
          clients: transactionData._id,
          InvestorsId: transactionData.investorId,
        },
      },

      { new: true }
    );

    response
      .status(HttpSuccessCode.Created)
      .json({ Transaction, UpdateHandlerStatus });
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError);
  }
});

// View all Transactions
router.get("/", async (request, response) => {
  try {
    const data = await newTransaction.find({});
    const sortedData = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    response.status(200).json(sortedData);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(Data);
  }
});

// View Transaction using ID
router.get("/:id", async (request, response) => {
  const clientId = request.params.id;
  try {
    const data = await newTransaction.find({ clientId: clientId });
    response.status(200).json(data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const Data = await newTransaction.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(HttpSuccessCode.Accepted).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const removeItem = await newTransaction.findByIdAndDelete(
      request.params.id
    );
    response.status(HttpSuccessCode.OK).json(removeItem);
  } catch (err) {
    response.status(HttpErrorCode.InsufficientStorage).json(err);
  }
});

export default router;
