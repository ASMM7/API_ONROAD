import { IsNotEmpty, IsString , IsInt , IsEnum} from "class-validator";
import{ RolUser} from 'src/user/enum/rol_user'
export class CreateUserDto {

    
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @IsNotEmpty()
    @IsEnum(RolUser)
    role: RolUser;
}

