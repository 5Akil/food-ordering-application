import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { IMenu } from "../types/menu_items.interface";
import { Model } from "mongoose";
import { MenuItemDto } from "../dto/menu_item.dto";

@Injectable()
export class Menu_Item_Services {
    constructor(@InjectModel("MenuItem") private Menu_Item_Model: Model<IMenu>) { }
    async findAll() {
        try {
            const list = await this.Menu_Item_Model.find({})
            if (!list) throw new HttpException('There is no item', HttpStatus.NOT_FOUND)
            return list
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async findOne(id: string) {
        try {
            const item = await this.Menu_Item_Model.findOne({ _id: id })
            if (!item) throw new HttpException('There is no item', HttpStatus.NOT_FOUND)
            return item
        } catch (error) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    async createOne(data: MenuItemDto) {
        try {
            const item = await this.Menu_Item_Model.create({ data })
            if (!item) throw new HttpException('Can not create item', HttpStatus.FORBIDDEN)
            return item
        } catch (error) {
            throw new HttpException('can not cretae , something went wrong', HttpStatus.FORBIDDEN)
        }
    }
    async upateOne(data: MenuItemDto) {
        try {
            const res = await this.Menu_Item_Model.findOneAndUpdate({ _id: data._id }, data, { new: true })
            if (!res) throw new HttpException('Can not update ', HttpStatus.FORBIDDEN)
            return res
        } catch (error) {
            throw new HttpException('can not cretae , something went wrong', HttpStatus.FORBIDDEN)
        }
    }
    async deleteOne(id: string) {
        try {
            const res = await this.Menu_Item_Model.deleteOne({ _id: id })
            if (res.deletedCount == 0) throw new HttpException('can not find this item ', HttpStatus.FORBIDDEN)
            return res
        } catch (error) {
            throw new HttpException('can not delete , something went wrong', HttpStatus.FORBIDDEN)
        }
    }
}