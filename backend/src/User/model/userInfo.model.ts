import {Model, model, models, Schema} from "mongoose";
import { IUserInfo } from "../types/userInfo.interface";

export const UserInfoSchema = new Schema({
  name:{type: String, required: true},
  email: {type: String, required: true},
  streetAddress: {type: String},
  postalCode: {type: String},
  city: {type: String},
  country: {type: String},
  phone: {type: String},
  isAdmin: { type: Boolean, default: false }
}, {timestamps: true});


export const UserInfoModel = model<IUserInfo>('UserInfos', UserInfoSchema);