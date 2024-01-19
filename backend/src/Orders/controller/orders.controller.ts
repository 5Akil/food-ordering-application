import { Controller, Get, HttpException, HttpStatus, Query, Req } from "@nestjs/common";
import { OrderService } from "../service/orders.service";




@Controller('/api/orders')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { }
    @Get()
    async getOrder(@Query('_id') id: string) {
        return await this.OrderService.findOnebyId(id)
    }
    @Get('list')
    async getAllOrders(@Req() req) {
        const { user } = req
        const res = await this.OrderService.getAll(user)
        return res
    }
   
}