import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    amount: Number,
    txRef: String,
    returnUrl: String,
    customization: {
      title: String,
      description: String
    },
    status: String // This field can be used to track the status of the transaction (e.g., 'pending', 'success', 'failed')
  });
  
  module.exports = mongoose.model('Transaction', transactionSchema);