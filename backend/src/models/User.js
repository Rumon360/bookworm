import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: [
      /^[a-zA-Z0-9_]+$/,
      "Username must contain only letters, numbers, and underscores",
    ],
    lowercase: true, // force lowercase to avoid case-sensitive duplicates
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, "Please fill a valid email address"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profileImage: {
    type: String,
    default: "https://placehold.co/98x98",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
