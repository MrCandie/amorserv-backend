"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        trim: true,
        default: "",
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        validate: [validator_1.default.isEmail, "enter a valid email address"],
    },
    password: {
        type: String,
        trim: true,
        minlength: [7, "password cannot be less than 7 digits"],
        required: [true, "enter a valid password"],
        select: false,
    },
    emailIsVerified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: Date,
    linkedin: { type: String, default: "" },
    website: { type: String, default: "" },
    twitter: { type: String, default: "" },
    passwordChangedAt: Date,
    passwordResetToken: String,
    accountVerificationToken: String,
    passwordResetExpires: Date,
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    this.password = await bcryptjs_1.default.hash(this.password, salt);
    next();
});
schema.methods.verifyPassword = async function (enteredPassword, password) {
    return await bcryptjs_1.default.compare(enteredPassword, password);
};
schema.methods.createPasswordResetToken = function () {
    const token = crypto_1.default.randomBytes(20).toString("hex");
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return token;
};
schema.methods.createAccountVerificationToken = function () {
    const token = crypto_1.default.randomBytes(20).toString("hex");
    this.accountVerificationToken = crypto_1.default
        .createHash("sha256")
        .update(token)
        .digest("hex");
    return token;
};
schema.methods.passwordChanged = function (jwtTime) {
    const changed = this.passwordChangedAt;
    if (changed) {
        const passwordTimeStamp = parseInt(String(changed.getTime() / 1000), 10);
        return jwtTime < passwordTimeStamp;
    }
    return false;
};
exports.default = mongoose_1.default.model("User", schema);
