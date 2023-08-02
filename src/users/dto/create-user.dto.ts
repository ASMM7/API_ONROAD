import { Transform } from "class-transformer";
import { RolUser } from "../const/rol_users";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Unique } from "typeorm";

export class CreateUserDto {

    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    @Unique(['name'])
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;


    @Transform(({ value }) => value.trim())
    @IsNotEmpty()
    @IsString()
    password: string;

    
    rol: RolUser;
}
