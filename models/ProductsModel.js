import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  product: String,
  brand: String,
  unit: String,
  price: Number,
});

const newProducts = mongoose.model('products', productSchema);

export default newProducts;
