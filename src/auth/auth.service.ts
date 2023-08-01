import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RolUser } from 'src/users/const/rol_users';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  

  async register({ name, email, password }: RegisterDto) {
    try {
      const user = await this.userService.findOneByEmail(email);

      if (user) {
        throw new BadRequestException('Email already exists');
      }
      return this.userService.create({
        name,
        email,
        password: await bcryptjs.hash(password, 12),
        rol: typeof RolUser.onCli as any
      });
    } catch (e) {
      return {
        statusCode: 404,
        message: e.message,
        error:e
      };
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userService.findOneByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = { email: user.email , rol : user.rol};
      const token = await this.jwtService.signAsync(payload);

      return { token, email };
    } catch (e) {
        return {
          statusCode: 404,
          message: e.message,
          error:e
        };
      }
    }
  }

