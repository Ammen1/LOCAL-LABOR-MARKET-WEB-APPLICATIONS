import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  tx_ref: {
    type: String,
    required: true
  },
  returnUrl: String,
  customization: {
    title: String,
    description: String
  },
  status: {
    type: String,
    default: 'pending' // Default status can be set to 'pending'
  }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);


