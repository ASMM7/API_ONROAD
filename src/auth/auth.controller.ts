import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'supertest';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { RolUser } from 'src/users/const/rol_users';


interface RequestWithUser extends Request{
  user: {
    email: string;
    rol: RolUser;
  };

}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
   // console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    //console.log(loginDto);
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @Roles(RolUser.onCli)
  @UseGuards(AuthGuard, RolesGuard)
  profile(
    @Req()
     req : RequestWithUser
     ) {
    return req.user;
  }



  @Get('profile2')
  @Roles(RolUser.onRoad)
  @UseGuards(AuthGuard, RolesGuard)
  profile2(
    @Req()
     req : RequestWithUser
     ) {
    return req.user;
  }
}
