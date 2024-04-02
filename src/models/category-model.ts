import mongoose from "mongoose";
import { IBook, ICategory } from "../constants/interface/interfaces";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
      unique: true,
    },
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Category must belong to a user"],
      },
    ],
    userId: {
      type: String,
      required: [true, "Category must belong to a user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model<ICategory>("Category", schema);
