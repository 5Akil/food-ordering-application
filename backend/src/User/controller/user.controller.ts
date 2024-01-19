import { Body, Controller, Get, Param, Put, Query, Req } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { IUser } from "../types/user.interface";
import { UserPayloadDto } from "../dto/userPayload.dto";



@Controller('/api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUser(@Req() req, @Query('_id') userId: string) {
        if (userId) {
            console.log(userId);
            const res = await this.userService.getOneProfile(userId)
            return res
        } else {
            const { user } = req
            const res = await this.userService.userProfile(user)
            return res
        }
    }
    @Get('list')
    async getAllUser() {
        const res = await this.userService.findAll()
        return res
    }
    @Put()
    async updateUser(@Body() userPayloadDto: UserPayloadDto, @Req() req) {
        const { user } = req
        return await this.userService.updateProfile(user, userPayloadDto)
    }
}