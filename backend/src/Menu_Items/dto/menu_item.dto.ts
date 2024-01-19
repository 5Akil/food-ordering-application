

import { IsString, IsNumber, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class ExtraPriceDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;
}

export class MenuItemDto {

    @IsString()
    @IsOptional()
    _id: string;

    @IsString()
    image: string;

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    category: string; // Assuming category is a string, you can adjust the type as needed

    @IsNumber()
    basePrice: number;

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExtraPriceDto)
    sizes: ExtraPriceDto[];

    @IsArray()
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ExtraPriceDto)
    extraIngredientPrices: ExtraPriceDto[];

    
}
