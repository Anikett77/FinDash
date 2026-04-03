import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount:      { type: Number, required: true },
  date:        { type: Date,   required: true },
  type:        { type: String, enum: ["income", "expense"], required: true },
  category:    { type: String, required: true },
  status:      { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  addedBy:     { type: String },           // user's name
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // links to User
}, { timestamps: true })

export const Transaction =
  mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema)