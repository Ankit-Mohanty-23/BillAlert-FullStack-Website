import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.MONGO_URL;

const connectdb = async () => {
    try{
        const conn = await mongoose.connect(url);
        console.log(`${conn.connection.name} Database is now connected`);
    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

export default connectdb;