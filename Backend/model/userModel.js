import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes whitespace
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Email validation
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"], // Minimum length validation
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"], // Minimum length validation
    },
    avatar: {
      type: String, // Optional by default
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
