import jwt from "jsonwebtoken";
import { promisify  } from "util";
import Client from "../models/clientModel.js";

const protect = async (req, res, next) => {
    try{
        let token;
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ){
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token){
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Please log in to get access.',
            })
        }

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentClient = await Client.findById(decoded.id);
        if (!currentClient) {
            return res.status(401).json({
               status: 'fail',
               message: 'The user belonging to this token no longer exists.',
            });
        }

        req.client = currentClient;
        next();
    }catch(error){
        // The catch block will handle errors from jwt.verify (e.g., JsonWebTokenError, TokenExpiredError)
        console.error('AUTH MIDDLEWARE ERROR:', error);
        return res.status(401).json({
          status: 'fail',
          message: 'Invalid token or session expired. Please log in again.',
        });
      }
}

export default protect;