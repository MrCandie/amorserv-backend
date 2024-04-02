import { NextFunction, Request, Response } from "express";
import User from "../models/user-model";
import AppError from "../utils/app-error";
import catchAsync from "../utils/catch-async";
import Email from "../utils/send-email";
import verifyToken from "../utils/verifyToken";
import createSendToken from "../utils/createAuthToken";
import OTP from "../models/token-model";

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, name, password } = req.body;
    if (!email || !password || !name) {
      return next(
        new AppError("Kindly provide a valid name, email and password", 400)
      );
    }

    const userExists = await User.find({ email });
    if (userExists.length !== 0) {
      return next(
        new AppError("User with this email address exists already", 400)
      );
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    // await new Email({ name: user.name, email: user.email }).signup({ token });

    await createSendToken(user, 200, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError("Provide a valid email address and password", 400)
      );
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!(await user.verifyPassword(password, user.password))) {
      return next(new AppError("Login details incorrect", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    if (!email) {
      return next(new AppError("Kindly provide a valid email address", 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // const token = await generateToken(user.id);
    // await new Email(user).forgotPassword({ token });

    return res.status(200).json({
      status: "Success",
      message: "Password reset token sent",
    });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password, passwordConfirm } = req.body;

    if (!token || !password || !passwordConfirm) {
      return next(new AppError("Password details missing", 400));
    }

    if (password !== passwordConfirm) {
      return next(new AppError("Passwords do not match", 400));
    }

    const auth = await OTP.findOne({ token });
    if (!auth) {
      return next(
        new AppError(
          "Account record does not exist or has been verified, please sign up or login",
          200
        )
      );
    }

    const user = await User.findById(auth.userId).select("+password");

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    const isVerified = await verifyToken(token, next);

    if (!isVerified) {
      return next(new AppError("Token is invalid or expired", 400));
    }

    user.password = password;
    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "Password reset successful",
    });
  }
);
