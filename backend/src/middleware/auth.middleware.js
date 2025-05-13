import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

async function protectRoute(req, res, next) {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing, access denied." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.user_id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token, user not found." });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR", error);

    return res
      .status(401)
      .json({ message: "Invalid or expired token, access denied." });
  }
}

export default protectRoute;
