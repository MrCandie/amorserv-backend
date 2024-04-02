import jwt from "jsonwebtoken";
import { Response } from "express";
import { IUser } from "../constants/interface/interfaces";

// CREATE AND SEND JWT TOKEN
const createSendToken = async (
  user: IUser,
  statusCode: number,
  res: Response
) => {
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  user.password = undefined;
  return res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export default createSendToken;
