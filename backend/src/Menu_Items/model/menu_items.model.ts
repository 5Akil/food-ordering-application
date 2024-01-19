import mongoose, {model, models, Schema} from "mongoose";
import { IMenu } from "../types/menu_items.interface";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

export const MenuItemSchema = new Schema({
  image: {type: String},
  name: {type: String},
  description: {type: String},
  category: {type: mongoose.Types.ObjectId},
  basePrice: {type: Number},
  sizes: {type:[ExtraPriceSchema]},
  extraIngredientPrices: {type:[ExtraPriceSchema]},
}, {timestamps: true});


export const Menu_Item_Model = model<IMenu>('MenuItem', MenuItemSchema);