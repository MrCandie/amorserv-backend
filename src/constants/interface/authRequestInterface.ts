import { Request } from "express";
import { IUser } from "./interfaces";

export interface AuthRequest extends Request {
  user?: any | IUser;
}
