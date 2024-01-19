import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IUser } from "../types/user.interface";
import { RegisterUserDto } from "../../Authentication/dto/registerUser.dto";
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from "../../Authentication/dto/loginUser.dto";
import { IUserInfo } from "../types/userInfo.interface";
import { UserPayloadDto } from "../dto/userPayload.dto";


@Injectable()
export class UserService {
  constructor(@InjectModel("User") private userModel: Model<IUser>,
    @InjectModel("UserInfo") private userInfoModel: Model<IUserInfo>
  ) { }
  async findOneByEmail(email: string): Promise<IUser> {
    return await this.userModel.findOne({
      email
    });
  }
  async getOneProfile(userId){
    const user = await this.userModel.findOne({
      _id: userId
    }).select(['_id', 'email', 'isAdmin']).lean();
    if (!user) throw new HttpException('something went wrong , can not find this user', HttpStatus.NOT_FOUND)
    const userInfo = await this.userInfoModel.findOne({ email: user.email }).lean()
  if(user && userInfo) return {...user,...userInfo}
  }
  async findAll() {
    const res = await this.userModel.find({})
    if (res.length === 0) throw new HttpException('can not find any registered users ', HttpStatus.NO_CONTENT)
    return res
  }
  async createUser(data: RegisterUserDto) {
    const hash = await bcrypt.hash(data.password, 10)
    const newUser = await this.userModel.create({ ...data, password: hash });
    const { password, createdAt, updatedAt, ...rest } = await newUser.toObject()
    return rest
  }
  async getUser(data: LoginUserDto) {
    const existinguser = await this.userModel.findOne({ email: data.email }).lean();
    return existinguser
  }
  async findOneByID(id: string): Promise<IUser> {
    const user = await this.userModel.findOne({
      _id: id
    }).select(['_id', 'email', 'isAdmin']).lean();
    if (!user) throw new HttpException('something went wrong , can not find this user', HttpStatus.NOT_FOUND)
    // const userInfo = await this.userInfoModel.findOne({ email: user.email }).lean()
    if (user) return user 
  }
  async userProfile(user) {
    const info = await this.userInfoModel.findOne({ email: user.email }).lean()
    return { ...user, ...info }
  }
  async updateProfile(user: LoginUserDto, data: UserPayloadDto) {
    if (data._id) {
      const exist = await this.userModel.findOne({
        _id: data._id
      }).select(['_id', 'email', 'isAdmin']).lean();
      if (!exist) throw new HttpException('something went wrong , can not find this user', HttpStatus.NOT_FOUND)
      const a = await this.userModel.updateOne({ _id: data._id }, { name: data.name, image: data.image, isAdmin: data.isAdmin }, { new: true })
      const { _id, ...rest } = data
      const res = await this.userInfoModel.findOneAndUpdate({ email: exist.email }, rest)
      if (a !== null && res != null) {
        return res
      } else {
        throw new HttpException("something went wrong", HttpStatus.FORBIDDEN)
      }
    } else {
      console.log(data.name);
      console.log(user._id);
      
      const a = await this.userModel.findByIdAndUpdate({ _id: user._id }, { name: data.name, image: data.image, isAdmin: data.isAdmin }, { new: true })
      console.log(a);
      
      const res = await this.userInfoModel.findOneAndUpdate({ email: user.email }, data, { upsert: true })
      if (a !== null && res != null) {
        return res
      } else {
        throw new HttpException("something went wrong", HttpStatus.FORBIDDEN)
      }
    }
  }
}