"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.signup = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const app_error_1 = __importDefault(require("../utils/app-error"));
const catch_async_1 = __importDefault(require("../utils/catch-async"));
const verifyToken_1 = __importDefault(require("../utils/verifyToken"));
const createAuthToken_1 = __importDefault(require("../utils/createAuthToken"));
const token_model_1 = __importDefault(require("../models/token-model"));
exports.signup = (0, catch_async_1.default)(async (req, res, next) => {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
        return next(new app_error_1.default("Kindly provide a valid name, email and password", 400));
    }
    const userExists = await user_model_1.default.find({ email });
    if (userExists.length !== 0) {
        return next(new app_error_1.default("User with this email address exists already", 400));
    }
    const user = await user_model_1.default.create({
        name,
        email,
        password,
    });
    // await new Email({ name: user.name, email: user.email }).signup({ token });
    await (0, createAuthToken_1.default)(user, 200, res);
});
exports.login = (0, catch_async_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new app_error_1.default("Provide a valid email address and password", 400));
    }
    const user = await user_model_1.default.findOne({ email }).select("+password");
    if (!user) {
        return next(new app_error_1.default("User not found", 404));
    }
    if (!(await user.verifyPassword(password, user.password))) {
        return next(new app_error_1.default("Login details incorrect", 401));
    }
    (0, createAuthToken_1.default)(user, 200, res);
});
exports.forgotPassword = (0, catch_async_1.default)(async (req, res, next) => {
    const { email } = req.body;
    if (!email) {
        return next(new app_error_1.default("Kindly provide a valid email address", 400));
    }
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        return next(new app_error_1.default("User not found", 404));
    }
    // const token = await generateToken(user.id);
    // await new Email(user).forgotPassword({ token });
    return res.status(200).json({
        status: "Success",
        message: "Password reset token sent",
    });
});
exports.resetPassword = (0, catch_async_1.default)(async (req, res, next) => {
    const { token, password, passwordConfirm } = req.body;
    if (!token || !password || !passwordConfirm) {
        return next(new app_error_1.default("Password details missing", 400));
    }
    if (password !== passwordConfirm) {
        return next(new app_error_1.default("Passwords do not match", 400));
    }
    const auth = await token_model_1.default.findOne({ token });
    if (!auth) {
        return next(new app_error_1.default("Account record does not exist or has been verified, please sign up or login", 200));
    }
    const user = await user_model_1.default.findById(auth.userId).select("+password");
    if (!user) {
        return next(new app_error_1.default("User not found", 404));
    }
    const isVerified = await (0, verifyToken_1.default)(token, next);
    if (!isVerified) {
        return next(new app_error_1.default("Token is invalid or expired", 400));
    }
    user.password = password;
    await user.save();
    return res.status(200).json({
        status: "Success",
        message: "Password reset successful",
    });
});
