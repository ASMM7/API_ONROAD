import { SetMetadata } from "@nestjs/common";
import { RolUser } from "src/users/const/rol_users";


export const ROLES_KEY = 'roles';
export const Roles = (role: RolUser) => SetMetadata(ROLES_KEY, role);
