import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ticketCollection = 'ticket';

const ticketSchema = new mongoose.Schema({
  code: {
    type: String,
    default: () => `${uuidv4()}-${Math.floor(Math.random() * 1000000)}`,
  },
  purchaseDatetime: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
  },
});

const TicketModel = mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;
