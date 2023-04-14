import express from "express";
import newProducts from "../models/ProductsModel.js";
const router = express.Router();

/* Adding of products */
router.post("/add", async (request, response) => {
  const product = request.body.product;
  const brand = request.body.brand;
  const unit = request.body.unit;
  const price = request.body.price;

  const productInformation = new newProducts({
    product: product,
    brand: brand,
    unit: unit,
    price: price,
  });
  await productInformation.save();
  response.status(200).json({ message: `Product ${product} has been added` });
});

//search by ID
router.get("/:id", async (request, response) => {
  try {
    const getID = await newProducts.findById(request.params.id);
    response.status(200).json({ message: getID });
  } catch (err) {
    response.status(500).json(err);
  }
});

//Update Products
router.put("/update/:id", async (request, response) => {
  try {
    const update = await newProducts.findByIdAndUpdate(
      request.params.id,
      {
        $set: request.body,
      },
      { new: true }
    );
    response.status(200).json({ message: "Product Updated" });
  } catch (err) {
    response.status(500).json(err);
  }
});

//Deleting of product
router.delete("/delete/:id", async (request, response) => {
  try {
    const deleteProduct = await newProducts.findByIdAndDelete(
      request.params.id
    );
    response.status(200).json({ message: `product has been deleted` });
  } catch (e) {
    response.status(500).json(err);
  }
});

export default router;
