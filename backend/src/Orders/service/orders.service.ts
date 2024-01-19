import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Iorder } from "../types/order.interface";
import { LoginUserDto } from "src/Authentication/dto/loginUser.dto";



@Injectable()
export class OrderService {
    constructor(@InjectModel('Order') private OrderModel: Model<Iorder>) { }
    async findOnebyId(id: string) {
        const res = await this.OrderModel.findById({ _id: id })
        if (!res) throw new HttpException("Can not find this order", HttpStatus.FORBIDDEN)
        return res
    }
    async getAll(user: LoginUserDto) {
        const list = await this.OrderModel.find({ userEmail: user.email })
        if (list.length === 0) throw new HttpException('there is no orders', HttpStatus.NO_CONTENT)
        return list
    }
}