import {model, models, Schema} from "mongoose";
import { ICategory } from "../type/categories.interface";

export const CategorySchema = new Schema({
  name: {type:String, required:true},
}, {timestamps: true});


export const CategoryModel = model<ICategory>('categories', CategorySchema);