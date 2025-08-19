import { getPayments } from "../controller/payHistoryController.js";
import express from "express";

const router = express.Router();

// Get all payments
router.get('/:id', getPayments);

export default router;