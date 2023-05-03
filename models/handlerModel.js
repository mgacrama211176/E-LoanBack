import mongoose from "mongoose";

const HandlerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  managerName: { type: String, required: true },
  managerId: { type: String, required: true },
  InvestorsId: { type: Array },
  totalHandledAmount: { type: Number },
  clients: { type: Array },
  date: { type: String },
});

const HandlerModel = mongoose.model("Handlers", HandlerSchema);

export default HandlerModel;
