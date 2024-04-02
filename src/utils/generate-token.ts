import bcrypt from "bcryptjs";
import OTP from "../models/token-model";

async function generateToken(userId: string) {
  const token = Math.floor(1000 + Math.random() * 9000).toString();

  const salt = await bcrypt.genSalt(10);
  const hashedOTP = await bcrypt.hash(token, salt);
  await OTP.create({
    userId,
    otp: hashedOTP,
    token,
    user: userId,
    createdAt: Date.now(),
    expiresAt: Date.now() + 600000,
  });

  return token;
}

export default generateToken;
