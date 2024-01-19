import { Document } from 'mongoose';
export interface IUser extends Document{
    readonly name: string;
    readonly email: number;
    readonly password: number;
    readonly isAdmin: boolean;
    readonly createdAt : Date;
    readonly updatedAt : Date
}