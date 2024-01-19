import { Module } from "@nestjs/common";
import { CheckoutService } from "./service/checkout.service";
import { CheckoutController } from "./controller/checkout.controller";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { OrderSchema } from "../Orders/model/order.model";
import { MenuItemSchema } from "../Menu_Items/model/menu_items.model";





@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema } , { name: 'MenuItem', schema: MenuItemSchema }]),
    ],
    providers: [CheckoutService],
    controllers: [CheckoutController]
})

export class CheckoutModule { }