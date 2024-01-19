// import { Document, Number } from 'mongoose';
// export interface IMenu extends Document {
//     _id: string;
//     image: string;
//     description: string;
//     name: string;
//     category: string;
//     basePrice: number;
//     sizes: size[];
//     extraIngredientPrices: ExtraIngredient[];
//     // createdAt: Date;
//     // updatedAt: Date
// }



// export interface size {
//     name: string,
//     price: number,
//     _id: string
// }

export interface ExtraIngredient {
    name: string;
    price: number;
    _id:string
}
interface ExtraSize {
    name: string;
    price: number;
    _id:string
  }
  
  export interface IMenu {
    image: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    sizes: ExtraSize[];
    extraIngredientPrices: ExtraIngredient[];
  }
  