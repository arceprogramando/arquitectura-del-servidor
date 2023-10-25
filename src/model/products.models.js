import mongoose from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: uuidv4(),
  },
  price: {
    type: Number,
    required: true,
    index: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: String,
    default: 'ADMIN',
  },
  email: {
    type: String,
  },
  stock: Number,
  category: String,
  thumbnails: String,
});

productsSchema.plugin(mongoosePagination);

const ProductsModel = mongoose.model(productsCollection, productsSchema);

export default ProductsModel;
