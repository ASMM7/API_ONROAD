import { RolUser } from "../const/rol_users";

export class CreateUserDto {

    name: string;
    email: string;
    password: string;
    rol: RolUser;
}
