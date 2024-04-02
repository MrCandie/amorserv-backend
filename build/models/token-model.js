"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tokenSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
exports.default = mongoose_1.default.model("Token", tokenSchema);
