import express from "express";
import newItems from "../models/InventoryModel.js";
const router = express.Router();

/* Adding of products */
router.post("/", async (request, response) => {
  const itemData = request.body;
  const newItem = new newItems(itemData);
  await newItem.save();
  response.status(201).json(newItem);
});

router.get("/", async (request, response) => {
  const Data = await newItems.find({});
  response.status(200).json(Data);
});

router.put("/:id", async (request, response) => {
  try {
    const updateItem = await newItems.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json(updateItem);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const removeItem = await newItems.findByIdAndDelete(request.params.id);
    response.status(200).json(removeItem);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
