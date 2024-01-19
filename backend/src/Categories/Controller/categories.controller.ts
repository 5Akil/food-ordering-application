import { Body, Controller, Delete, Get, HttpException, HttpStatus, Post, Put, Query, Req } from "@nestjs/common";
import { CategoriesService } from "../Service/categories.service";
import { ICategory } from "../type/categories.interface";
import { CategoryDto } from "../dto/category.dto";





@Controller("api/categories")
export class CategoriesController {

    constructor(private categoriesService: CategoriesService) { }

    @Get()
    async getCategories(@Req() req) {
        try {
            const response = await this.categoriesService.findAll()
            return response
        } catch (error) {
            throw new HttpException('There is not any catogories', HttpStatus.FORBIDDEN)
        }
    }
    @Post()
    async createCategories(@Body() data: CategoryDto) {
        return await this.categoriesService.create(data)
    }
    @Put()
    async upateCategory(@Body() data: CategoryDto) {
        return await this.categoriesService.update(data)
    }

    @Delete()
    async deleteCategory(@Query('_id') id: string) {
        return await this.categoriesService.delete(id)
    }
}