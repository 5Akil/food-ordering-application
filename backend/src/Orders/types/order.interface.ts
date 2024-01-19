import { Document } from 'mongoose';


export interface Iorder extends Document{
    userEmail: string,
    phone: string,
    streetAddress: string,
    postalCode: string,
    city: string,
    country: string,
    cartProducts: Object,
    paid: {type: Boolean, default: false},

}