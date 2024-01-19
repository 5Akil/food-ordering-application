import {model, models, Schema} from "mongoose";
import { Iorder } from "../types/order.interface";

export const OrderSchema = new Schema({
  userEmail: String,
  phone: String,
  streetAddress: String,
  postalCode: String,
  city: String,
  country: String,
  cartProducts: Object,
  paid: {type: Boolean, default: false},
}, {timestamps: true});


export const OrderModel = model<Iorder>('Order',OrderSchema );