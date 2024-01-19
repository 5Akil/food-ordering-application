import { Module } from "@nestjs/common";
import { Menu_Item_Controller } from "./controller/menu_items.controller";
import { Menu_Item_Services } from "./service/menu_items.service";
import { MenuItemSchema } from "./model/menu_items.model";
import { MongooseModule } from "@nestjs/mongoose";




@Module({
        imports:[
            MongooseModule.forFeature([{ name: 'MenuItem', schema: MenuItemSchema }]),
        ],
        // exports:[Menu_Item_Services],
        controllers:[Menu_Item_Controller],
        providers:[Menu_Item_Services]
    }
)

export class Menu_Items_Module{}