import { Module } from "@nestjs/common";
import { OrderController } from "./controller/orders.controller";
import { OrderSchema } from "./model/order.model";
import { MongooseModule } from "@nestjs/mongoose";
import { OrderService } from "./service/orders.service";




@Module(
    {
        imports: [
            MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
        ],
        providers: [OrderService],
        controllers: [OrderController]
    }
)

export class OrderModule { }