import { Body, Controller, Get, HttpException, HttpStatus, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "../Services/auth.service";
import { LoginUserDto } from "../dto/loginUser.dto";
import { RegisterUserDto } from "../dto/registerUser.dto";
import { UserService } from "../../User/service/user.service";
import * as bcrypt from 'bcryptjs'



@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @Post('register')
  async registerUser(@Body() registeruserDto: RegisterUserDto) {
    const { email, password, ...rest } = registeruserDto;
    const existingUser = await this.userService.findOneByEmail(email)
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createuser = await this.userService.createUser({ ...registeruserDto })
    return createuser
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    let isValid: boolean;

    try {
      const existingUser = await this.userService.getUser(loginUserDto)
      isValid = await bcrypt.compare(loginUserDto.password, existingUser.password);
      const { _id, email, isAdmin, ...rest } = existingUser;
      const token = this.authService.assignTokens(_id, isAdmin);
      return { ...token, email }

    } catch (error) {
      throw new HttpException('Username or password is invalid', HttpStatus.FORBIDDEN);
    }
    if (!isValid) {
      // throw new ForbiddenException('Username or password is invalid');
      throw new HttpException('Username or password is invalid', HttpStatus.FORBIDDEN);
    }

  }
}