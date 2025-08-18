import express from 'express';
import * as billRouter from "../controller/billController.js";

const Router = express.Router()

// Create a new bill for a client
Router.post('/create/:id', billRouter.createBill);

// Get all bills for a client
Router.get('/:id', billRouter.getBill);

// Get a specific bill for a client
Router.get('/:clientId/:billId', billRouter.getOneBill);

// Update a specific bill for a client
Router.put('/:clientId/:billId', billRouter.updateBill);

//Delete a specific bill for a client
Router.delete('/:clientId/:billId', billRouter.deleteBill);

export default Router;