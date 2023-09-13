import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  code: {
    type: String,
    unique: true,
    default: uuidv4(),
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  products: {
    type: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'products',
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  purchaser: {
    type: String,
  },
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
