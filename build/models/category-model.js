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
        trim: true,
        unique: true,
    },
    user: [
        {
            type: mongoose_1.default.Schema.ObjectId,
            ref: "User",
            required: [true, "Category must belong to a user"],
        },
    ],
    userId: {
        type: String,
        required: [true, "Category must belong to a user"],
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("Category", schema);
