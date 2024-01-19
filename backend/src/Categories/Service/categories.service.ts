import { HttpException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ICategory } from "../type/categories.interface";




@Injectable()
export class CategoriesService {

    constructor(@InjectModel("categories") private categoriesModel: Model<ICategory>) { }
    async findAll() {
        return await this.categoriesModel.find({})
    }
    async create(data: ICategory) {
        const exist = await this.categoriesModel.findOne({ name: data.name })
        if (exist !== null) throw new HttpException('This category is already exist ', HttpStatus.BAD_REQUEST)
        const res = await this.categoriesModel.create(data)
        return res
    }
    async update(data: ICategory) {
        const res = await this.categoriesModel.findByIdAndUpdate({ _id: data._id }, { name: data.name }, { new: true })
        if (!res) throw new HttpException('error in updation', HttpStatus.FORBIDDEN)
        return res
    }
    async delete(id: string) {
        const res = await this.categoriesModel.findById({ _id: id })
        if (!res) throw new HttpException('No category with given ID.', HttpStatus.NOT_FOUND);
        return await this.categoriesModel.findByIdAndDelete({ _id: res._id })

    }
}