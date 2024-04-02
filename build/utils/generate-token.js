"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_model_1 = __importDefault(require("../models/token-model"));
async function generateToken(userId) {
    const token = Math.floor(1000 + Math.random() * 9000).toString();
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedOTP = await bcryptjs_1.default.hash(token, salt);
    await token_model_1.default.create({
        userId,
        otp: hashedOTP,
        token,
        user: userId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 600000,
    });
    return token;
}
exports.default = generateToken;
