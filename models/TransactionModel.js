import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  date: { type: String },
  dueDate: { type: String },
  amount: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
});

const TransactionModel = mongoose.model("Transactions", TransactionSchema);

export default TransactionModel;
