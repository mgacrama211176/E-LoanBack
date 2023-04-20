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
    const data = await newTransaction.find({ clientId: clientId, paid: false });
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
