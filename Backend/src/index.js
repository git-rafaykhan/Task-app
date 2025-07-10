import express from "express"; 
import connetToDb from "./db.js";
import User from "./model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

const app = express();
app.use(express.json());


app.post('/api/v1/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashPassword
    });

    res.status(201).json({
      message: "User has been signed up successfully",
        newUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});



app.post('/api/v1/login', async (req, res)=> {
const {email, password} = req.body;
try {
    if(!email || !password){
        return res.status(400).json({message: "All fields are required"})
    }
    const userExist = await User.findOne({email});
    if(!userExist){
        return res.status(400).json({message: "User is not signed up"})
    }
    const comparePassword = await bcrypt.compare(password, userExist.password)
    if(!comparePassword){
        return res.status(400).json({message : "incorrect password"})
    }

    const token = jwt.sign({userId : userExist._id}, JWT_SECRET);
    res.status(200).json({
        message: "You have been loged in", 
        token
    })

} catch (error) {
    console.log(error)
    res.status(500).json({message: "server error"})
}
})
app.post('/api/v1/add-todo', (req, res)=> {

})
app.get('/api/v1/todo', (req, res)=> {

})

const port = 8080;
app.listen(port, ()=> {
    console.log(`app is listening on port ${8080}`);
    connetToDb()
})


 


