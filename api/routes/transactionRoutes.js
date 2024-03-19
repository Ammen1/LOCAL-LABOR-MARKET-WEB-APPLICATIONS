// routes/transactionRoutes.js

import express from 'express';
import { initiateTransaction, verifyTransaction } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/initiate', initiateTransaction);
router.get('/verify/:txId', verifyTransaction);

export default router;
