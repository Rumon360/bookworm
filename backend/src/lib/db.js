import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("DATABASE CONNECTED");
    } catch (error) {
      console.log("DATABASE CONNECTION ERROR", error);
      process.exit(1);
    }
  } else {
    throw new Error("No MongoDB URI provided");
  }
};
