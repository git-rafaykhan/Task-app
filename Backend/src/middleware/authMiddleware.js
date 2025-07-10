
import { JWT_SECRET } from "../config.js";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {

  const token = req.headers.authorization ;
    if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById({ _id: decoded.userId }).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user; 
    next();

  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized" });
  }
};
