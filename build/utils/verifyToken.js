"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_model_1 = __importDefault(require("../models/token-model"));
const app_error_1 = __importDefault(require("./app-error"));
async function verifyToken(token, next) {
    const userOtpRecord = await token_model_1.default.findOne({ token });
    if (!userOtpRecord) {
        return next(new app_error_1.default("Account record does not exist or has been verified, please sign up or login", 200));
    }
    if (new Date(userOtpRecord.expiry) < new Date(Date.now())) {
        await token_model_1.default.deleteMany({ token });
        return next(new app_error_1.default("Code has expired, request again", 400));
    }
    return await bcryptjs_1.default.compare(token, userOtpRecord.otp);
}
exports.default = verifyToken;
