import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'products',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  products: {
    type: [cartsItemSchema],
    default: [],
  },
});

const CartModel = mongoose.model(cartsCollection, cartSchema);

export default CartModel;
