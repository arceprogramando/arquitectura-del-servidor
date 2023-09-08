import mongoose from 'mongoose';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  code: {
    type: mongoose.Types.String,
    unique: true,
    required: true,
  },
  purchase_datetime: {
    type: mongoose.Types.Date,
    required: true,
  },
  total: {
    type: mongoose.Types.Number,
    required: true,
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
          type: mongoose.Types.Number,
          required: true,
        },
        quantity: {
          type: mongoose.Types.Number,
          default: 1,
        },
      },
    ],
  },
  purchaser: {
    type: mongoose.Types.String,
    required: true,
  },
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
