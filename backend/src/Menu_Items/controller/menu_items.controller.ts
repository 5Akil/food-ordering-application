import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { Menu_Item_Services } from "../service/menu_items.service";
import { MenuItemDto } from "../dto/menu_item.dto";
import { IMenu } from "../types/menu_items.interface";

@Controller('/api/menu_items')
export class Menu_Item_Controller {
    constructor(private readonly menuService: Menu_Item_Services) { }
    @Get()
    async getAll() {
        try {
            return await this.menuService.findAll()
        } catch (error) {
            throw new HttpException('Does not have any Items in menu', HttpStatus.FORBIDDEN)
        }
    }
    @Get(':id')
    async getOne(@Param('id') id: string) {
        // try {
            const res= await this.menuService.findOne(id)
            console.log(res);
            
        // } catch (error) {
        //     throw new HttpException('Ooh No!', HttpStatus.FORBIDDEN)
        // }
    }
    @Post()
    async create(@Body() menu_itemDto:MenuItemDto ){
        const res = await this.menuService.createOne(menu_itemDto)
        return res
    }
    @Put()
    async update(@Body() menu_itemDto:MenuItemDto) {
        const res = await this.menuService.upateOne(menu_itemDto)
        return res
    }
    @Delete()
    async delete(@Query('_id') id: string) {
        return await this.menuService.deleteOne(id)
    }
}