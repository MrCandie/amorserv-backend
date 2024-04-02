import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { IUser } from "../constants/interface/interfaces";
import crypto from "crypto";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      validate: [validator.isEmail, "enter a valid email address"],
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

schema.methods.verifyPassword = async function (
  enteredPassword: string,
  password: string
) {
  return await bcrypt.compare(enteredPassword, password);
};

schema.methods.createPasswordResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return token;
};

schema.methods.createAccountVerificationToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  return token;
};

schema.methods.passwordChanged = function (jwtTime: any) {
  const changed = this.passwordChangedAt;
  if (changed) {
    const passwordTimeStamp = parseInt(String(changed.getTime() / 1000), 10);
    return jwtTime < passwordTimeStamp;
  }
  return false;
};

export default mongoose.model<IUser>("User", schema);
