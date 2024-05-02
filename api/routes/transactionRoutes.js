// routes/transactionRoutes.js

import express from 'express';
import { initiateTransaction, verifyTransaction, getalltransactio } from '../controllers/transactionController.js';

const router = express.Router();

router.post('/initiate', initiateTransaction);
router.get('/verify/:txId', verifyTransaction);
router.get('/', getalltransactio)

export default router;
