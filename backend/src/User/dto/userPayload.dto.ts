import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";



export class UserPayloadDto {

    @IsString()
    @IsOptional()
    _id:string

    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    image:string

    @IsEmail()
    email: string;

    @IsString()
    streetAddress: string;

    @IsString()
    postalCode: string;

    @IsString()
    city: string;

    @IsString()
    country: string;

    @IsString()
    phone: string;

    @IsString()
    isAdmin: boolean;
}