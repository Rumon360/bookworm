import User from "../../models/User.js";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../../validators/index.js";

import { generateToken } from "../../lib/token.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (!validateUsername(username)) {
      return res.status(400).json({
        message:
          "Username must be minimun 3 characters and only include letters, numbers, or underscores",
      });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address." });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists.",
      });
    }

    const randomAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

    const user = await User.create({
      email: email,
      username: username,
      password: password,
      profileImage: randomAvatar,
    });

    await user.save();

    const token = generateToken(user._id);

    return res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      },
      token,
    });
  } catch (error) {
    console.log("ERROR CREATING USER", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
