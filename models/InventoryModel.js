import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
  item_name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  base_price: { type: Number, default: 0 },
  markup_price: { type: Number, default: 0 },
  reOrder_price: { type: Number, default: 0 },
});

const InventoryModel = mongoose.model("Inventory", InventorySchema);

export default InventoryModel;
