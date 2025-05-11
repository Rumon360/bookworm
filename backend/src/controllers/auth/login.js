import { generateToken } from "../../lib/token.js";
import User from "../../models/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExists = await User.findOne({ email }).select("+password");

    if (!userExists) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordCorrect = await userExists.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Generate token
    const token = generateToken();

    return res.json({
      user: {
        _id: userExists._id,
        username: userExists.username,
        email: userExists.email,
        profileImage: userExists.profileImage,
      },
      token,
    });
  } catch (error) {
    console.log("ERROR LOGIN USER", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
