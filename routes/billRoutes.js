import express from 'express';
import * as billRouter from "../controller/billController.js";
import protect from "../middleware/clientMiddleware.js";

const Router = express.Router()

// Create a new bill for a client
Router.post('/create/:id', protect, billRouter.createBill);

// Get all bills for a client
Router.get('/:id', protect, billRouter.getBill);

// Get a specific bill for a client
Router.get('/:clientId/:billId', protect, billRouter.getOneBill);

// Update a specific bill for a client
Router.put('/:clientId/:billId', protect, billRouter.updateBill);

//Delete a specific bill for a client
Router.delete('/:clientId/:billId', protect, billRouter.deleteBill);

export default Router;