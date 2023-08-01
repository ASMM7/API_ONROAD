import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly userRepository: Repository<UsuarioEntity>
  ){}

   /*create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }*/

  async findOneByEmail(email: string): Promise<UsuarioEntity> {
    return this.userRepository.findOne({
      where:{
        email
      }
    });
  
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const {name, email, password, rol } = createUserDto;
      const user = new UsuarioEntity();
      user.name = name;
      user.password = password;
      user.email = email;
      user.rol=rol;
      return this.userRepository.save(user);
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }
  
  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    try {
      const User = await this.userRepository.findOne({ where: { id } });
      if (!User) {
        throw new NotFoundException('User not found');
      }
      return User;
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto){
    try {
      const User = await this.userRepository.findOneBy({ id });
      if (!User) {
        throw new BadRequestException('User not found');
      }
      return await this.userRepository.save({ ...User, ...updateUserDto });
    } catch (e) {
      console.error('Error:', e.message, e.statusCode);
    }
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}
