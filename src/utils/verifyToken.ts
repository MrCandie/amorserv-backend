import { NextFunction } from "express";
import bcrypt from "bcryptjs";
import OTP from "../models/token-model";
import AppError from "./app-error";

async function verifyToken(token: string, next: NextFunction) {
  const userOtpRecord = await OTP.findOne({ token });

  if (!userOtpRecord) {
    return next(
      new AppError(
        "Account record does not exist or has been verified, please sign up or login",
        200
      )
    );
  }

  if (new Date(userOtpRecord.expiry) < new Date(Date.now())) {
    await OTP.deleteMany({ token });
    return next(new AppError("Code has expired, request again", 400));
  }

  return await bcrypt.compare(token, userOtpRecord.otp);
}

export default verifyToken;
