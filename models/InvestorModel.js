import mongoose from "mongoose";

const InvestorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  managerName: { type: String, required: true },
  investmentAmount: { type: Number, required: true },
  inventmentRemaining: { type: Number, required: true },
});

const InvestorModel = mongoose.model("Investor", InvestorSchema);

export default InvestorModel;
