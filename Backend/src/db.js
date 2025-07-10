import mongoose from 'mongoose';

async function connetToDb(){
    await mongoose.connect('mongodb://abdulrafay:abdulrafay@ac-m5v77uv-shard-00-00.srwxpnd.mongodb.net:27017,ac-m5v77uv-shard-00-01.srwxpnd.mongodb.net:27017,ac-m5v77uv-shard-00-02.srwxpnd.mongodb.net:27017/Todo?ssl=true&replicaSet=atlas-a1nvuj-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Projects')
    console.log("Database is conected")
}

export default connetToDb;