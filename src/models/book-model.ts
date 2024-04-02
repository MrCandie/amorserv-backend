import mongoose from "mongoose";
import { IBook } from "../constants/interface/interfaces";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      unique: true,
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Book must belong to a user"],
      },
    ],
    userId: {
      type: String,
      required: [true, "Book must belong to a user"],
    },
    status: {
      type: String,
      default: "active",
      enum: ["deleted", "active", "pending"],
    },
    category: { type: String, required: [true, "Book category is required"] },
    author: { type: String, required: [true, "Book author is required"] },
    url: { type: String, required: [true, "Book URL is required"] },
    cover_url: { type: String, required: [true, "Book cover URL is required"] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model<IBook>("Book", schema);
