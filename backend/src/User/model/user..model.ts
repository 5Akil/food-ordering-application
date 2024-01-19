import { model, Schema } from "mongoose";
import { IUser } from "../types/user.interface";

export const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export const UserModel = model<IUser>('User', UserSchema);