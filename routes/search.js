import express from 'express';
import newProducts from '../models/ProductsModel.js';
const router = express.Router();

//ROUTER http://localhost:4000/search/
router.get('/:product', async (request, response) => {
  const product = request.params.product;
  //   const brand = request.body.brand;
  //find where products appear that came from the newProducts model
  const findProduct = await newProducts.find({
    // aggregation
    $or: [{ product: { $regex: product, $options: 'i' } }],
  });
  response.status(200).json({ message: findProduct });
});

export default router;
