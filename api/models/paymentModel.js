import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
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
  callback_url: {
    type: String,
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
    default: 'pending'
  }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
