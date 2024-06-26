import Chapa from "chapa";
import { Transaction } from '../models/paymentModel.js';
import { Job } from '../models/jobSchema.js';

const chapa = new Chapa('CHASECK_TEST-WLA5A4peABCYzMIKSaze3aYnfRBlpWDk');



export async function initiateTransaction(req, res) {
  const { email, first_name, last_name, amount, returnUrl, currency, job } = req.body;
  const now = new Date();
  const txUnNum = now.toISOString().replace(/\D/g, ''); // Generate unique transaction reference
  const txRef = `tx_${first_name}_${txUnNum}`;

  const data = {
    job,
    email,
    first_name,
    last_name,
    amount,
    currency,
    callback_url: `http://localhost:4000/transactions/verify/${txRef}`,
    tx_ref: txRef,
    returnUrl,
    customization: {
      title: '2utube',
      description: 'Payment for your services'
    }
  };

  try {
    const response = await chapa.initialize(data);
    const transaction = await Transaction.create(data);
    res.status(200).json({ detail: response, txRef: txRef }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function verifyTransaction(req, res) {
  const { txId } = req.params;

  try {
    const transaction = await Transaction.findOne({ tx_ref: txId }); 
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    // Perform verification using Chapa library or module
    const verificationResult = await chapa.verify(transaction.tx_ref);

    // Update transaction status based on verification result
    transaction.status = verificationResult.status;
    await transaction.save();

    if (verificationResult.status === 'success') {
      // If payment is successful, find and update the corresponding job
      const job = await Job.findById(transaction.job);
      if (job) {
        await job.markAsPaid(); // Mark the job as paid
      }
    }

    res.status(200).json(verificationResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getalltransactio(req, res){
  try { 
    const transaction = await Transaction.find().populate('job', 'title');;
    res.status(200).json(transaction);
  } catch( error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server errorr' });
  }
}