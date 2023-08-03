import mongoose from 'mongoose';
import mongoosePagination from 'mongoose-paginate-v2';

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
    required: true,
  },
  price: {
    type: Number,
    required: true,
    index: true, // Con index: true se indexa
  },
  status: Boolean,
  stock: Number,
  category: String,
  thumbnails: String,
});

productsSchema.plugin(mongoosePagination);

const ProductsModel = mongoose.model(productsCollection, productsSchema);

export default ProductsModel;
