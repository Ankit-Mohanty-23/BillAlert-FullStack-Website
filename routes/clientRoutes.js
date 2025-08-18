import express from 'express';
import { Signup, Login, getClientId, getClientName } from '../controller/clientController.js';

const Router = express.Router();

// Route for client signup
Router.post('/signup', Signup);

// Route for client login
Router.post('/login', Login);

//Route for creating dashboard url by getting client id
Router.post('/', getClientId);

//Route for dashboard to fetch client name
Router.get('/:id', getClientName);


export default Router;
