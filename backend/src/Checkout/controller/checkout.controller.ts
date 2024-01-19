import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, ValidationPipe } from "@nestjs/common";
import OrderDto from "../dto/checkout.dto";
import { CheckoutService } from "../service/checkout.service";
import { RegisterUserDto } from "../../Authentication/dto/registerUser.dto";




@Controller("api/checkout")
export class CheckoutController {
    constructor(private readonly checkoutService: CheckoutService) { }

    @Post("session")
    async getCheckoutSession(@Req() req, @Body() data: OrderDto) {
        try {
            const { user } = req
            return await this.checkoutService.generateSession(user, data)
        } catch (error) {
            throw new HttpException("Something went wrong, can not generate stripe session", HttpStatus.FORBIDDEN)
        }
    }
    @Post('webhook')
    async payment(@Req() req ){
        const res = await this.checkoutService.webhook(req)
    }
}