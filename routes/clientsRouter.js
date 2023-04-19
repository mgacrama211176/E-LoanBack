import express from "express";
import ClientsModel from "../models/ClientsModel.js";
const router = express.Router();
import desirealize from "../middleware/desirealize.js";
import HttpSuccessCode from "../utils/HttpSuccessCodes.js";
import HttpErrorCode from "../utils/HttpErrorCodes.js";

// router.use(desirealize);

/* Adding of Clients */
router.post("/", async (request, response) => {
  const clientData = request.body;
  try {
    const newClient = new ClientsModel(clientData);
    await newClient.save();

    response.status(HttpSuccessCode.Created).json(newClient);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});

//GET ALL CLIENTS
router.get("/", async (request, response) => {
  try {
    const Data = await ClientsModel.find({});
    response.status(HttpSuccessCode.OK).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
  }
});
//GET SINGLE CLIENT WITH IT'S ID
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  console.log(id);
  try {
    const Data = await ClientsModel.findById({ _id: id });
    response.status(HttpSuccessCode.Accepted).json(Data);
  } catch (err) {
    response.status(HttpErrorCode.InternalServerError).json(err);
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
