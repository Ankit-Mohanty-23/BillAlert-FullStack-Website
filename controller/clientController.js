import Client from "../models/clientModel.js";
import jwt from 'jsonwebtoken';
/**
 * @desc    Create new User
 * @route   POST /user/signup
 * @access  Public 
 */

export async function Signup(req, res){
    try{
        const { email, fullName, password } = req.body;
        if(!email || !fullName || !password){
            return res.status(400).json({error: 'Please provide email, fullName and password correctly'});
        }
        const existingUser = await Client.findOne({ email });
        if(existingUser){
            return res.status(200).json({msg: 'User already exists'});
        }
        console.log("Creating new user...");
        const newUser = new Client({
            email,
            fullName,
            password
        });
        await newUser.save();
        res.status(201).json({msg: 'New user created'});
        console.log("Created new user");
    }catch(error){
        console.error("Error creating user:", error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({error: error.message});
        }
        res.status(500).json({error: "Server Error"});
    }
}

/**
 * @desc    Get Login
 * @route   POST /user/login
 * @access  Public 
 */

export async function Login(req, res){
    try{
        const { email, password} = req.body;
        if( !email || !password ){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a username and password.',           
            });
        }
        const user = await Client.findOne({ email }).select('+password');
        if( !user || !(await user.comparePassword(password)) ){
            return res.status(401).json({
                status: 'fail',
                msg: 'Invalid credentials',
            });
        }
        const payload = { id: user._id };
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );
        res.status(200).json({
            status: 'success',
            token,
        });
    }catch(error){
        console.error('LOGIN ERROR: ', error);
        res.status(500).json({
            status: 'error',
            msg: 'An internal server error occurred.',
        });   
    }
}

/**
 * @desc    Get A Client Id
 * @route   POST /client
 * @access  Public 
 */

export async function getClientId(req, res){
    try{
        const { email } = req.body;
        if(!email){
            return res.status(400).json({ msg: 'Pass the client Email'})
        }
        const data = await Client.findOne({ email });
        if(!data){
            return res.status(400).json({ msg: 'No Client Found' })
        }
        return res.status(200).json({ 
            id: data._id,
        });
    }catch(error){
        console.error('ERROR: ', error);
        res.status(500).json({
            status: 'error',
            msg: error.message,
        }); 
    }
}

/**
 * @desc    Get A Client Name
 * @route   POST /client/:id
 * @access  Public 
 */


export async function getClientName(req, res){
    try{
        const id  = req.params.id;
        if(!id){
            return res.status(400).json({ msg: 'Pass the client Id'})
        }
        const data = await Client.findOne({ _id: id });
        if(!data){
            return res.status(400).json({ msg: 'No Client Found' })
        }
        return res.status(200).json({ data });
    }catch(error){
        console.error('ERROR: ', error);
        res.status(500).json({
            status: 'error',
            msg: error.message,
        }); 
    }
}