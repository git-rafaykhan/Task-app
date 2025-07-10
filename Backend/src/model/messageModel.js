import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true
    },
    description : {
        type : String,
    },
    priority : {
        type : String,
        enum : ["high", "low"],
        default : "low"
    }
})

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;