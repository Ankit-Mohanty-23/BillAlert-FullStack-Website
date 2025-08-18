import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from 'validator'

const createUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },         
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})



createUserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error);
    }

});

createUserSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(error){
        throw error;
    }
}

const Client = mongoose.model('Client', createUserSchema);

export default Client;

/*
{
  "email": "admin.dev@example.com",
  "Name": "Dev Admin",
  "password": "StrongPass123"
}
*/