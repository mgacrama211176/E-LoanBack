import express from "express";
import ClientsModel from "../models/ClientsModel.js";
const router = express.Router();
import desirealize from "../middleware/desirealize.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";

// router.use(desirealize);

/* Adding of products */
router.post("/", async (request, response) => {
  const clientData = request.body;
  console.log(clientData);
  try {
    const newClient = new ClientsModel(clientData);
    await newClient.save();

    response.status(HttpSuccessCode.Created).json(newClient);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

router.get("/", async (request, response) => {
  try {
    const Data = await ClientsModel.find({});
    response.status(200).json(Data);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updateClient = await newClients.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json(updateClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const removeClient = await newClients.findByIdAndDelete(request.params.id);
    response.status(200).json(removeClient);
  } catch (err) {
    response.status(500).json(err);
  }
});

export default router;
