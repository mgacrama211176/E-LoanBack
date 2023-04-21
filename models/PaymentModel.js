import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  clientId: { type: String, required: true },
  transactionId: { type: Number, required: true },
  paymentDate: { type: String },
  amount: { type: Number },
});

const PaymentModel = mongoose.model("Payments", PaymentSchema);

export default PaymentModel;
