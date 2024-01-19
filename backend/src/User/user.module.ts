import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import {  UserSchema } from "./model/user..model";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { AuthService } from "../Authentication/Services/auth.service";
import { AuthModule } from "../Authentication/auth.module";
import { UserInfoSchema } from "./model/userInfo.model";



@Module({
    imports:[
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema } ,{ name: 'UserInfo', schema: UserInfoSchema }]),
        forwardRef(() => AuthModule),
    ],
    controllers:[UserController],
    providers:[UserService ,AuthService ],
    exports: [UserService],
})
export class UserModule {};