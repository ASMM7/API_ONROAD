import { SetMetadata } from "@nestjs/common";
import { RolUser } from "src/user/enum/rol_user";


export const ROLES_KEY = 'roles';
export const Roles = (role: RolUser) => SetMetadata(ROLES_KEY, role);
