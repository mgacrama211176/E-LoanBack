import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: Number, required: true },
  handlerName: { type: String },
  investorId: { type: String },
  clientLevel: { type: Number },
  transactions: { type: Array },
  blocked: { type: Boolean },
  userIdentifier: { type: Number, unique: true },
});

const ClientsModel = mongoose.model("Clients", clientsSchema);

export default ClientsModel;
