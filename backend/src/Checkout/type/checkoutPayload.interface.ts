


export interface checkoutPayload {
    address: Address;
    cartProducts: CartProduct[];

}


// filename: order.interface.ts

export interface Address {
    phone: string;
    streetAddress: string;
    postalCode: string;
    city: string;
    country: string;
}

export interface Size {
    name: string;
    price: number;
    _id:string
}

export interface ExtraIngredient {
    name: string;
    price: number;
    _id:string
}

export interface CartProduct {
    _id: string;
    image: string;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    sizes?: Size[];
    extraIngredientPrices?: ExtraIngredient[];
    size: Size;
    extras?: ExtraIngredient[];
}

