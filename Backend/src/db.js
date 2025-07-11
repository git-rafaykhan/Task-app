import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();    

async function connetToDb(){
    await mongoose.connect('process.env.MONGODB_URL')
    console.log("Database is conected")
}

export default connetToDb;