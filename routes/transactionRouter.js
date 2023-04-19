import express from "express";
import newTransaction from "../models/TransactionModel.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
const router = express.Router();

/* Adding of Transactions */
router.post("/", async (request, response) => {
  const transactionData = request.body;
  try {
    const Transaction = new newTransaction(transactionData);
    await Transaction.save();
    response.status(HttpSuccessCode.Created).json(Transaction);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError);
  }
});

// View all Transactions
router.get("/", async (request, response) => {
  try {
    const Data = await newTransaction.find({});
    response.status(200).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(Data);
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
