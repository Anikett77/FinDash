import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["viewer", "analyst", "admin"],
    default: "viewer"
  }
});

export const User =
  mongoose.models.User || mongoose.model("User", userSchema);