import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user_id) => {
  return jwt.sign(
    {
      user_id,
    },
    JWT_SECRET,
    { expiresIn: "15d" }
  );
};

export { generateToken };
