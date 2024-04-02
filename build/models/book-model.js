"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Book name is required"],
        unique: true,
    },
    user: [
        {
            type: mongoose_1.default.Schema.ObjectId,
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("Book", schema);
