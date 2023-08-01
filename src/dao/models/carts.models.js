import mongoose from 'mongoose';

const cartsCollection = 'carts';

const cartsItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'products',
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  product: {
    type: [cartsItemSchema],
    default: [],
  },
});

const CartModel = mongoose.model(cartsCollection, cartSchema);

/* Tambien puedo usar (
Schema.pre('find',function(){
  this.populate('notes.note')
}) // Para hacer generico el populate
  */

export default CartModel;
