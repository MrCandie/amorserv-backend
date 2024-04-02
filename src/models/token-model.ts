import mongoose from "mongoose";
import { IToken } from "../constants/interface/interfaces";

const tokenSchema = new mongoose.Schema(
  {
    expiry: {
      type: Date,
    },
    userId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "active",
      enum: ["deleted", "active"],
    },
    token: {
      type: String,
      required: [true, "token cannot be empty"],
    },
    otp: {
      type: String,
      required: [true, "token cannot be empty"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model<IToken>("Token", tokenSchema);
