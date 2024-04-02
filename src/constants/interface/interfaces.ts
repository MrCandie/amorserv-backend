import { Document } from "mongoose";

export declare interface IUser extends Document {
  id?: string;
  name: string;
  email: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
  linkedin: string;
  twitter: string;
  website: string;
  emailIsVerified: boolean;
  verifiedAt: number;
  passwordChangedAt?: string;
  passwordResetToken?: string;
  accountVerificationToken?: string;
  passwordResetExpires?: string;
  appSignature?: string;
  verifyPassword(enteredPassword: string, password: any): Promise<string>;
  passwordChanged(jwtTime: number): () => void;
  createPasswordResetToken: () => void;
}

export declare interface IToken extends Document {
  id?: string;
  createdAt: string;
  updatedAt: string;
  expiry: string;
  userId: string;
  status: string;
  token: string;
  otp: string;
}

export declare interface IBook extends Document {
  name: string;
  user: string;
  userId: string;
  category: string;
  url: string;
  cover_url: string;
  author: string;
  id?: string;
  createdAt: string;
  updatedAt: string;
}

export declare interface ICategory extends Document {
  name: string;
  user: string;
  userId: string;
  id?: string;
  createdAt: string;
  updatedAt: string;
}
