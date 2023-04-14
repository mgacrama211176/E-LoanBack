import mongoose from "mongoose";

const clientsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true  },
  email: { type: String },
  phoneNumber: { type: Number, required: true },
  date: { type: String },
  amount: { type: Number, required: true },
  handlerName: { type: String },
  investorName: { type: String },
});

const ClientsModel = mongoose.model("Clients", clientsSchema);

export default ClientsModel;
