"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const app_error_1 = __importDefault(require("../utils/app-error"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user-model"));
// PROTECT ROUTE
exports.protect = (0, catch_async_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new app_error_1.default("You are not logged in", 401));
    }
    let decoded;
    try {
        decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
    }
    catch (error) {
        return next(new app_error_1.default("Session expired", 401));
    }
    const user = await user_model_1.default.findById(decoded.id);
    if (!user) {
        return next(new app_error_1.default("user no longer exist", 404));
    }
    req.user = user;
    next();
});
