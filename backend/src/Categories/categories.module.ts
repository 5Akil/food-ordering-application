import { Module } from "@nestjs/common";
import { CategoriesService } from "./Service/categories.service";
import { CategoriesController } from "./Controller/categories.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { CategorySchema } from "./model/categories.model";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'categories', schema: CategorySchema }])
    ],
    providers: [CategoriesService],
    controllers: [CategoriesController],
    exports: [CategoriesService]
})

export class CategoriesModule{}